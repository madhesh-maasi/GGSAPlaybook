import * as React from 'react'
import styles from './FooterCategories.module.scss'
import { useState, useEffect } from 'react'
import { Icon } from '@fluentui/react'

const FooterCategories = (props) => {
  const [category, setCategory] = useState(props.Category)
  const [catConfig, setCatConfig] = useState(props.catConfig)

  const categoryHandler = () => {
    let phasesCategory = []
    props.allPhasesSteps && props.allPhasesSteps.length > 0
      ? props.allPhasesSteps.filter(
          (v, i, a) => a['findIndex']((v2) => v2.Category === v.Category) === i,
        )
      : []
    props.pageType.toLowerCase() != 'phases'
      ? phasesCategory.length == 0
        ? props.dpID
          ? setCategory([])
          : setCategory(props.Category)
        : setCategory(phasesCategory.map((row) => row.Category))
      : setCategory(props.Category)
  }

  useEffect(() => {
    categoryHandler()
  }, [props])

  return (
    <div className={styles.footerWrapper}>
      <div
        className={
          props.pageType.toLowerCase() == 'phases'
            ? styles.phaseFooterContent
            : styles.footerContent
        }
      >
        <h3>
          {props.pageType.toLowerCase() == 'phases' ? `Practice :` : `Phases :`}
        </h3>
        <>
          {category.map((cat) => (
            <a
              style={{
                cursor: 'pointer',
                margin: '10px 5px',
                padding: '0px 10px',
                transform: 'capitalize',
              }}
            >
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: 'auto',
                  marginRight: '1rem',
                }}
                onClick={() => {
                  let reDirectTo =
                    props.pageType == 'phases' ? 'practice' : 'phases'
                  props.dPID != undefined
                    ? props.footerNavigation(reDirectTo, cat, props.pathwayTOD)
                    : props.getNavFooter(reDirectTo, cat, '')
                }}
              >
                {' '}
                <img
                  src={`${
                    catConfig.filter(
                      (row) => row.Title.toLowerCase() == cat.toLowerCase(),
                    )[0].FooterIcon
                  }`}
                  alt=""
                  style={{
                    //color: 'white',
                    //fontSize: '16px',
                    paddingTop: '5px',
                    objectFit: 'contain',
                    paddingBottom: '5px',
                    marginRight: '0.5rem',
                    height: '20px',
                    width: '20px',
                  }}
                />
                {/* <Icon
                  iconName={`${
                    catConfig.filter(
                      (row) => row.Title.toLowerCase() == cat.toLowerCase(),
                    )[0].Icon
                  }`}
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    marginRight: '0.5rem',
                  }}
                /> */}{' '}
                {cat}
              </p>
            </a>
          ))}
        </>
      </div>
    </div>
  )
}

export default FooterCategories
