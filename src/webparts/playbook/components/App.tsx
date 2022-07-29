import * as React from "react";
import Header from "./Header";
import Questions from "./Questions";
import Footerimg from "./Footerimg";
import FooterCategories from "./FooterCategories";
import { useState, useEffect } from "react";

let arrPrctice = [];
let UserId;
let arrPracticeConfig = [];
let moduleHead = [];
let arrPrimarySteps = [];
let arrDeliver = {};
let objCompleteDeliver = {};
let arrCompleteSteps = [];

const App = (props) => {
  const [allPrctice, setAllPrctice] = useState(arrPrctice);
  const [render, setRender] = useState(true);
  const [primarySteps, setPrimarySteps] = useState([]);
  const [arrDelSec, setArrDelSec] = useState(arrDeliver);

  // life cycle of onload
  useEffect(() => {
    // Current user mail get
    props.sp.web
      .currentUser()
      .then(async (res) => {
        UserId = res.Id;
        // get configList
        await props.sp.web.lists
          .getByTitle("PracticeConfig")
          .items.get()
          .then((res) => {
            let arrJSON;
            arrPracticeConfig = res;
            moduleHead = arrPracticeConfig.map((head) => {
              arrJSON = JSON.parse(head.Deliverable.slice(1, -1));
              return {
                Title: head.Title,
                deliver: arrJSON,
                About: head.About,
              };
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // life cycle of render
  useEffect(() => {
    props.sp.web.lists
      .getByTitle("Practice")
      .items.select("*,Practice/Title")
      .expand("Practice")
      .get()
      .then((val) => {
        console.log(val);
        arrPrctice = val.map((row) => {
          let isUserCompleted = row.CompletedUser
            ? row.CompletedUser.split(",")
              .map((id) => +id)
              .some((id) => id == UserId)
            : false;
          return {
            UserId: UserId,
            Title: row.Title ? row.Title : "",
            ID: row.ID,
            Step: row.Step,
            Practice: row.Practice.Title,
            Time: row.Time,
            Order: row.Qorder,
            CompletedUser: row.CompletedUser != null ? row.CompletedUser : "",
            isRead: isUserCompleted,
            Icon: row.Icon ? row.Icon : "",
          };
        });
        setAllPrctice([...arrPrctice]);
        let primaryPractice = moduleHead
          .map((title) => {
            return {
              Title: title.Title,
              About: title.About,
              deliver: title.deliver,
              isInComplete: allPrctice
                .filter((step) => step.Practice == title.Title)
                .some((step) => step.isRead == false),
            };
          })
          .filter((practice) => practice.isInComplete == true)[0];
        arrDeliver = moduleHead.filter(
          (deliver) => deliver.Title == primaryPractice.Title
        )[0];
        arrPrimarySteps = allPrctice.filter(
          (step) => step.Practice == primaryPractice.Title
        );
        setArrDelSec(arrDeliver);
        setPrimarySteps([]);
        setPrimarySteps([...arrPrimarySteps]);
        setRender(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const reRunning = () => {
    setRender(true);
  };

  const BeforeModule = () => {
    let completePractice = moduleHead
      .map((title) => {
        return {
          Title: title.Title,
          About: title.About,
          deliver: title.deliver,
          isInComplete: allPrctice
            .filter((step) => step.Practice == title.Title)
            .some((step) => step.isRead == false),
        };
      })
      .filter((practice) => practice.isInComplete == false)[0];
    objCompleteDeliver = moduleHead.filter(
      (deliver) => deliver.Title == completePractice.Title
    )[0];
    arrCompleteSteps = allPrctice.filter(
      (step) => step.Practice == completePractice.Title
    );
    console.log(completePractice);
    console.log(objCompleteDeliver);
    console.log(arrCompleteSteps);
    setArrDelSec(objCompleteDeliver);
    setPrimarySteps([]);
    setPrimarySteps([...arrCompleteSteps]);
  }

  return (
    <>
      {primarySteps.length > 0 && (
        <>
          <Header context={props.context} sp={props.sp} arrDelSec={arrDelSec} />
          <Questions
            context={props.context}
            sp={props.sp}
            PrimarySteps={primarySteps}
            arrDelSec={arrDelSec}
            reRunning={reRunning}
            BeforeModule={BeforeModule}
          />
        </>
      )}
      <Footerimg context={props.context} sp={props.sp} />
      <FooterCategories context={props.context} sp={props.sp} />
    </>
  );
};

export default App;
