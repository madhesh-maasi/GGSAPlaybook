import * as React from "react";
import Header from "./Header";
import Questions from "./Questions";
import Footerimg from "./Footerimg";
import FooterCategories from "./FooterCategories";
import { useState, useEffect } from "react";
import "../../../ExternalRef/css/style.scss";
import styles from "./App.module.scss";
import Loader from "./Loader";

let arrPrctice = [];
let UserId;
let arrPracticeConfig = [];
let moduleHead = [];
let moduleArr = [];
let arrPrimarySteps = [];
let arrDeliver;
let objCompleteDeliver = { Title: "", COrder: "" };
let arrCompleteSteps = [];
let backModule = [];
let backContent = { Title: "", COrder: "" };
let firstIndexOrderNo;
let lastOrderNo;
let latestOrderNO;
let footerContent = [];
let footerArr = [];
let lastModuleOrderNo;
let arrSubSteps = [];

const App = (props) => {
  const [allPrctice, setAllPrctice] = useState(arrPrctice);
  const [render, setRender] = useState(false);
  const [primarySteps, setPrimarySteps] = useState([]);
  const [arrDelSec, setArrDelSec] = useState(arrDeliver);
  const [readValue, setReadValue] = useState(false);
  const [arrFooter, setArrFooter] = useState([]);
  const [loader, setLoader] = useState(true);
  const [completeModule, setCompleteModule] = useState(false);

  // life cycle of onload
  useEffect(() => {
    setLoader(true)
    // Current user mail get
    props.URL.currentUser()
      .then(async (res) => {
        UserId = res.Id;
        // get configList
        await props.URL.lists
          .getByTitle("PracticeConfig")
          .items.get()
          .then((res) => {
            let arrJSON;
            arrPracticeConfig = res;
            moduleArr = arrPracticeConfig.map((head) => {
              arrJSON = JSON.parse(head.Deliverable.slice(1, -1));
              return {
                Title: head.Title,
                deliver: arrJSON,
                About: head.About,
                COrder: head.Order0,
              };
            });
            footerContent = arrPracticeConfig.map((footer) => {
              return {
                Title: footer.Title,
                Category: footer.Category.toLowerCase(),
                FooterImage: footer.FooterImage,
                COrder: footer.Order0,
              }
            })
            moduleHead = moduleArr.length > 0 && moduleArr;
            firstIndexOrderNo = moduleHead[0].COrder;
            lastModuleOrderNo = moduleArr[moduleArr.length - 1].COrder;
            setRender(true);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // life cycle of render
  useEffect(() => {
    setLoader(true);
    props.URL.lists
      .getByTitle("Practice")
      .items.select("*,Practice/Title")
      .expand("Practice")
      .get()
      .then(async (val) => {
        await props.URL.lists
          .getByTitle("PracticeSubSteps")
          .items
          .select("*, Practice/ID")
          .expand("Practice")
          .get()
          .then((SubSteps) => {
            console.log(SubSteps);
            arrSubSteps = SubSteps.map((obj) => {
              return {
                ID: obj.PracticeId,
                SubSteps: obj.SubSteps
              }
            })
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
                arrSubStep: arrSubSteps.filter((data) => data.ID == row.ID),
              }
            })
            setAllPrctice([...arrPrctice]);
            console.log(arrPrctice);
            let primaryPractice = moduleHead
              .map((title) => {
                return {
                  Title: title.Title,
                  About: title.About,
                  deliver: title.deliver,
                  COrder: title.COrder,
                  isInComplete: arrPrctice
                    .filter((step) => step.Practice == title.Title)
                    .some((step) => step.isRead == false),
                };
              })
              .filter((practice) => practice.isInComplete == true)[0];
            primaryPractice != undefined
              ? (
                arrDeliver = moduleHead.filter(
                  (deliver) => deliver.Title == primaryPractice.Title
                )[0],
                arrPrimarySteps = arrPrctice.filter(
                  (step) => step.Practice == primaryPractice.Title
                ),
                footerArr = footerContent.length > 0
                &&
                footerContent.map((row) => {
                  return {
                    Title: row.Title,
                    Category: row.Category,
                    FooterImage: row.FooterImage,
                    COrder: row.COrder,
                    isActive: row.Title == arrDeliver.Title ? true : false
                  }
                }),
                (lastOrderNo = arrDeliver != undefined ? arrDeliver.COrder : {}),
                setArrFooter(footerArr),
                setArrDelSec(arrDeliver),
                setPrimarySteps([]),
                setPrimarySteps([...arrPrimarySteps]),
                setLoader(false),
                setRender(false)
              ) : (
                reRunning(lastModuleOrderNo)
              );
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  useEffect(() => {
    latestOrderNO = backContent.COrder;
    objCompleteDeliver = moduleHead.filter(
      (deliver) => deliver.Title == backContent.Title
    )[0];
    arrCompleteSteps = allPrctice.filter(
      (step) => step.Practice == backContent.Title
    );
    footerArr = footerContent.length > 0
      &&
      footerContent.map((row) => {
        return {
          Title: row.Title,
          Category: row.Category,
          FooterImage: row.FooterImage,
          COrder: row.COrder,
          isActive: row.Title == backContent.Title ? true : false
        }
      })
    setArrFooter(footerArr);
    setArrDelSec(objCompleteDeliver);
    setPrimarySteps([]);
    setPrimarySteps([...arrCompleteSteps]);
    setReadValue(false);
    setLoader(false);
  }, [readValue]);

  useEffect(() => {
    objCompleteDeliver = moduleHead[0];
    arrCompleteSteps = allPrctice.filter(
      (step) => step.Practice == objCompleteDeliver.Title
    );
    footerArr = footerContent.length > 0
      &&
      footerContent.map((row) => {
        return {
          Title: row.Title,
          Category: row.Category,
          FooterImage: row.FooterImage,
          COrder: row.COrder,
          isActive: row.Title == objCompleteDeliver.Title ? true : false
        }
      })
    setArrFooter(footerArr);
    setArrDelSec(objCompleteDeliver);
    setPrimarySteps([]);
    setPrimarySteps([...arrCompleteSteps]);
    setLoader(false);
    setCompleteModule(false);
  }, [completeModule]);

  const reRunning = (currentModuleOrderNO) => {
    lastModuleOrderNo == currentModuleOrderNO
      ? (
        setLoader(true),
        latestOrderNO = moduleHead[0].COrder,
        lastOrderNo = moduleHead[moduleHead.length - 1].COrder,
        setCompleteModule(true)
      )
      : setRender(true);
  };

  const BeforeModule = (ordNumber) => {
    setLoader(true);
    backModule = moduleHead.filter((e) => e.COrder < ordNumber);
    backContent = backModule[backModule.length - 1];
    setTimeout(() => {
      setReadValue(true);
    }, 1000);
  };

  const AfterModule = (ordNumber) => {
    setLoader(true);
    backModule = moduleHead.filter((e) => e.COrder > ordNumber);
    backContent = backModule.shift();
    setTimeout(() => {
      setReadValue(true);
    }, 1000);
  };

  return (
    <>
      {primarySteps.length > 0 && (
        <>
          {
            loader
              ? (
                <Loader />
              )
              : <>
                <Header
                  context={props.context}
                  sp={props.sp}
                  arrDelSec={arrDelSec}
                  URL={props.URL}
                />
                <Questions
                  context={props.context}
                  sp={props.sp}
                  PrimarySteps={primarySteps}
                  arrDelSec={arrDelSec}
                  reRunning={reRunning}
                  BeforeModule={BeforeModule}
                  AfterModule={AfterModule}
                  URL={props.URL}
                  firstIndexOrderNo={firstIndexOrderNo}
                  lastOrderNo={lastOrderNo}
                  latestOrderNO={latestOrderNO}
                />
                <Footerimg
                  context={props.context}
                  sp={props.sp}
                  URL={props.URL}
                  arrFooter={arrFooter}
                />
                <FooterCategories
                  context={props.context}
                  sp={props.sp}
                  URL={props.URL}
                />
              </>
          }
        </>
      )}
    </>
  );
};

export default App;
