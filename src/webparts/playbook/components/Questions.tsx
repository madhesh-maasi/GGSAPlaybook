import * as React from "react";
import Timeline from "./Timeline";
import Current from "./Current";
import Deliverable from "./Deliverable";
import AllQuestions from "./AllQuestions";
import styles from "./Questions.module.scss";
import { useState, useEffect } from "react";

let arrPrctice = [];
let readQuestions;
let objCurrentQuestion;
let remainingQuestions = [];
let UserId;
let lastIndex;
let lastIndexId;

const Questions = (props) => {
  const [allPrctice, setAllPrctice] = useState([]);
  const [question, setQuestion] = useState([]);
  const [currQus, setCurrQus] = useState();
  const [render, setRender] = useState(true);

  // life cycle of render
  useEffect(() => {
    arrPrctice = props.PrimarySteps;
    lastIndex = arrPrctice[arrPrctice.length - 1];
    lastIndexId = lastIndex.ID;
    console.log(lastIndexId);
    UserId = arrPrctice.map((e) => e.UserId)[0].toString();
    setAllPrctice([...arrPrctice]);
    readQuestions = allPrctice.filter((step) => step.isRead == true);
    objCurrentQuestion = allPrctice.filter(
      (step) => step.isRead == false
    )[0];
    remainingQuestions = [
      ...allPrctice.filter(
        (row) => row.isRead == false && row.Step != objCurrentQuestion.Step
      ),
      ...readQuestions,
    ];
    setQuestion(remainingQuestions);
    setCurrQus({ ...objCurrentQuestion });
    setRender(false);
  }, [render]);

  const completeQus = (Id, completeValues) => {
    arrPrctice.filter((complete) => complete.ID == Id)[0].isRead = true;
    setAllPrctice([...arrPrctice]);
    addUserId(Id, completeValues);
  }

  // Add user id
  const addUserId = (Id, completeValues) => {
    let currCompleteValue = !completeValues ? `${UserId}` : `${completeValues},${UserId}`;
    props.sp.web.lists
      .getByTitle("Practice")
      .items
      .getById(Id)
      .update({
        CompletedUser: currCompleteValue,
      })
      .then(() => {
        setRender(true);
        setTimeout(() => {
          Id == lastIndexId && (props.reRunning());
        }, 500)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <Timeline context={props.context} sp={props.sp} />
      <div className={styles.Qus}>
        <div style={{ width: "50%" }}>
          {currQus &&
            <>
              <Current
                context={props.context}
                sp={props.sp}
                completeQus={completeQus}
                currQus={currQus}
              />
              <Deliverable
                context={props.context}
                sp={props.sp}
                arrDelSec={props.arrDelSec}
              />
            </>}
        </div>
        <div>
          <AllQuestions
            context={props.context}
            sp={props.sp}
            question={question}
          />
        </div>
      </div>
    </>
  );
};

export default Questions;
