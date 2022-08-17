import * as React from "react";
import Header from "./Header";
import Questions from "./Questions";
import Footerimg from "./Footerimg";
import FooterCategories from "./FooterCategories";
import { useState, useEffect } from "react";
import "../../../ExternalRef/css/style.scss";
import Loader from "./Loader";
import Patheay from "./Patheay";

let arrPrctice = [];
let UserId;
let arrPracticeConfig = [];
let moduleHead = [];
let moduleArr = [];
let arrPrimarySteps = [];
let arrDeliver;
let objComDeliver = { Title: "", Order: "" };
let arrComSteps = [];
let backModule = [];
let backContent = { Title: "", Order: "" };
let firstModOrdNo;
let latestModOrdNo;
let latestOrderNO;
let footerContent = [];
let footerArr = [];
let lastModOrdNo;
let arrSubSteps = [];
let arrMasterAnnual = [];
let pageURL;
let pageType;
let nextModuleTitle;
let PrimaryQus;
let currentPractice;
let firstName;
let firstValue;
let lastName;
let lastValue;
let firstValSplit;
let lastValSplit;
let valueOfFirstLetter;
let valueOfLastLetter;

const App = (props) => {
  const [allPrctice, setAllPrctice] = useState(arrPrctice);
  const [render, setRender] = useState(false);
  const [primarySteps, setPrimarySteps] = useState([]);
  const [arrDelSec, setArrDelSec] = useState(arrDeliver);
  const [arrFooter, setArrFooter] = useState([]);
  const [loader, setLoader] = useState(true);
  const [userName, setUserName] = useState("");

  // life cycle of onload
  useEffect(() => {
    // pageURL = new URLSearchParams(window.location.search);
    // pageType = pageURL.get("type");
    pageType = "phases";
    // console.log(pageURL);
    // console.log(pageType);
    props.URL.lists
      .getByTitle(props.masterAnnualPlan)
      .items.get()
      .then(async (datas) => {
        // console.log(datas);
        arrMasterAnnual = datas.map((objects) => {
          return {
            Project: objects.Title,
            ID: objects.ID,
            TOD: objects.TypeofProject,
          };
        });
        // console.log(arrMasterAnnual);
        await props.URL.lists
          .getByTitle("Delivery Plan Phase List")
          .items.get()
          .then((values) => {
            // console.log(values);
          })
          .catch((err) => {
            // console.log(err);
          });
      })
      .catch((err) => {
        // console.log(err);
      });
    setLoader(true);

    // Current user mail get
    props.URL.currentUser()
      .then(async (res) => {
        UserId = res.Id;
        setUserName(res.Title);

        /* Current user details */
        await props.sp.profiles
          .getPropertiesFor(res.LoginName)
          .then(async (event) => {
            firstName = event.UserProfileProperties.filter(
              (val) => val.Key == "FirstName"
            );
            lastName = event.UserProfileProperties.filter(
              (val) => val.Key == "LastName"
            );
            firstValue = firstName
              .map((firstVal) => {
                return firstVal.Value;
              })
              .toString();
            lastValue = lastName
              .map((lastVal) => {
                return lastVal.Value;
              })
              .toString();
            firstValSplit = firstValue.split("");
            lastValSplit = lastValue.split("");
            valueOfFirstLetter = firstValSplit[0];
            valueOfLastLetter = lastValSplit[0];

            /* get configlist datas */
            await props.URL.lists
              .getByTitle("PracticeConfig")
              .items.select("*,Next/Title, Previous/Title")
              .expand("Next, Previous")
              .get()
              .then((res) => {
                let arrJSON;
                arrPracticeConfig = res;
                moduleArr = arrPracticeConfig.map((head) => {
                  arrJSON = JSON.parse(head.Deliverable.slice(1, -1));
                  return {
                    Title: head.Title,
                    deliver: arrJSON,
                    About: head.About,
                    Next: head.Next != undefined ? head.Next.Title : undefined,
                    Previous:
                      head.Previous != undefined
                        ? head.Previous.Title
                        : undefined,
                    ID: head.ID,
                  };
                });
                footerContent = arrPracticeConfig.map((footer) => {
                  return {
                    Title: footer.Title,
                    Category: footer.Category.toLowerCase(),
                    FooterImage: footer.FooterImage,
                    Next:
                      footer.Next != undefined ? footer.Next.Title : undefined,
                    Previous:
                      footer.Previous != undefined
                        ? footer.Previous.Title
                        : undefined,
                    ID: footer.ID,
                    Order: footer.Order,
                  };
                });
                let arrArrangedModules = [];
                arrArrangedModules.push(
                  moduleArr.filter((row) => !row.Previous)[0]
                );
                moduleArr.slice(1).forEach(() => {
                  let nextTitle =
                    arrArrangedModules[arrArrangedModules.length - 1].Next;
                  arrArrangedModules.push(
                    moduleArr.filter((row) => row.Title == nextTitle)[0]
                  );
                });
                arrArrangedModules = arrArrangedModules.map((row, i) => {
                  return {
                    Title: row.Title,
                    deliver: row.deliver,
                    About: row.About,
                    Next: row.Next,
                    Previous: row.Previous,
                    ID: row.ID,
                    Order: i + 1,
                  };
                });
                moduleHead =
                  arrArrangedModules.length > 0 && arrArrangedModules;
                firstModOrdNo = moduleHead
                  .filter((ordNo) => ordNo.Previous == undefined)
                  .map((firstID) => {
                    return firstID.Order;
                  })[0];
                lastModOrdNo = moduleHead
                  .filter((ordNo) => ordNo.Next == undefined)
                  .map((lastID) => {
                    return lastID.Order;
                  })[0];
                setRender(true);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
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
      .items.select("*,Practice/Title, Next/ID, Previous/ID")
      .expand("Practice, Next, Previous")
      .get()
      .then(async (val) => {
        await props.URL.lists
          .getByTitle("PracticeSubSteps")
          .items.select("*, Practice/ID")
          .expand("Practice")
          .get()
          .then((SubSteps) => {
            arrSubSteps = SubSteps.map((obj) => {
              return {
                ID: obj.PracticeId,
                SubSteps: obj.SubSteps,
              };
            });
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
                CompletedUser:
                  row.CompletedUser != null ? row.CompletedUser : "",
                isRead: isUserCompleted,
                Icon: row.Icon ? row.Icon : "",
                arrSubStep: arrSubSteps.filter((data) => data.ID == row.ID),
                Next: row.NextId,
                Previous: row.PreviousId,
              };
            });
            setAllPrctice([...arrPrctice]);
            let startPractice = moduleHead.filter(
              (firstModule) => firstModule.Previous == undefined
            )[0];
            currentPractice = [
              {
                Title: startPractice.Title,
                About: startPractice.About,
                deliver: startPractice.deliver,
                Next: startPractice.Next,
                Previous: startPractice.Previous,
                ID: startPractice.ID,
                Order: startPractice.Order,
                isInComplete: arrPrctice
                  .filter((step) => step.Practice == startPractice.Title)
                  .some((step) => step.isRead == false),
              },
            ].filter((practice) => practice.isInComplete == true)[0];
            currentPractice != undefined
              ? ((arrDeliver = moduleHead.filter(
                  (DeliSec) => DeliSec.Title == currentPractice.Title
                )[0]),
                (arrPrimarySteps = arrPrctice.filter(
                  (step) => step.Practice == currentPractice.Title
                )),
                (footerArr =
                  footerContent.length > 0 &&
                  footerContent.map((row) => {
                    return {
                      Title: row.Title,
                      Category: row.Category,
                      FooterImage: row.FooterImage,
                      Order: row.Order,
                      isActive: row.Title == arrDeliver.Title ? true : false,
                    };
                  })),
                (latestModOrdNo = arrDeliver.Order),
                arrPrimarySteps.length > 0 &&
                  ((nextModuleTitle = arrDeliver.Next),
                  reArrange(arrPrimarySteps, footerArr, arrDeliver)),
                setRender(false))
              : moduleRerunning(startPractice.Next);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const moduleRerunning = (nextQus) => {
    nextQus != undefined
      ? ((PrimaryQus = moduleHead.filter(
          (currentObj) => currentObj.Title == nextQus
        )[0]),
        PrimaryQus != undefined &&
          ((currentPractice = [
            {
              Title: PrimaryQus.Title,
              About: PrimaryQus.About,
              deliver: PrimaryQus.deliver,
              Next: PrimaryQus.Next,
              Previous: PrimaryQus.Previous,
              ID: PrimaryQus.ID,
              isInComplete: arrPrctice
                .filter((step) => step.Practice == PrimaryQus.Title)
                .some((step) => step.isRead == false),
            },
          ].filter((practice) => practice.isInComplete == true)[0]),
          currentPractice != undefined
            ? ((arrDeliver = moduleHead.filter(
                (deliver) => deliver.Title == currentPractice.Title
              )[0]),
              (arrPrimarySteps = arrPrctice.filter(
                (step) => step.Practice == currentPractice.Title
              )),
              (footerArr =
                footerContent.length > 0 &&
                footerContent.map((row) => {
                  return {
                    Title: row.Title,
                    Category: row.Category,
                    FooterImage: row.FooterImage,
                    Order: row.Order,
                    isActive: row.Title == arrDeliver.Title ? true : false,
                  };
                })),
              (latestModOrdNo = arrDeliver.Order),
              arrPrimarySteps.length > 0 &&
                ((nextModuleTitle = arrDeliver.Next),
                reArrange(arrPrimarySteps, footerArr, arrDeliver)))
            : moduleRerunning(PrimaryQus.Next)))
      : comAllModule();
  };

  const reArrange = (arrAllSteps, footerArr, DeliverableObj) => {
    let arrArrangedSteps = [];
    arrArrangedSteps.push(arrAllSteps.filter((row) => !row.Previous)[0]);
    arrAllSteps.slice(1).forEach(() => {
      let nextID = arrArrangedSteps[arrArrangedSteps.length - 1].Next;
      arrArrangedSteps.push(arrAllSteps.filter((row) => row.ID == nextID)[0]);
    });
    arrArrangedSteps = arrArrangedSteps.map((row, i) => {
      return {
        CompletedUser: row.CompletedUser,
        ID: row.ID,
        Icon: row.Icon,
        Next: row.Next,
        Practice: row.Practice,
        Previous: row.Previous,
        Step: row.Step,
        Time: row.Time,
        Title: row.Title,
        UserId: row.UserId,
        arrSubStep: row.arrSubStep,
        isRead: row.isRead,
        Order: i + 1,
      };
    });
    latestOrderNO = "";
    setArrFooter(footerArr);
    setArrDelSec(DeliverableObj);
    setPrimarySteps([]);
    setPrimarySteps(arrArrangedSteps);
    setRender(false);
    setLoader(false);
  };

  const comAllModule = () => {
    let arrComArrangedTime = [];
    objComDeliver = moduleHead.filter((module) => !module.Previous)[0];
    arrComSteps = arrPrctice.filter(
      (step) => step.Practice == objComDeliver.Title
    );
    arrComArrangedTime.push(arrComSteps.filter((row) => !row.Previous)[0]);
    arrComSteps.slice(1).forEach(() => {
      let nextID = arrComArrangedTime[arrComArrangedTime.length - 1].Next;
      arrComArrangedTime.push(arrComSteps.filter((row) => row.ID == nextID)[0]);
    });
    arrComArrangedTime = arrComArrangedTime.map((row, i) => {
      return {
        CompletedUser: row.CompletedUser,
        ID: row.ID,
        Icon: row.Icon,
        Next: row.Next,
        Practice: row.Practice,
        Previous: row.Previous,
        Step: row.Step,
        Time: row.Time,
        Title: row.Title,
        UserId: row.UserId,
        arrSubStep: row.arrSubStep,
        isRead: row.isRead,
        Order: i + 1,
      };
    });
    footerArr =
      footerContent.length > 0 &&
      footerContent.map((row) => {
        return {
          Title: row.Title,
          Category: row.Category,
          FooterImage: row.FooterImage,
          Order: row.Order,
          isActive: row.Title == objComDeliver.Title ? true : false,
        };
      });
    latestModOrdNo = moduleHead[moduleHead.length - 1].Order;
    latestOrderNO = moduleHead[0].Order;
    setArrFooter(footerArr);
    setArrDelSec(objComDeliver);
    setPrimarySteps([]);
    setPrimarySteps([...arrComArrangedTime]);
    setLoader(false);
  };

  const readModules = () => {
    let arrArrangedTime = [];
    latestOrderNO = backContent.Order;
    objComDeliver = moduleHead.filter(
      (deliver) => deliver.Title == backContent.Title
    )[0];
    arrComSteps = allPrctice.filter(
      (step) => step.Practice == backContent.Title
    );
    arrArrangedTime.push(arrComSteps.filter((row) => !row.Previous)[0]);
    arrComSteps.slice(1).forEach(() => {
      let nextID = arrArrangedTime[arrArrangedTime.length - 1].Next;
      arrArrangedTime.push(arrComSteps.filter((row) => row.ID == nextID)[0]);
    });
    arrArrangedTime = arrArrangedTime.map((row, i) => {
      return {
        CompletedUser: row.CompletedUser,
        ID: row.ID,
        Icon: row.Icon,
        Next: row.Next,
        Practice: row.Practice,
        Previous: row.Previous,
        Step: row.Step,
        Time: row.Time,
        Title: row.Title,
        UserId: row.UserId,
        arrSubStep: row.arrSubStep,
        isRead: row.isRead,
        Order: i + 1,
      };
    });
    footerArr =
      footerContent.length > 0 &&
      footerContent.map((row) => {
        return {
          Title: row.Title,
          Category: row.Category,
          FooterImage: row.FooterImage,
          Order: row.Order,
          isActive: row.Title == backContent.Title ? true : false,
        };
      });
    setArrFooter(footerArr);
    setArrDelSec(objComDeliver);
    setPrimarySteps([]);
    setPrimarySteps([...arrArrangedTime]);
    setLoader(false);
  };

  const reRunning = (curModOrdNo) => {
    lastModOrdNo == curModOrdNo
      ? (setLoader(true),
        (latestOrderNO = moduleHead[0].Order),
        (latestModOrdNo = moduleHead[moduleHead.length - 1].Order),
        comAllModule())
      : setRender(true);
  };

  const BeforeModule = (ordNumber) => {
    setLoader(true);
    backModule = moduleHead.filter((row) => row.Order < ordNumber);
    backContent = backModule[backModule.length - 1];
    setTimeout(() => {
      readModules();
    }, 1000);
  };

  const AfterModule = (ordNumber) => {
    setLoader(true);
    backModule = moduleHead.filter((row) => row.Order > ordNumber);
    backContent = backModule.shift();
    setTimeout(() => {
      readModules();
    }, 1000);
  };

  return (
    <>
      {primarySteps.length > 0 && (
        <>
          {loader ? (
            <Loader />
          ) : (
            <>
              <Header
                context={props.context}
                sp={props.sp}
                URL={props.URL}
                pageType={pageType}
                arrDelSec={arrDelSec}
                userName={userName}
                valueOfFirstLetter={valueOfFirstLetter}
                valueOfLastLetter={valueOfLastLetter}
              />
              <Questions
                context={props.context}
                sp={props.sp}
                URL={props.URL}
                pageType={pageType}
                PrimarySteps={primarySteps}
                arrDelSec={arrDelSec}
                reRunning={reRunning}
                BeforeModule={BeforeModule}
                AfterModule={AfterModule}
                firstModOrdNo={firstModOrdNo}
                lastModOrdNo={lastModOrdNo}
                latestOrderNO={latestOrderNO}
                latestModOrdNo={latestModOrdNo}
              />
              <Footerimg
                context={props.context}
                sp={props.sp}
                URL={props.URL}
                arrFooter={arrFooter}
                pageType={pageType}
              />
              <FooterCategories
                context={props.context}
                sp={props.sp}
                URL={props.URL}
                pageType={pageType}
              />
            </>
          )}
        </>
      )}
      {/* <Patheay /> */}
    </>
  );
};

export default App;
