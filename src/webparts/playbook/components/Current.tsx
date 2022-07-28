import * as React from "react";
import { useState, useEffect } from "react";

let currAns;

const Current = (props) => {
  currAns = props.currQus;

  console.log(currAns.CompletedUser);

  return (
    <>
      <div
        style={{
          padding: "10px",
          width: "400px",
          height: "80px",
          backgroundColor: "#00859c",
          color: "#fff",
          fontWeight: "600",
          fontSize: "16px",
        }}
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
