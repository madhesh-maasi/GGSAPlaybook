import * as React from "react";
import Timeline from "./Timeline";
import Current from "./Current";
import Deliverable from "./Deliverable";
import AllQuestions from "./AllQuestions";
import styles from "./Questions.module.scss";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";

let arrAllPrctice = [];
let lastStepID;
let UserId;
let readQuestions;
let objUnreadQuestions;
let arRearrangedSteps = [];
let arrTimeline = [];
let curObjValue;

const Questions = (props) => {
  const [question, setQuestion] = useState([]);
  const [currQus, setCurrQus] = useState();
  const [render, setRender] = useState(true);
  const [TLData, setTLData] = useState(arrTimeline);
  const [timelineRender, setTimelineRender] = useState(true);

  // life cycle of render
  useEffect(() => {
    arrAllPrctice = props.PrimarySteps;
    lastStepID = arrAllPrctice[arrAllPrctice.length - 1].ID;
    UserId = arrAllPrctice.map((e) => e.UserId)[0].toString();
    arrTimeline = arrAllPrctice.map((item) => {
      return {
        ID: item.ID,
        Icon: item.Icon,
        isRead: item.isRead,
        Order: item.Order,
      };
    });
    setTLData([]);
    setTLData([...arrTimeline]);
    readQuestions = arrAllPrctice.filter((step) => step.isRead == true);
    objUnreadQuestions = arrAllPrctice.filter(
      (step) => step.isRead == false
    )[0];
    arRearrangedSteps = [
      ...arrAllPrctice.filter(
        (row) => row.isRead == false && row.Step != objUnreadQuestions.Step
      ),
      ...readQuestions,
    ];
    curObjValue =
      objUnreadQuestions == undefined
        ? {
            isRead: true,
          }
        : objUnreadQuestions;
    setQuestion(arRearrangedSteps);
    setCurrQus({ ...curObjValue });
    setTimelineRender(true);
    setRender(false);
  }, [render]);

  const completeQus = (Id, completeValues) => {
    arrAllPrctice.filter((row) => row.ID == Id)[0].isRead = true;
    addUserId(Id, completeValues);
  };

  // Add user id
  const addUserId = (Id, completeValues) => {
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
        if (Id == lastStepID) {
          props.reRunning(props.arrDelSec.Order);
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
    props.firstModOrdNo < orderNo ? props.BeforeModule(orderNo) : "";
  };

  const lastOrderNo = (orderNo) => {
    orderNo != ""
      ? props.latestModOrdNo > orderNo
        ? props.AfterModule(orderNo)
        : ""
      : "";
  };

  return (
    <>
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
              props.firstModOrdNo != props.arrDelSec.Order
                ? "pointer"
                : "not-allowed",
            transform: "rotate(180deg)",
            fontSize: "46px",
            color:
              props.pageType == "phases"
                ? props.firstModOrdNo != props.arrDelSec.Order
                  ? "#f99d26"
                  : "gray"
                : props.firstModOrdNo != props.arrDelSec.Order
                ? "#66afc9"
                : "gray",
          }}
          onClick={() => firstOrderNo(props.arrDelSec.Order)}
        />
        <div
          style={{
            display: "flex",
            margin: "0px 60px",
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
                  arrDelSec={props.arrDelSec}
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
              props.latestModOrdNo != props.arrDelSec.Order
                ? "pointer"
                : "not-allowed",
            fontSize: "46px",
            color:
              props.pageType == "phases"
                ? props.latestModOrdNo != props.arrDelSec.Order
                  ? "#f99d26"
                  : "gray"
                : props.latestModOrdNo != props.arrDelSec.Order
                ? "#66afc9"
                : "gray",
          }}
          onClick={() => lastOrderNo(props.latestOrderNO)}
        />
      </div>
    </>
  );
};

export default Questions;
