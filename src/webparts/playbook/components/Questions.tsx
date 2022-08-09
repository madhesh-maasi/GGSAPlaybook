import * as React from "react";
import Timeline from "./Timeline";
import Current from "./Current";
import Deliverable from "./Deliverable";
import AllQuestions from "./AllQuestions";
import styles from "./Questions.module.scss";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";

let arrPrctice = [];
let readQuestions;
let objCurrentQuestion;
let remainingQuestions = [];
let UserId;
let lastIndex;
let lastIndexId;
let arrTimeline = [];
let currentObjValue;

const Questions = (props) => {
  const [allPrctice, setAllPrctice] = useState([]);
  const [question, setQuestion] = useState([]);
  const [currQus, setCurrQus] = useState();
  const [render, setRender] = useState(true);
  const [TLData, setTLData] = useState(arrTimeline);
  const [timelineRender, setTimelineRender] = useState(true);

  // life cycle of render
  useEffect(() => {
    arrPrctice = props.PrimarySteps;
    lastIndex = arrPrctice[arrPrctice.length - 1];
    lastIndexId = lastIndex.ID;
    UserId = arrPrctice.map((e) => e.UserId)[0].toString();
    arrTimeline = arrPrctice.map((item) => {
      return {
        ID: item.ID,
        Icon: item.Icon,
        isRead: item.isRead,
        Order: item.Order,
      };
    });
    setTLData([]);
    setTLData([...arrTimeline]);
    setAllPrctice([...arrPrctice]);
    readQuestions = arrPrctice.filter((step) => step.isRead == true);
    objCurrentQuestion = arrPrctice.filter((step) => step.isRead == false)[0];
    remainingQuestions = [
      ...arrPrctice.filter(
        (row) => row.isRead == false && row.Step != objCurrentQuestion.Step
      ),
      ...readQuestions,
    ];
    currentObjValue = objCurrentQuestion == undefined
      ? (
        {
          isRead: true
        }
      ) : objCurrentQuestion;
    setQuestion(remainingQuestions);
    setCurrQus({ ...currentObjValue });
    setRender(false);
    setTimelineRender(true);
  }, [render]);

  const completeQus = (Id, completeValues, currentModuleOrderNO) => {
    arrPrctice.filter((complete) => complete.ID == Id)[0].isRead = true;
    setAllPrctice([...arrPrctice]);
    addUserId(Id, completeValues, currentModuleOrderNO);
  };

  // Add user id
  const addUserId = (Id, completeValues, currentModuleOrderNO) => {
    let currCompleteValue = !completeValues
      ? `${UserId}`
      : `${completeValues},${UserId}`;
    props.URL.lists
      .getByTitle("Practice")
      .items.getById(Id)
      .update({
        CompletedUser: currCompleteValue,
      })
      .then(() => {
        if (Id == lastIndexId) {
          props.reRunning(currentModuleOrderNO);
        } else {
          setTimelineRender(false);
          setRender(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const firstOrderNo = (orderNo) => {
    props.firstIndexOrderNo < orderNo
      ? (
        props.BeforeModule(orderNo)
      ) : (
        ""
      )
  };

  const lastOrderNo = (orderNo) => {
    orderNo != "" ? (props.lastOrderNo > orderNo
      ? (
        props.AfterModule(orderNo)
      ) : (
        ""
      )) : ""
  }

  return (
    <>
      {TLData.length > 0 && (
        <Timeline
          context={props.context}
          sp={props.sp}
          timeline={TLData}
          timelineRender={timelineRender}
          URL={props.URL}
        />
      )}
      <div className={styles.Qus}>
        <Icon
          iconName="MSNVideosSolid"
          style={{
            cursor: props.firstIndexOrderNo != props.arrDelSec.COrder ? "pointer" : "not-allowed",
            transform: "rotate(180deg)",
            fontSize: "46px",
            color: props.firstIndexOrderNo != props.arrDelSec.COrder ? "#66afc9" : "gray"
          }}
          onClick={() =>
            firstOrderNo(props.arrDelSec.COrder)
          }
        />
        <div
          style={{
            display: "flex",
            margin: "0px 60px"
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
                  arrDelSec={props.arrDelSec.COrder}
                  URL={props.URL}
                />
                <Deliverable
                  context={props.context}
                  sp={props.sp}
                  arrDelSec={props.arrDelSec}
                  URL={props.URL}
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
            />
          </div>
        </div>
        <Icon
          iconName="MSNVideosSolid"
          style={{
            cursor: props.lastOrderNo != props.arrDelSec.COrder ? "pointer" : "not-allowed",
            fontSize: "46px",
            color: props.lastOrderNo != props.arrDelSec.COrder ? "#66afc9" : "gray"
          }}
          onClick={() =>
            lastOrderNo(props.latestOrderNO)
          }
        />
      </div>
    </>
  );
};

export default Questions;
