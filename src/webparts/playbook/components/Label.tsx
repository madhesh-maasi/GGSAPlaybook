import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../../webparts/playbook/components/Label.module.scss";

const Label = (props) => {
  const [labelContent, setLabelContent] = useState([]);

  // get Label content
  const getLabelSec = () => {
    setLabelContent(props.arrDelSec.usersRoles);
  };

  // life cycle
  useEffect(() => {
    getLabelSec();
  }, []);

  return (
    <div
      style={{
        textAlign: "right",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {labelContent.length > 0 && (
        <div>
          {labelContent.map((row) => {
            return (
              <>
                <div className={styles.headerLabel}>{row}</div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Label;
