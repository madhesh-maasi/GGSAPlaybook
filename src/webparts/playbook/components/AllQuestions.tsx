import * as React from "react";
import styles from "./AllQuestions.module.scss";
import { Icon } from "office-ui-fabric-react";

let allQues;

const AllQuestions = (props) => {
  allQues = props.question;

  return (
    <>
      {allQues.map((row) => {
        return (
          <>
            {row.isRead == false && (
              <div
                className={
                  props.pageType.toLowerCase() == "phases"
                    ? styles.phaseListItem
                    : styles.listItem
                }
              >
                <div>
                  <li>{row.Step}</li>
                </div>
                {row.arrSubStep.length > 0 ? (
                  <ul>
                    {row.arrSubStep.map((row) => {
                      return (
                        <div>
                          <li>{row.SubSteps}</li>
                        </div>
                      );
                    })}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            )}
            {row.isRead == true && (
              <div
                className={
                  props.pageType.toLowerCase() == "phases"
                    ? styles.phaseListItemCom
                    : styles.listItemCom
                }
              >
                <div style={{ display: "flex" }}>
                  <Icon
                    iconName="AcceptMedium"
                    className={
                      props.pageType.toLowerCase() == "phases"
                        ? styles.phasesListComItem
                        : styles.listComItem
                    }
                  />
                  <div>{row.Step}</div>
                </div>
                {row.arrSubStep.length > 0 ? (
                  <ul>
                    {row.arrSubStep.map((row) => {
                      return (
                        <div>
                          <li>{row.SubSteps}</li>
                        </div>
                      );
                    })}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default AllQuestions;
