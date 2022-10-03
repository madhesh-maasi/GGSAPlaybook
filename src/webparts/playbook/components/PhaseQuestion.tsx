import * as React from 'react'
import Timeline from './Timeline'
import Current from './Current'
import Deliverable from './Deliverable'
import AllQuestions from './AllQuestions'
import styles from './Questions.module.scss'
import { useState, useEffect } from 'react'
import { Icon } from '@fluentui/react'
import Label from './Label'

let arrSelActPhases = []
let lastStepID
let UserId
let readQuestions
let objUnreadQuestions
let arRearrangedSteps = []
let arrTimeline = []
let curObjValue
let arrMaster = []
let objSelectedActivity = {
  About: '',
  FooterImage: '',
  ID: 0,
  Next: '',
  PhaseSteps: [],
  Previous: '',
  TOD: [],
  Title: '',
  activity: '',
  deliver: [],
  isSelected: false,
  nextActivity: '',
  usersRoles: [],
  Order: 0,
}
const PhaseQuestion = (props) => {
  /* All States */
  const [question, setQuestion] = useState([])
  const [currQus, setCurrQus] = useState()
  const [render, setRender] = useState(true)
  const [TLData, setTLData] = useState(arrTimeline)
  const [timelineRender, setTimelineRender] = useState(true)
  const [allPhasesSteps, setAllPhasesSteps] = useState(arrMaster)
  const [selectedActivity, setSelectedActivity] = useState(objSelectedActivity)
  /* function of arranged Steps */
  const getArrangedSteps = () => {
    objSelectedActivity = arrMaster.filter((act) => act.isSelected)[0]
    setSelectedActivity(objSelectedActivity)
    arrSelActPhases = objSelectedActivity.PhaseSteps
    lastStepID = arrSelActPhases[arrSelActPhases.length - 1].ID
    UserId = arrSelActPhases.map((e) => e.UserId)[0].toString()
    arrTimeline = arrSelActPhases.map((item, i) => {
      return {
        ID: item.ID,
        Icon: item.Icon,
        isRead: item.isRead,
        Order: i + 1,
        InActiveIcon: item.InActiveIcon,
        ActiveIcon: item.ActiveIcon,
      }
    })
    setTLData([])
    setTLData([...arrTimeline])
    readQuestions = arrSelActPhases.filter((step) => step.isRead == true)
    objUnreadQuestions = arrSelActPhases.filter(
      (step) => step.isRead == false,
    )[0]
    arRearrangedSteps = [
      ...arrSelActPhases.filter(
        (row) => row.isRead == false && row.Step != objUnreadQuestions.Step,
      ),
      ...readQuestions,
    ]
    curObjValue =
      objUnreadQuestions == undefined
        ? {
            isRead: true,
          }
        : objUnreadQuestions
    setQuestion(arRearrangedSteps)
    setCurrQus({ ...curObjValue })
    setTimelineRender(!timelineRender)
    setRender(false)
  }

  /* function of complete steps */
  const completeQus = (Id, completeValues) => {
    arrMaster
      .filter((row) => row.ID == selectedActivity.ID)[0]
      .PhaseSteps.filter((row) => row.ID == Id)[0].isRead = true
    getArrangedSteps()
    addUserId(Id, completeValues)

    arrMaster
      .filter((row) => row.ID == selectedActivity.ID)[0]
      .PhaseSteps.every((phase) => phase.isRead)
      ? nextEventHandler()
      : ''
  }

  /* update the complete steps */
  const addUserId = (Id, completeValues) => {
    /*
    let currCompleteValue = !completeValues
      ? `${UserId}`
      : `${completeValues},${UserId}`
    */

    /* start changes for project based phases bind SA-1*/
    let annualplanID = props.APID ? props.APID : '0'
    let currCompleteValue = !completeValues
      ? `${annualplanID}-${UserId}`
      : `${completeValues},${annualplanID}-${UserId}`
    /* end changes for project based phases bind SA-1*/

    // Post to List
    props.URL.lists
      .getByTitle('phases')
      .items.getById(Id)
      .update({
        CompletedUser: currCompleteValue,
      })
      .then(() => {
        // if (Id == lastStepID) {
        //   props.reRunning(props.arrDelSec.Order, props.arrDelSec.Next);
        // } else {
        //   setTimelineRender(false);
        //   setRender(true);
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Next Click event
  const nextEventHandler = () => {
    let nextActivity
    // Setting back to run a cycle
    selectedActivity.Order != arrMaster[arrMaster.length - 1].Order
      ? (nextActivity = arrMaster.filter((row) => row.isSelected)[0].Order + 1)
      : 1

    arrMaster.forEach((row, i) => {
      if (arrMaster[i].Order == nextActivity) {
        arrMaster[i].isSelected = true
      } else {
        arrMaster[i].isSelected = false
      }
    })
    getArrangedSteps()
    props.changeheaderHandler(arrMaster.filter((row) => row.isSelected)[0])
    props.changeFooterHandler(
      arrMaster.filter((row) => row.isSelected)[0].Title,
    )
  }

  // Prev Click Event
  const prevEventHandler = () => {
    let nextActivity = arrMaster.filter((row) => row.isSelected)[0].Order - 1
    arrMaster.forEach((row, i) => {
      if (arrMaster[i].Order == nextActivity) {
        arrMaster[i].isSelected = true
      } else {
        arrMaster[i].isSelected = false
      }
    })
    getArrangedSteps()
    props.changeheaderHandler(arrMaster.filter((row) => row.isSelected)[0])
    props.changeFooterHandler(
      arrMaster.filter((row) => row.isSelected)[0].Title,
    )
  }
  /* life cycle of render */
  useEffect(() => {
    arrMaster = props.allPhasesSteps
    arrMaster.some((row) => row.isSelected)
      ? arrMaster
      : (arrMaster[0].isSelected = true)
    setAllPhasesSteps(arrMaster)
    getArrangedSteps()
  }, [render])

  return (
    selectedActivity.PhaseSteps.length > 0 && (
      <>
        {selectedActivity.usersRoles &&
          selectedActivity.usersRoles.length > 0 && (
            <Label arrDelSec={selectedActivity} />
          )}
        {TLData.length > 0 && (
          <Timeline
            context={props.context}
            sp={props.sp}
            timeline={TLData}
            timelineRender={timelineRender}
            URL={props.URL}
            pageType={props.pageType}
          />
        )}
        <div className={styles.Qus}>
          <Icon
            iconName="MSNVideosSolid"
            style={{
              cursor:
                selectedActivity.Order != arrMaster[0].Order
                  ? 'pointer'
                  : 'not-allowed',
              transform: 'rotate(180deg)',
              fontSize: '46px',
              color:
                selectedActivity.Order != arrMaster[0].Order
                  ? '#f99d26'
                  : 'gray',
            }}
            onClick={
              selectedActivity.Order != arrMaster[0].Order && prevEventHandler
            }
          />
          <div
            style={{
              display: 'flex',
              margin: '0px 60px',
            }}
          >
            <div className={styles.QuestionCover}>
              {currQus && (
                <>
                  <Current
                    context={props.context}
                    sp={props.sp}
                    completeQus={completeQus}
                    currQus={currQus}
                    URL={props.URL}
                    pageType={props.pageType}
                  />
                  <Deliverable
                    context={props.context}
                    sp={props.sp}
                    arrDelSec={selectedActivity.deliver}
                    URL={props.URL}
                    pageType={props.pageType}
                  />
                </>
              )}
            </div>
            <div>
              <AllQuestions
                context={props.context}
                sp={props.sp}
                question={question}
                URL={props.URL}
                pageType={props.pageType}
              />
            </div>
          </div>
          <Icon
            iconName="MSNVideosSolid"
            style={{
              cursor:
                selectedActivity.Order !=
                  arrMaster[arrMaster.length - 1].Order &&
                selectedActivity.PhaseSteps.every((row) => row.isRead)
                  ? 'pointer'
                  : 'not-allowed',
              fontSize: '46px',
              color:
                selectedActivity.Order !=
                  arrMaster[arrMaster.length - 1].Order &&
                selectedActivity.PhaseSteps.every((row) => row.isRead)
                  ? '#f99d26'
                  : 'gray',
            }}
            onClick={
              selectedActivity.Order != arrMaster[arrMaster.length - 1].Order &&
              selectedActivity.PhaseSteps.every((row) => row.isRead) &&
              nextEventHandler
            }
          />
        </div>
      </>
    )
  )
}

export default PhaseQuestion
