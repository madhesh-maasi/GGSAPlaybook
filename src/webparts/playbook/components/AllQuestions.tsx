import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./AllQuestions.module.scss";

let allQues;

const AllQuestions = (props) => {
  allQues = props.question;

  return (
    <>
      {allQues.map((row) => {
        return (
          <>
            {row.isRead == false &&
              <div
                className={styles.listItem}
              >
                <li>{row.Step}</li>
              </div>
            }
            {row.isRead == true &&
              <div
                className={styles.listItemCom}
              >
                <li>{row.Step}</li>
              </div>
            }
          </>
        );
      })}
    </>
  );
};

export default AllQuestions;
