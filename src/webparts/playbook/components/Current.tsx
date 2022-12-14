import * as React from 'react'
import styles from './Current.module.scss'
import { Icon } from '@fluentui/react'
let curAns
const CompletedImg = require('../../../ExternalRef/img/Completed.png')
const Current = (props) => {
  curAns = props.currQus

  return (
    <>
      <div
        className={
          props.pageType == 'phases'
            ? styles.phaseCurrentCover
            : styles.CurrentCover
        }
      >
        {curAns.Step != undefined ? (
          <>
            <div>
              <div className={styles.currentQuestionsHead}>{curAns.Title}</div>
            </div>
            <div className={styles.step}>{curAns.Step}</div>
            {curAns.arrSubStep.length > 0 ? (
              <>
                {curAns.arrSubStep.map((row) => {
                  return (
                    <div>
                      <li>{row.SubSteps}</li>
                    </div>
                  )
                })}
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          <div className={styles.currentCompleteQuestionsHead}>
            <img src={`${CompletedImg}`} className={styles.completedImg} />
            You have completed all the steps!
            {/* <Icon iconName="Emoji2" style={{ marginLeft: 12 }} /> */}
          </div>
        )}
      </div>
      <div
        style={{
          width: '540px',
          display: 'flex',
          transform: 'translateY(-20px)',
          zIndex: '2',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {curAns.isRead == false && (
          <>
            <div
              style={{
                border:
                  props.pageType == 'phases'
                    ? '3px solid #f99d26'
                    : '3px solid #007185',
                padding: '5px 10px',
                // width: "100px",
                backgroundColor: '#fff',
                boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
                color: props.pageType == 'phases' ? '#fcb427' : '#66afc9',
                fontWeight: '700',
                textAlign: 'center',
                marginLeft: '-20px',
                minWidth: 65,
              }}
            >
              <div className={styles.TimeSection}>
                <Icon
                  iconName="Clock"
                  style={{
                    fontWeight: 'bold',
                    marginRight: 8,
                    marginBottom: -4,
                  }}
                />
                {curAns.Time}
              </div>
            </div>
            <div
              style={{
                border:
                  props.pageType == 'phases'
                    ? '3px solid #f99d26'
                    : '3px solid #007185',
                padding: '5px 10px',
                // width: "100px",
                backgroundColor: '#fff',
                boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
                color: props.pageType == 'phases' ? '#fcb427' : '#66afc9',
                fontWeight: '700',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                props.completeQus(curAns.ID, curAns.CompletedUser)
              }}
            >
              Complete
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Current
