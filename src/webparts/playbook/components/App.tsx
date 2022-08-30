import * as React from "react";
import Header from "./Header";
import Questions from "./Questions";
import Footerimg from "./Footerimg";
import FooterCategories from "./FooterCategories";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Patheay from "./Patheay";
import HelpGuide from "./HelpGuide";
import "../../../ExternalRef/css/style.scss";
import NavHeader from "./NavHeader";

type Detail = {
  Title: string;
  Order?: number;
};

interface IListConfig {
  Title: string;
  deliver: string;
  About: string;
  Next: string;
  Previous: string;
  ID: number;
  UserId?: number;
  Order?: number;
  isInComplete?: boolean;
}

interface IListFooter {
  Title: string;
  Category: string;
  FooterImage: string;
  Order: number;
  isActive: boolean;
}

interface IListFooterConfig {
  Title: string;
  Next: string;
  Previous: string;
  ID: number;
  Category: string;
  FooterImage: string;
  Order: number;
}

interface IListSubStep {
  ID: number;
  SubSteps: string;
}

interface IListStep {
  Title: string;
  ID: number;
  Step: string;
  stepsHeading: string;
  Time: string;
  CompletedUser: string;
  isRead: boolean;
  Icon: string;
  arrSubStep: IListSubStep[] | number;
  Next: number;
  Previous: number;
  UserId: number;
  Order?: number;
}

interface IUserList {
  Value: string;
}

let isArrSteps: IListStep[];
let arrSteps: IListStep[];
let arrListConfig: any[];
let moduleHead: IListConfig[];
let moduleArr: IListConfig[];
let arrPrimarySteps: IListStep[];
let backModule: IListConfig[];
let arrComSteps: IListStep[];
let footerContent: IListFooterConfig[];
let footerArr: IListFooter[];
let arrSubSteps: IListSubStep[];
let arrMasterAnnual: any[];
let objComDeliver: IListConfig;
let backContent: Detail;
let UserId: number;
let arrDeliver: IListConfig;
let firstModOrdNo: number;
let latestModOrdNo: number;
let latestOrderNO: number | string;
let lastModOrdNo: number;
let pageURL: any;
let pageType: string;
let nextModuleTitle: string;
let PrimaryQus: IListConfig;
let curSteps: IListConfig;
let firstName: IUserList[];
let firstValue: string;
let lastName: IUserList[];
let lastValue: string;
let firstValSplit: string[];
let lastValSplit: string[];
let valueOfFirstLetter: string;
let valueOfLastLetter: string;
let arrCategory;
let arrCatConfig;
// let pageURL:string;

const App = (props: any): JSX.Element => {
  /* All States */
  const [allSteps, setAllSteps] = useState<IListStep[]>(arrSteps);
  const [primarySteps, setPrimarySteps] = useState([]);
  const [arrDelSec, setArrDelSec] = useState<IListConfig>(arrDeliver);
  const [arrFooter, setArrFooter] = useState<IListFooter[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");

  /* Get current user details */
  const getCurrentUserDetail = (): void => {
    pageURL = new URLSearchParams(window.location.search);
    pageType = pageURL.get("type") == "phases" ? "phases" : "practice";
    // pageType = "practice";
    // pageType = "phases";
    // console.log(pageURL);
    // console.log(pageType);
    // props.URL.lists
    //   .getByTitle(props.masterAnnualPlan)
    //   .items.get()
    //   .then(async (datas) => {
    //     // console.log(datas);
    //     arrMasterAnnual = datas.map((objects) => {
    //       return {
    //         Project: objects.Title,
    //         ID: objects.ID,
    //         TOD: objects.TypeofProject,
    //       };
    //     });
    //     // console.log(arrMasterAnnual);
    //     await props.URL.lists
    //       .getByTitle("Delivery Plan Phase List")
    //       .items.get()
    //       .then((values) => {
    //         // console.log(values);
    //       })
    //       .catch((err) => {
    //         // console.log(err);
    //       });
    //   })
    //   .catch((err: string) => {
    //     // console.log(err);
    //   });
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
            pageType == "phases" ? getPhasesConfig() : getPracticeConfig();
            getCategoryConfig();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // * Get Category Config
  const getCategoryConfig = () => {
    props.URL.lists
      .getByTitle("CaterogyConfig")
      .items.get()
      .then((res) => {
        arrCatConfig = res.map((row) => ({ Title: row.Title, Icon: row.Icon }));
      });
  };
  /* Get practiceConfig list all datas */
  const getPracticeConfig = (): void => {
    props.URL.lists
      .getByTitle("PracticeConfig")
      .items.select("*,Next/Title, Previous/Title")
      .expand("Next, Previous")
      .get()
      .then((res) => {
        let arrJSON;
        arrListConfig = res;
        moduleArr = arrListConfig.map((head) => {
          arrJSON = JSON.parse(head.Deliverable.slice(1, -1));
          return {
            Title: head.Title,
            deliver: arrJSON,
            About: head.About,
            Next: head.Next != undefined ? head.Next.Title : undefined,
            Previous:
              head.Previous != undefined ? head.Previous.Title : undefined,
            ID: head.ID,
          };
        });
        footerContent = arrListConfig.map((footer) => {
          return {
            Title: footer.Title,
            Category: footer.Category.toLowerCase(),
            FooterImage: footer.FooterImage,
            Next: footer.Next != undefined ? footer.Next.Title : undefined,
            Previous:
              footer.Previous != undefined ? footer.Previous.Title : undefined,
            ID: footer.ID,
            Order: footer.Order,
          };
        });
        let arrArrangedModules = [];
        arrArrangedModules.push(moduleArr.filter((row) => !row.Previous)[0]);
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
        moduleHead = arrArrangedModules.length > 0 && arrArrangedModules;
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
        getPractice();
      })
      .then(() => {
        props.URL.lists
          .getByTitle("PhasesConfig")
          .items.select("*,Next/Title, Previous/Title")
          .expand("Next, Previous")
          .get()
          .then((res) => {
            let categories = res.map((row) => row.Category);
            arrCategory = categories.filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Get phasesConfig list all datas */
  const getPhasesConfig = (): void => {
    props.URL.lists
      .getByTitle("PhasesConfig")
      .items.select("*,Next/Title, Previous/Title")
      .expand("Next, Previous")
      .get()
      .then((res) => {
        let arrJSON;
        arrListConfig = res;
        moduleArr = arrListConfig.map((head) => {
          arrJSON = JSON.parse(head.Deliverable.slice(1, -1));
          return {
            Title: head.Title,
            deliver: arrJSON,
            About: head.About,
            Next: head.Next != undefined ? head.Next.Title : undefined,
            Previous:
              head.Previous != undefined ? head.Previous.Title : undefined,
            ID: head.ID,
          };
        });
        footerContent = arrListConfig.map((footer) => {
          return {
            Title: footer.Title,
            Category: footer.Category.toLowerCase(),
            FooterImage: footer.FooterImage,
            Next: footer.Next != undefined ? footer.Next.Title : undefined,
            Previous:
              footer.Previous != undefined ? footer.Previous.Title : undefined,
            ID: footer.ID,
            Order: footer.Order,
          };
        });
        let arrArrangedModules = [];
        arrArrangedModules.push(moduleArr.filter((row) => !row.Previous)[0]);
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
        moduleHead = arrArrangedModules.length > 0 && arrArrangedModules;
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
        getPhases();
      })
      .then(() => {
        props.URL.lists
          .getByTitle("PracticeConfig")
          .items.select("*,Next/Title, Previous/Title")
          .expand("Next, Previous")
          .get()
          .then((res) => {
            let categories = res.map((row) => row.Category);
            arrCategory = categories.filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Get practice list all datas */
  const getPractice = (): void => {
    props.URL.lists
      .getByTitle("Practice")
      .items.select("*,Practice/Title, Next/ID, Previous/ID")
      .expand("Practice, Next, Previous")
      .get()
      .then((val) => {
        setLoader(true);
        arrSteps = val.map((row) => {
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
            stepsHeading: row.Practice.Title,
            Time: row.Time,
            CompletedUser: row.CompletedUser != null ? row.CompletedUser : "",
            isRead: isUserCompleted,
            Icon: row.Icon ? row.Icon : "",
            arrSubStep: row.ID,
            Next: row.NextId,
            Previous: row.PreviousId,
          };
        });
        getPracticeSubSteps();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Get phases list all datas */
  const getPhases = (): void => {
    props.URL.lists
      .getByTitle("Phases")
      .items.select("*,Phases/Title, Next/ID, Previous/ID")
      .expand("Phases, Next, Previous")
      .get()
      .then((val) => {
        setLoader(true);
        arrSteps = val.map((row) => {
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
            stepsHeading: row.Phases.Title,
            Time: row.Time,
            CompletedUser: row.CompletedUser != null ? row.CompletedUser : "",
            isRead: isUserCompleted,
            Icon: row.Icon ? row.Icon : "",
            arrSubStep: row.ID,
            Next: row.NextId,
            Previous: row.PreviousId,
          };
        });
        getPhasesSubSteps();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Get practiceSubSteps list all datas */
  const getPracticeSubSteps = (): void => {
    props.URL.lists
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
        isArrSteps = arrSteps.map((row) => {
          return {
            UserId: row.UserId,
            Title: row.Title,
            ID: row.ID,
            Step: row.Step,
            stepsHeading: row.stepsHeading,
            Time: row.Time,
            CompletedUser: row.CompletedUser,
            isRead: row.isRead,
            Icon: row.Icon,
            arrSubStep: arrSubSteps.filter((data) => data.ID == row.ID),
            Next: row.Next,
            Previous: row.Previous,
          };
        });
        setAllSteps([]);
        setAllSteps([...isArrSteps]);
        let startSteps = moduleHead.filter(
          (firstModule) => firstModule.Previous == undefined
        )[0];
        curSteps = [
          {
            Title: startSteps.Title,
            About: startSteps.About,
            deliver: startSteps.deliver,
            Next: startSteps.Next,
            Previous: startSteps.Previous,
            ID: startSteps.ID,
            Order: startSteps.Order,
            isInComplete: isArrSteps
              .filter((step) => step.stepsHeading == startSteps.Title)
              .some((step) => step.isRead == false),
          },
        ].filter((practice) => practice.isInComplete == true)[0];
        curSteps != undefined
          ? ((arrDeliver = moduleHead.filter(
              (DeliSec) => DeliSec.Title == curSteps.Title
            )[0]),
            (arrPrimarySteps = isArrSteps.filter(
              (step) => step.stepsHeading == curSteps.Title
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
          : moduleRerunning(startSteps.Next);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Get phasesSubSteps list all datas */
  const getPhasesSubSteps = (): void => {
    props.URL.lists
      .getByTitle("PhasesSubSteps")
      .items.select("*, Phases/ID")
      .expand("Phases")
      .get()
      .then((SubSteps) => {
        arrSubSteps = SubSteps.map((obj) => {
          return {
            ID: obj.PhasesId,
            SubSteps: obj.SubSteps,
          };
        });
        isArrSteps = arrSteps.map((row) => {
          return {
            UserId: row.UserId,
            Title: row.Title,
            ID: row.ID,
            Step: row.Step,
            stepsHeading: row.stepsHeading,
            Time: row.Time,
            CompletedUser: row.CompletedUser,
            isRead: row.isRead,
            Icon: row.Icon,
            arrSubStep: arrSubSteps.filter((data) => data.ID == row.ID),
            Next: row.Next,
            Previous: row.Previous,
          };
        });
        setAllSteps([]);
        setAllSteps([...isArrSteps]);
        let startSteps = moduleHead.filter(
          (firstModule) => firstModule.Previous == undefined
        )[0];
        curSteps = [
          {
            Title: startSteps.Title,
            About: startSteps.About,
            deliver: startSteps.deliver,
            Next: startSteps.Next,
            Previous: startSteps.Previous,
            ID: startSteps.ID,
            Order: startSteps.Order,
            isInComplete: isArrSteps
              .filter((step) => step.stepsHeading == startSteps.Title)
              .some((step) => step.isRead == false),
          },
        ].filter((phases) => phases.isInComplete == true)[0];
        curSteps != undefined
          ? ((arrDeliver = moduleHead.filter(
              (DeliSec) => DeliSec.Title == curSteps.Title
            )[0]),
            (arrPrimarySteps = isArrSteps.filter(
              (step) => step.stepsHeading == curSteps.Title
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
          : moduleRerunning(startSteps.Next);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* All modules Rerunning */
  const moduleRerunning = (nextQus): void => {
    nextQus != undefined
      ? ((PrimaryQus = moduleHead.filter(
          (currentObj) => currentObj.Title == nextQus
        )[0]),
        PrimaryQus != undefined &&
          ((curSteps = [
            {
              Title: PrimaryQus.Title,
              About: PrimaryQus.About,
              deliver: PrimaryQus.deliver,
              Next: PrimaryQus.Next,
              Previous: PrimaryQus.Previous,
              ID: PrimaryQus.ID,
              isInComplete: isArrSteps
                .filter((step) => step.stepsHeading == PrimaryQus.Title)
                .some((step) => step.isRead == false),
            },
          ].filter((isStep) => isStep.isInComplete == true)[0]),
          curSteps != undefined
            ? ((arrDeliver = moduleHead.filter(
                (deliver) => deliver.Title == curSteps.Title
              )[0]),
              (arrPrimarySteps = isArrSteps.filter(
                (step) => step.stepsHeading == curSteps.Title
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

  /* All Values Rearrangeing */
  const reArrange = (arrAllSteps, footerArr, DeliverableObj): void => {
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
        stepsHeading: row.stepsHeading,
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
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  /* all steps complete after first questions Running */
  const comAllModule = (): void => {
    let arrComArrangedTime = [];
    objComDeliver = moduleHead.filter((module) => !module.Previous)[0];
    arrComSteps = isArrSteps.filter(
      (step) => step.stepsHeading == objComDeliver.Title
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
        stepsHeading: row.stepsHeading,
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
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  /* Read module function */
  const readModules = (): void => {
    let arrArrangedTime = [];
    latestOrderNO = backContent.Order;
    objComDeliver = moduleHead.filter(
      (deliver) => deliver.Title == backContent.Title
    )[0];
    arrComSteps = allSteps.filter(
      (step) => step.stepsHeading == backContent.Title
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
        stepsHeading: row.stepsHeading,
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

  /* next module running */
  const reRunning = (curModOrdNo): void => {
    lastModOrdNo == curModOrdNo
      ? (setLoader(true),
        (latestOrderNO = moduleHead[0].Order),
        (latestModOrdNo = moduleHead[moduleHead.length - 1].Order),
        comAllModule())
      : pageType == "phases"
      ? getPhases()
      : getPractice();
  };

  /* function of Previous Module */
  const BeforeModule = (ordNumber): void => {
    setLoader(true);
    backModule = moduleHead.filter((row) => row.Order < ordNumber);
    backContent = backModule[backModule.length - 1];
    setTimeout(() => {
      readModules();
    }, 1000);
  };

  /* function of Next Module */
  const AfterModule = (ordNumber): void => {
    setLoader(true);
    backModule = moduleHead.filter((row) => row.Order > ordNumber);
    backContent = backModule.shift();
    setTimeout(() => {
      readModules();
    }, 1000);
  };

  /* life cycle of onload */
  useEffect(() => {
    getCurrentUserDetail();
  }, []);

  return (
    <>
      {/* {primarySteps.length > 0 && (
        <>
          {loader ? (
            <Loader />
          ) : (
            <>
              <NavHeader />
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
                Category={arrCategory}
                catConfig={arrCatConfig}
              />
            </>
          )}
        </>
      )} */}
      {/* <Patheay /> */}
      <HelpGuide />
    </>
  );
};

export default App;
