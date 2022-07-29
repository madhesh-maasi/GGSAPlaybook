import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./Current.module.scss"

let currAns;

const Current = (props) => {
  currAns = props.currQus;

  return (
    <>
      <div
        className={styles.CurrentCover}
      >
        <div>{currAns.Title}</div>
        <div>{currAns.Step}</div>
      </div>
      <div
        style={{
          width: "440px",
          display: "flex",
          transform: "translateY(-20px)",
          zIndex: "2",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
            // transform: "tranlateX(-100px)",
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
            props.completeQus(currAns.ID, currAns.CompletedUser);
          }}
        >
          Complete
        </div>
      </div>
    </>
  );
};

export default Current;
