import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./Current.module.scss";

let currAns;

const Current = (props) => {
  currAns = props.currQus;
  console.log(currAns);

  return (
    <>
      <div className={styles.CurrentCover}>
        {
          currAns.Step != undefined
            ?
            <>
              <div className={styles.currentQuestionsHead}>{currAns.Title}</div>
              <div>{currAns.Step}</div>
              {
                currAns.arrSubStep.length > 0
                  ? <>
                    {
                      currAns.arrSubStep.map((row) => {
                        return <div>
                          <li>{row.SubSteps}</li>
                        </div>
                      })
                    }
                  </>
                  : ""
              }
            </>
            :
            <div className={styles.currentCompleteQuestionsHead}>You have Complete all Modules</div>
        }
      </div>
      <div
        style={{
          width: "540px",
          display: "flex",
          transform: "translateY(-20px)",
          zIndex: "2",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {
          currAns.isRead == false
          && <>
            <div
              style={{
                border: "3px solid #007185",
                padding: "5px 10px",
                width: "100px",
                backgroundColor: "#fff",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                color: "#66afc9",
                fontWeight: "700",
                textAlign: "center",
                marginLeft: "-20px",
              }}
            >
              {currAns.Time}
            </div>
            <div
              style={{
                border: "3px solid #007185",
                padding: "5px 10px",
                width: "100px",
                backgroundColor: "#fff",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                color: "#66afc9",
                fontWeight: "700",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                props.completeQus(currAns.ID, currAns.CompletedUser, props.arrDelSec);
              }}
            >
              Complete
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Current;
