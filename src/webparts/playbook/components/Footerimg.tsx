import * as React from 'react'
import styles from './Footerimg.module.scss'

let footerList = []
let footerCategories = []
const Footerimg = (props) => {
  footerList = props.arrFooter
  footerCategories = footerList
    .filter(
      (v, i, a) => a['findIndex']((v2) => v2.Category === v.Category) === i,
    )
    .map((row) => row.Category)
  console.log(footerCategories)

  return (
    <>
      {footerList.length > 0 && props.pageType.toLowerCase() == 'phases' ? (
        <>
          <div className={styles.phaseFooterImgWrapper}>
            <div
              className={styles.footerImg}
              style={{
                backgroundImage: `url(https://ggsaus.sharepoint.com${
                  footerList.filter((row) => row.isActive)[0].FooterImage
                    ? JSON.parse(
                        footerList.filter((row) => row.isActive)[0].FooterImage,
                      ).serverRelativeUrl
                    : ''
                })`,
              }}
            >
              <div className={styles.overlayer}></div>
            </div>
            <div className={styles.footerContent}>
              {footerCategories.length > 0 &&
                footerCategories.map((li) => {
                  return (
                    <div className={styles.routineOperationList}>
                      <h2
                        className={styles.phaseRoutineTitle}
                        style={{
                          textTransform: 'capitalize',
                          color:
                            props.pageType == 'phases'
                              ? '#00859c'
                              : props.pageType == 'practice'
                              ? '#f99d26'
                              : '',
                        }}
                      >
                        {li}
                      </h2>
                      {footerList
                        .filter((fLi) => fLi.Category == li)
                        .map((row) => (
                          <>
                            <div
                              className={
                                row.isActive == true
                                  ? styles.phaseListActive
                                  : styles.phaseList
                              }
                            >
                              {
                                <li>
                                  <div
                                    className={styles.bulletPoint}
                                    style={{
                                      background:
                                        props.pageType == 'phases'
                                          ? '#f99d26'
                                          : '#00859c',
                                    }}
                                  ></div>
                                  {row.Title}
                                </li>
                              }
                            </div>
                          </>
                        ))}
                    </div>
                  )
                })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              props.pageType.toLowerCase() == 'phases'
                ? styles.phaseFooterImgWrapper
                : styles.footerImgWrapper
            }
          >
            <div
              className={styles.footerImg}
              style={{
                backgroundImage: `url(https://ggsaus.sharepoint.com${
                  footerList.filter((row) => row.isActive)[0].FooterImage
                    ? JSON.parse(
                        footerList.filter((row) => row.isActive)[0].FooterImage,
                      ).serverRelativeUrl
                    : ''
                })`,
              }}
            >
              <div className={styles.overlayer}></div>
            </div>
            <div className={styles.footerContent}>
              {footerCategories.length > 0 &&
                footerCategories.map((li) => {
                  return (
                    <div
                      className={`${styles.routineOperationList} ${styles.list}`}
                    >
                      <h2
                        className={styles.practiceRoutineTitle}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {li}
                      </h2>
                      {footerList
                        .filter((fLi) => fLi.Category == li)
                        .map((row) => (
                          <>
                            <div
                              className={
                                row.isActive == true
                                  ? styles.phaseListActive
                                  : styles.phaseList
                              }
                            >
                              {
                                <li>
                                  <div className={styles.bulletPoint}></div>
                                  {row.Title}
                                </li>
                              }
                            </div>
                          </>
                        ))}
                    </div>
                  )
                })}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Footerimg
