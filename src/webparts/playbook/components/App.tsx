import * as React from 'react'
import Header from './Header'
import Questions from './Questions'
import Footerimg from './Footerimg'
import FooterCategories from './FooterCategories'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import Patheay from './Patheay'
import HelpGuide from './HelpGuide'
import '../../../ExternalRef/css/style.scss'
import NavHeader from './NavHeader'
import PhaseQuestion from './PhaseQuestion'
import styles from './Playbook.module.scss'

const SplashImage = require('../../../ExternalRef/img/SplashImage.png')
type Detail = {
  Title: string
  Order?: number
}

interface IListConfig {
  Title: string
  deliver: string
  About: string
  Next: string
  Previous: string
  ID: number
  UserId?: number
  Order?: number
  isInComplete?: boolean
  TOD?: string[]
  usersRoles?: string[]
  activity?: string
  nextActivity?: string
  FooterImage?: string
  Category?: string
  ActiveIcon?: string
  InActiveIcon?: string
}

interface IListFooter {
  Title: string
  Category: string
  FooterImage: string
  Order: number
  isActive: boolean
}

interface IListFooterConfig {
  Title: string
  Next: string
  Previous: string
  ID: number
  Category: string
  FooterImage: string
  Order: number
  activity?: string
  nextActivity?: string
}

interface IListSubStep {
  ID: number
  SubSteps: string
}

interface IListStep {
  Title: string
  ID: number
  Step: string
  stepsHeading: string
  Time: string
  CompletedUser: string
  isRead: boolean
  Icon: string
  arrSubStep: IListSubStep[] | number
  Next: number
  Previous: number
  UserId: number
  Order?: number
  ActiveIcon?: string
  InActiveIcon?: string
}

interface IUserList {
  Value: string
}

let isArrSteps: IListStep[]
let arrSteps: IListStep[]
let arrListConfig: any[]
let moduleHead: IListConfig[]
let moduleArr: IListConfig[]
let arrPrimarySteps: IListStep[]
let backModule: IListConfig[]
let arrComSteps: IListStep[]
let footerContent: IListFooterConfig[]
let footerArr: IListFooter[]
let arrSubSteps: IListSubStep[]
let arrMasterAnnual: any[]
let objComDeliver: IListConfig
let backContent: Detail
let UserId: number
let arrDeliver: IListConfig
let firstModOrdNo: number
let latestModOrdNo: number
let latestOrderNO: number | string
let lastModOrdNo: number
let pageURL: any
let pageType: string
let nextModuleTitle: string
let PrimaryQus: IListConfig
let curSteps: IListConfig
let firstName: IUserList[]
let firstValue: string
let lastName: IUserList[]
let lastValue: string
let firstValSplit: string[]
let lastValSplit: string[]
let valueOfFirstLetter: string
let valueOfLastLetter: string
let arrCategory
let arrCatConfig
let curProject
let curProjectTOD
let arrCurProject
let dPID
let curActivity
let arrModules = []
let arrMainConfig = []
let arrActiveSelected = []
let arrAllPhasesSteps = []
let strSelectedCategory = ''
let strSelecetdPhase = ''
let navComplete: boolean
let arrPhaseConfig
let pathwayTOD
let curTOD
// let curID
// let curProjectID

const App = (props: any): JSX.Element => {
  /* All States */
  const [allSteps, setAllSteps] = useState<IListStep[]>(arrSteps)
  const [primarySteps, setPrimarySteps] = useState([])
  const [arrDelSec, setArrDelSec] = useState<IListConfig>(arrDeliver)
  const [arrFooter, setArrFooter] = useState<IListFooter[]>([])
  const [loader, setLoader] = useState<boolean>(true)
  const [userName, setUserName] = useState<string>('')
  const [navLink, setNavLink] = useState('')
  const [page, setPage] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(0)
  const [allPhasesSteps, setAllPhasesSteps] = useState(arrAllPhasesSteps)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isPhaseAvail, setIsPhaseAvail] = useState(true)
  const [isSplash, setIsSplash] = useState(true)

  /* Get current user details */
  const getCurrentUserDetail = async () => {
    const params = window.location.href.split('?')
    const paramsString = params.length > 1 ? params[1].toLowerCase() : undefined
    const searchParams = new URLSearchParams(paramsString)
    searchParams.has('activityid')
      ? (dPID = Number(searchParams.get('activityid')))
      : ''
    dPID == undefined ? openPathway() : openPhases(dPID)
  }

  /* get pathway open function */
  const openPathway = async () => {
    await props.URL.currentUser()
      .then(async (res) => {
        UserId = res.Id
        setUserName(res.Title)
        await props.sp.profiles
          .getPropertiesFor(res.LoginName)
          .then(async (event) => {
            firstName = event.UserProfileProperties.filter(
              (val) => val.Key == 'FirstName',
            )
            lastName = event.UserProfileProperties.filter(
              (val) => val.Key == 'LastName',
            )
            firstValue = firstName
              .map((firstVal) => {
                return firstVal.Value
              })
              .toString()
            lastValue = lastName
              .map((lastVal) => {
                return lastVal.Value
              })
              .toString()
            firstValSplit = firstValue.split('')
            lastValSplit = lastValue.split('')
            valueOfFirstLetter = firstValSplit[0]
            valueOfLastLetter = lastValSplit[0]
            setNavLink('patheay')
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* get phases open function */
  const openPhases = async (Id) => {
    await props.URL.lists
      .getByTitle(props.deliveryPlanList)
      .items.select('*, AnnualPlanID/ID')
      .expand('AnnualPlanID')
      .getById(Id)
      .get()
      .then((res) => {
        curProject = res.AnnualPlanIDId
        curActivity = res.Title
        //curID = res.ID
      })
    pageType = dPID == null ? 'practice' : 'phases'
    await props.URL.lists
      .getByTitle(props.masterAnnualPlan)
      .items.select(
        '*, ProjectOwner/Title, ProjectOwner/EMail, ProjectOwner/Name, ProjectOwner/ID, ProjectLead/Title, ProjectLead/EMail, ProjectLead/Name, ProjectOwner/ID',
      )
      .expand('ProjectOwner, ProjectLead')
      .top(4000)
      .get()
      .then(async (datas) => {
        arrMasterAnnual = datas.map((objects) => {
          // getting ProjManager
          // Should run for  every dropdown change
          let proManager = !objects.ProjectOwnerId
            ? ''
            : {
                Title: objects.ProjectOwner.Title,
                Name: objects.ProjectOwner.Name,
              }
          let proDeveloper = []
          // getting ProjDeveloper
          proDeveloper = !objects.ProjectLeadId
            ? []
            : objects.ProjectLead.map((data) => {
                return {
                  Title: data.Title,
                  Name: data.Name,
                }
              })
          return {
            Project: objects.Title,
            ID: objects.ID,
            TOD: objects.ProjectType,
            Manager: proManager,
            Developer: proDeveloper,
          }
        })
        curProjectTOD = arrMasterAnnual.filter(
          (proId) => proId.ID == curProject,
        )[0].TOD
        // curProjectTOD = arrMasterAnnual.filter(
        //   (proId) => proId.ID == curProject && proId.Title == curActivity,
        // )[0].TOD

        // Current user mail get
        await props.URL.currentUser()
          .then(async (res) => {
            UserId = res.Id
            setUserName(res.Title)
            /* Current user details */
            await props.sp.profiles
              .getPropertiesFor(res.LoginName)
              .then(async (event) => {
                firstName = event.UserProfileProperties.filter(
                  (val) => val.Key == 'FirstName',
                )
                lastName = event.UserProfileProperties.filter(
                  (val) => val.Key == 'LastName',
                )
                firstValue = firstName
                  .map((firstVal) => {
                    return firstVal.Value
                  })
                  .toString()
                lastValue = lastName
                  .map((lastVal) => {
                    return lastVal.Value
                  })
                  .toString()
                firstValSplit = firstValue.split('')
                lastValSplit = lastValue.split('')
                valueOfFirstLetter = firstValSplit[0]
                valueOfLastLetter = lastValSplit[0]
                getDliverPlan(curProjectTOD)
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  /* Get practiceConfig list all datas */
  const getPracticeConfig = (): void => {
    props.URL.lists
      .getByTitle('PracticeConfig')
      .items.select('*,Next/Title, Previous/Title')
      .expand('Next, Previous')
      .top(4000)
      .get()
      .then((res) => {
        let arrJSON
        arrListConfig = res
        moduleArr = arrListConfig.map((head) => {
          arrJSON = JSON.parse(head.Deliverable.slice(1, -1))
          return {
            Title: head.Title,
            deliver: arrJSON,
            About: head.About,
            Next: head.Next != undefined ? head.Next.Title : undefined,
            Previous:
              head.Previous != undefined ? head.Previous.Title : undefined,
            ID: head.ID,
            usersRoles:
              head.usersRoles && head.usersRoles.length > 0
                ? head.usersRoles
                : [],
            Category: head.Category,
          }
        })
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
          }
        })
        let arrArrangedModules = []
        arrArrangedModules.push(moduleArr.filter((row) => !row.Previous)[0])
        moduleArr.slice(1).forEach(() => {
          let nextTitle = arrArrangedModules[arrArrangedModules.length - 1].Next
          arrArrangedModules.push(
            moduleArr.filter((row) => row.Title == nextTitle)[0],
          )
        })
        arrArrangedModules = arrArrangedModules.map((row, i) => {
          return {
            Title: row.Title,
            deliver: row.deliver,
            About: row.About,
            Next: row.Next,
            Previous: row.Previous,
            ID: row.ID,
            Order: i + 1,
            usersRoles: row.usersRoles,
            Category: row.Category,
          }
        })
        moduleHead = arrArrangedModules.length > 0 && arrArrangedModules
        firstModOrdNo = moduleHead
          .filter((ordNo) => ordNo.Previous == undefined)
          .map((firstID) => {
            return firstID.Order
          })[0]
        lastModOrdNo = moduleHead
          .filter((ordNo) => ordNo.Next == undefined)
          .map((lastID) => {
            return lastID.Order
          })[0]
        getPractice()
      })
      .then(() => {
        props.URL.lists
          .getByTitle('PhasesConfig')
          .items.top(4000)
          .get()
          .then((res) => {
            let categories = res.map((row) => row.Category)
            arrCategory = categories.filter(function (item, pos, self) {
              return self.indexOf(item) == pos
            })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* Get phasesConfig list all datas */
  const getPhasesConfig = (): void => {
    setSelectedCategory('')
    setAllPhasesSteps([])
    props.URL.lists
      .getByTitle('PhasesConfig')
      .items.top(4000)
      .get()
      .then((res) => {
        let arrJSON
        arrListConfig = res
        //adding Config
        arrPhaseConfig = arrListConfig.map((head, i) => {
          arrJSON = JSON.parse(head.Deliverable.slice(1, -1))
          return {
            Title: head.Title,
            deliver: arrJSON,
            About: head.About,
            ID: head.ID,
            // TOD: head.TOD.length > 0 ? head.TOD : [],
            usersRoles: head.usersRoles.length > 0 ? head.usersRoles : [],
            FooterImage: head.FooterImage,
            Category: head.Category.toLowerCase(),
            indx: i,
          }
        })
        curTOD != '' ? getCurPhasesConfig() : getAllPhasesConfig()
      })
      .then(() => {
        props.URL.lists
          .getByTitle('PracticeConfig')
          .items.select('*,Next/Title, Previous/Title')
          .expand('Next, Previous')
          .top(4000)
          .get()
          .then((res) => {
            let categories = res.map((row) => row.Category)
            arrCategory = categories.filter(function (item, pos, self) {
              return self.indexOf(item) == pos
            })
            getPhases()
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* remove duplicates from arrays */
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
  }

  /* get all phases configs */
  const getAllPhasesConfig = () => {
    /* arrCategories which is contains Categories of phase for manipulation and no other reuse - SCR1*/
    var arrCategories = []
    for (var k = 0; k < arrPhaseConfig.length; k++) {
      arrCategories.push(arrPhaseConfig[k].Category)
    }
    arrCategories = removeDuplicates(arrCategories)

    /* starts manipulating phases based on the category */
    var tempArray = []
    for (var i = 0; i < arrCategories.length; i++) {
      for (var j = 0; j < arrPhaseConfig.length; j++) {
        if (arrCategories[i] == arrPhaseConfig[j].Category) {
          tempArray.push(arrPhaseConfig[j])
        }
      }
    }

    if (tempArray.length > 0) arrPhaseConfig = tempArray
    /* Ends manipulating phases based on the category*/

    arrMainConfig = arrPhaseConfig.map((obj, i) => {
      return {
        About: obj.About,
        Title: obj.Title,
        Category: obj.Category,
        deliver: obj.deliver,
        FooterImage: obj.FooterImage,
        ID: obj.ID,
        Order: i + 1,
        usersRoles: obj.usersRoles,
        Next:
          i == arrPhaseConfig.length - 1
            ? undefined
            : arrPhaseConfig.filter((item) => item.indx == i + 1)[0].Title,
        Previous:
          i == 0
            ? undefined
            : arrPhaseConfig.filter((item) => item.indx == i - 1)[0].Title,
      }
    })

    console.log(arrMainConfig)

    footerContent = arrMainConfig.map((footer) => {
      return {
        Title: footer.Title,
        Category: footer.Category,
        FooterImage: footer.FooterImage,
        Next: footer.Next,
        Previous: footer.Previous,
        ID: footer.ID,
        Order: footer.Order,
      }
    })
    console.log(footerContent)
    moduleHead = arrMainConfig.length > 0 && arrMainConfig
    firstModOrdNo = moduleHead
      .filter((ordNo) => ordNo.Previous == undefined)
      .map((firstID) => {
        return firstID.Order
      })[0]
    lastModOrdNo = moduleHead
      .filter((ordNo) => ordNo.Next == undefined)
      .map((lastID) => {
        return lastID.Order
      })[0]
  }

  /* get current phases configs */
  const getCurPhasesConfig = () => {
    //merging delivery plan and phasesconfig
    let arrDelnPhaseConf = arrCurProject.map((row, i) => {
      let curRow = arrPhaseConfig.filter((row2) => row.Phases == row2.Title)[0]
      setIsPhaseAvail(true)
      if (!curRow) {
        setIsPhaseAvail(false)
        setLoader(false)
        return
      }
      let nextActivity =
        i == arrCurProject.length - 1
          ? undefined
          : arrCurProject.filter((row, ind) => ind == i + 1)[0].Title
      return {
        Title: curRow.Title,
        deliver: curRow.deliver,
        About: curRow.About,
        ID: curRow.ID,
        // TOD: curRow.TOD,
        usersRoles: curRow.usersRoles,
        activity: row.Title,
        indx: i,
        nextActivity: nextActivity,
        FooterImage: curRow.FooterImage,
        Category: curRow.Category,
      }
    })
    //set orderno and prev next
    if (arrDelnPhaseConf.filter((row) => row != undefined).length == 0) {
      setIsPhaseAvail(false)
      setLoader(false)
      return
    }
    let moduleArr = arrDelnPhaseConf.map((row, i) => {
      return {
        Title: row.Title,
        deliver: row.deliver,
        About: row.About,
        ID: row.ID,
        TOD: row.TOD,
        usersRoles: row.usersRoles,
        activity: row.activity,
        nextActivity: row.nextActivity,
        Previous:
          i == 0
            ? undefined
            : arrDelnPhaseConf.filter((item) => item.indx == i - 1)[0].Title,
        Next:
          i == arrDelnPhaseConf.length - 1
            ? undefined
            : arrDelnPhaseConf.filter((item) => item.indx == i + 1)[0].Title,
        FooterImage: row.FooterImage,
        Category: row.Category,
        Order: i + 1,
      }
    })
    strSelecetdPhase =
      moduleArr.filter((module) => module.activity == curActivity).length > 0
        ? moduleArr.filter((module) => module.activity == curActivity)[0].Title
        : ''
    // removing duplicate here
    moduleArr = moduleArr.filter(
      (v, i, a) => a['findIndex']((v2) => v2.Title === v.Title) === i,
    )
    let arrPhaModule = []
    // gte index no
    arrPhaModule = moduleArr.map((row, i) => {
      return {
        About: row.About,
        Title: row.Title,
        Category: row.Category,
        deliver: row.deliver,
        FooterImage: row.FooterImage,
        ID: row.ID,
        nextActivity: row.nextActivity,
        Order: row.Order,
        activity: row.activity,
        index: i,
        TOD: row.TOD,
        usersRoles: row.usersRoles,
      }
    })
    //setin prev and next then order no again
    arrMainConfig = arrPhaModule.map((obj, i) => {
      return {
        About: obj.About,
        Title: obj.Title,
        Category: obj.Category,
        deliver: obj.deliver,
        FooterImage: obj.FooterImage,
        Next:
          i == arrPhaModule.length - 1
            ? undefined
            : arrPhaModule.filter((item) => item.index == i + 1)[0].Title,
        Previous:
          i == 0
            ? undefined
            : arrPhaModule.filter((item) => item.index == i - 1)[0].Title,
        ID: obj.ID,
        nextActivity: obj.nextActivity,
        activity: obj.activity,
        Order: i + 1,
        TOD: obj.TOD,
        usersRoles: obj.usersRoles,
      }
    })
    footerContent = arrMainConfig.map((footer) => {
      return {
        Title: footer.Title,
        Category: footer.Category,
        FooterImage: footer.FooterImage,
        Next: footer.Next,
        Previous: footer.Previous,
        ID: footer.ID,
        Order: footer.Order,
        activity: footer.activity,
        nextActivity: footer.nextActivity,
      }
    })

    moduleHead = arrMainConfig.length > 0 && arrMainConfig
    firstModOrdNo = moduleHead
      .filter((ordNo) => ordNo.Previous == undefined)
      .map((firstID) => {
        return firstID.Order
      })[0]
    lastModOrdNo = moduleHead
      .filter((ordNo) => ordNo.Next == undefined)
      .map((lastID) => {
        return lastID.Order
      })[0]
  }

  /* Get practice list all datas */
  const getPractice = (): void => {
    props.URL.lists
      .getByTitle('Practice')
      .items.select('*,Practice/Title, Next/ID, Previous/ID')
      .expand('Practice, Next, Previous')
      .top(4000)
      .get()
      .then((val) => {
        setLoader(true)
        arrSteps = val.map((row) => {
          let isUserCompleted = row.CompletedUser
            ? row.CompletedUser.split(',')
                .map((id) => +id)
                .some((id) => id == UserId)
            : false
          return {
            UserId: UserId,
            Title: row.Title ? row.Title : '',
            ID: row.ID,
            Step: row.Step,
            stepsHeading: row.Practice.Title,
            Time: row.Time,
            CompletedUser: row.CompletedUser != null ? row.CompletedUser : '',
            isRead: isUserCompleted,
            Icon: row.Icon ? row.Icon : '',
            arrSubStep: row.ID,
            Next: row.NextId,
            Previous: row.PreviousId,
            ActiveIcon: `${JSON.parse(row.ActiveIcon).serverUrl}${
              JSON.parse(row.ActiveIcon).serverRelativeUrl
            }`,
            InActiveIcon: `${JSON.parse(row.InActiveIcon).serverUrl}${
              JSON.parse(row.InActiveIcon).serverRelativeUrl
            }`,
            // FooterIcon: `${JSON.parse(row.FooterIcon).serverUrl}${
            //   JSON.parse(row.FooterIcon).serverRelativeUrl
            // }`,
          }
        })
        getPracticeSubSteps()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* Get phases list all datas */
  const getPhases = (): void => {
    props.URL.lists
      .getByTitle('Phases')
      .items.select('*,Phases/Title, Next/ID, Previous/ID')
      .expand('Phases, Next, Previous')
      .top(4000)
      .get()
      .then((val) => {
        setLoader(true)
        arrSteps = val.map((row) => {
          let isUserCompleted = row.CompletedUser
            ? row.CompletedUser.split(',')
                .map((id) => +id)
                .some((id) => id == UserId)
            : false
          return {
            UserId: UserId,
            Title: row.Title ? row.Title : '',
            ID: row.ID,
            Step: row.Step,
            stepsHeading: row.Phases.Title,
            Time: row.Time,
            CompletedUser: row.CompletedUser != null ? row.CompletedUser : '',
            isRead: isUserCompleted,
            Icon: row.Icon ? row.Icon : '',
            arrSubStep: row.ID,
            Next: row.NextId,
            Previous: row.PreviousId,
            ActiveIcon: `${JSON.parse(row.ActiveIcon).serverUrl}${
              JSON.parse(row.ActiveIcon).serverRelativeUrl
            }`,
            InActiveIcon: `${JSON.parse(row.InActiveIcon).serverUrl}${
              JSON.parse(row.InActiveIcon).serverRelativeUrl
            }`,
            // FooterIcon: `${JSON.parse(row.FooterIcon).serverUrl}${
            //   JSON.parse(row.FooterIcon).serverRelativeUrl
            // }`,
          }
        })
        getPhasesSubSteps()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* Get practiceSubSteps list all datas */
  const getPracticeSubSteps = (): void => {
    props.URL.lists
      .getByTitle('PracticeSubSteps')
      .items.select('*, Practice/ID')
      .expand('Practice')
      .top(4000)
      .get()
      .then((SubSteps) => {
        arrSubSteps = SubSteps.map((obj) => {
          return {
            ID: obj.PracticeId,
            SubSteps: obj.SubSteps,
          }
        })
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
            ActiveIcon: row.ActiveIcon,
            InActiveIcon: row.InActiveIcon,
          }
        })
        setAllSteps([])
        setAllSteps([...isArrSteps])
        let startSteps
        strSelectedCategory == 'routine operations practices'
          ? (curSteps = moduleHead.filter(
              (obj) => obj.Category.toLowerCase() == strSelectedCategory,
            )[0])
          : strSelectedCategory == 'routine innovation practices'
          ? (curSteps = moduleHead.filter(
              (obj) => obj.Category.toLowerCase() == strSelectedCategory,
            )[0])
          : ((startSteps = moduleHead.filter(
              (firstModule) => firstModule.Previous == undefined,
            )[0]),
            (curSteps = [
              {
                Title: startSteps.Title,
                About: startSteps.About,
                deliver: startSteps.deliver,
                Next: startSteps.Next,
                Previous: startSteps.Previous,
                ID: startSteps.ID,
                Order: startSteps.Order,
                usersRoles: startSteps.usersRoles,
                isInComplete: isArrSteps
                  .filter((step) => step.stepsHeading == startSteps.Title)
                  .some((step) => step.isRead == false),
              },
            ].filter((practice) => practice.isInComplete == true)[0]))
        curSteps != undefined
          ? ((arrDeliver = moduleHead.filter(
              (DeliSec) => DeliSec.Title == curSteps.Title,
            )[0]),
            (arrPrimarySteps = isArrSteps.filter(
              (step) => step.stepsHeading == curSteps.Title,
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
                }
              })),
            strSelectedCategory == ''
              ? ((latestModOrdNo = arrDeliver.Order),
                arrPrimarySteps.length > 0 &&
                  ((nextModuleTitle = arrDeliver.Next),
                  reArrange(arrPrimarySteps, footerArr, arrDeliver)))
              : getLatestOrderNo(
                  curSteps.Title,
                  arrPrimarySteps,
                  footerArr,
                  arrDeliver,
                ))
          : moduleRerunning(startSteps.Next)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* Get phasesSubSteps list all datas */
  const getPhasesSubSteps = (): void => {
    props.URL.lists
      .getByTitle('PhasesSubSteps')
      .items.select('*, Phases/ID')
      .expand('Phases')
      .top(4000)
      .get()
      .then((SubSteps) => {
        arrSubSteps = SubSteps.map((obj) => {
          return {
            ID: obj.PhasesId,
            SubSteps: obj.SubSteps,
          }
        })
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
            ActiveIcon: row.ActiveIcon,
            InActiveIcon: row.InActiveIcon,
          }
        })
        setAllSteps([])
        setAllSteps([...isArrSteps])
        arrActiveSelected = moduleHead.map((obj) => {
          return {
            Title: obj.Title,
            About: obj.About,
            deliver: obj.deliver,
            Next: obj.Next,
            Previous: obj.Previous,
            ID: obj.ID,
            Order: obj.Order,
            usersRoles: obj.usersRoles,
            activity: obj.activity,
            TOD: obj.TOD,
            PhaseSteps: isArrSteps.filter(
              (step) => step.stepsHeading == obj.Title,
            ),
            isSelected: obj.Title == strSelecetdPhase,
            nextActivity: obj.nextActivity,
            FooterImage: obj.FooterImage,
            Category: obj.Category,
          }
        })
        strSelectedCategory != ''
          ? (arrActiveSelected.forEach((li, i) => {
              arrActiveSelected[i].isSelected = false
            }),
            (arrActiveSelected.filter(
              (row) =>
                row.Category.toLowerCase() == strSelectedCategory.toLowerCase(),
            )[0].isSelected = true))
          : ''
        footerArr =
          arrActiveSelected.length > 0 &&
          arrActiveSelected.map((row) => {
            return {
              Title: row.Title,
              Category: row.Category,
              FooterImage: row.FooterImage,
              Order: row.Order,
              isActive: false,
            }
          })
        arrActiveSelected.some((row) => row.isSelected)
          ? arrActiveSelected
          : (arrActiveSelected[0].isSelected = true)
        footerArr.filter(
          (row) =>
            row.Title ==
            arrActiveSelected.filter((li) => li.isSelected)[0].Title,
        )[0].isActive = true
        setArrDelSec({
          ...arrActiveSelected.filter((row) => row.isSelected)[0],
        })
        setArrFooter(footerArr)
        setAllPhasesSteps([...arrActiveSelected])
        setLoader(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* get latest order number function */
  const getLatestOrderNo = (
    nextQus,
    arrPrimarySteps,
    footerArr,
    arrDeliver,
  ) => {
    nextQus != undefined
      ? ((PrimaryQus = moduleHead.filter(
          (currentObj) => currentObj.Title == nextQus,
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
              Order: PrimaryQus.Order,
              isInComplete: isArrSteps
                .filter((step) => step.stepsHeading == PrimaryQus.Title)
                .some((step) => step.isRead == false),
            },
          ].filter((isStep) => isStep.isInComplete == true)[0]),
          curSteps != undefined
            ? navComplete == true
              ? ((arrDeliver = moduleHead.filter(
                  (deliver) => deliver.Title == curSteps.Title,
                )[0]),
                (arrPrimarySteps = isArrSteps.filter(
                  (step) => step.stepsHeading == curSteps.Title,
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
                    }
                  })),
                (latestModOrdNo = arrDeliver.Order),
                arrPrimarySteps.length > 0 &&
                  ((nextModuleTitle = arrDeliver.Next),
                  (navComplete = false),
                  reArrange(arrPrimarySteps, footerArr, arrDeliver)))
              : ((latestModOrdNo = curSteps.Order),
                reArrange(arrPrimarySteps, footerArr, arrDeliver))
            : getLatestOrderNo(
                PrimaryQus.Next,
                arrPrimarySteps,
                footerArr,
                arrDeliver,
              )))
      : ((latestModOrdNo = moduleHead[moduleHead.length - 1].Order),
        reArrange(arrPrimarySteps, footerArr, arrDeliver))
  }

  /* All modules Rerunning */
  const moduleRerunning = (nextQus): void => {
    nextQus != undefined
      ? ((PrimaryQus = moduleHead.filter(
          (currentObj) => currentObj.Title == nextQus,
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
                (deliver) => deliver.Title == curSteps.Title,
              )[0]),
              (arrPrimarySteps = isArrSteps.filter(
                (step) => step.stepsHeading == curSteps.Title,
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
                  }
                })),
              (latestModOrdNo = arrDeliver.Order),
              arrPrimarySteps.length > 0 &&
                ((nextModuleTitle = arrDeliver.Next),
                reArrange(arrPrimarySteps, footerArr, arrDeliver)))
            : moduleRerunning(PrimaryQus.Next)))
      : comAllModule()
  }

  /* All Values Rearrangeing */
  const reArrange = (arrAllSteps, footerArr, DeliverableObj): void => {
    setSelectedOrder(DeliverableObj.Order)
    let arrArrangedSteps = []
    arrArrangedSteps.push(arrAllSteps.filter((row) => !row.Previous)[0])
    arrAllSteps.slice(1).forEach(() => {
      let nextID = arrArrangedSteps[arrArrangedSteps.length - 1].Next
      arrArrangedSteps.push(arrAllSteps.filter((row) => row.ID == nextID)[0])
    })
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
        ActiveIcon: row.ActiveIcon,
        InActiveIcon: row.InActiveIcon,
      }
    })
    latestOrderNO = DeliverableObj.Order
    setArrFooter(footerArr)
    setArrDelSec(DeliverableObj)
    setPrimarySteps([])
    setPrimarySteps(arrArrangedSteps)
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }

  /* all steps complete after first questions Running */
  const comAllModule = (): void => {
    let arrComArrangedTime = []
    objComDeliver = moduleHead.filter((module) => !module.Previous)[0]
    arrComSteps = isArrSteps.filter(
      (step) => step.stepsHeading == objComDeliver.Title,
    )
    arrComArrangedTime.push(arrComSteps.filter((row) => !row.Previous)[0])
    arrComSteps.slice(1).forEach(() => {
      let nextID = arrComArrangedTime[arrComArrangedTime.length - 1].Next
      arrComArrangedTime.push(arrComSteps.filter((row) => row.ID == nextID)[0])
    })
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
        ActiveIcon: row.ActiveIcon,
        InActiveIcon: row.InActiveIcon,
      }
    })
    footerArr =
      footerContent.length > 0 &&
      footerContent.map((row) => {
        return {
          Title: row.Title,
          Category: row.Category,
          FooterImage: row.FooterImage,
          Order: row.Order,
          isActive: row.Title == objComDeliver.Title ? true : false,
        }
      })
    latestModOrdNo = moduleHead[moduleHead.length - 1].Order
    latestOrderNO = moduleHead[0].Order
    setArrFooter(footerArr)
    setArrDelSec(objComDeliver)
    setPrimarySteps([])
    setPrimarySteps([...arrComArrangedTime])
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }

  /* User Already Read module function */
  const readModules = (): void => {
    let arrArrangedTime = []
    latestOrderNO = backContent.Order
    objComDeliver = moduleHead.filter(
      (deliver) => deliver.Title == backContent.Title,
    )[0]
    arrComSteps = allSteps.filter(
      (step) => step.stepsHeading == backContent.Title,
    )
    arrArrangedTime.push(arrComSteps.filter((row) => !row.Previous)[0])
    arrComSteps.slice(1).forEach(() => {
      let nextID = arrArrangedTime[arrArrangedTime.length - 1].Next
      arrArrangedTime.push(arrComSteps.filter((row) => row.ID == nextID)[0])
    })
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
        ActiveIcon: row.ActiveIcon,
        InActiveIcon: row.InActiveIcon,
      }
    })
    footerArr =
      footerContent.length > 0 &&
      footerContent.map((row) => {
        return {
          Title: row.Title,
          Category: row.Category,
          FooterImage: row.FooterImage,
          Order: row.Order,
          isActive: row.Title == backContent.Title ? true : false,
        }
      })
    setArrFooter(footerArr)
    setArrDelSec(objComDeliver)
    setPrimarySteps([])
    setPrimarySteps([...arrArrangedTime])
    setLoader(false)
  }

  /* next module running */
  const reRunning = (curModOrdNo, nextTitle): void => {
    setSelectedOrder(1)
    navComplete = true
    lastModOrdNo == curModOrdNo
      ? (setLoader(true),
        (latestOrderNO = moduleHead[0].Order),
        (latestModOrdNo = moduleHead[moduleHead.length - 1].Order),
        comAllModule())
      : page == 'phases'
      ? getPhases()
      : getPractice()
  }

  /* function of Previous Module */
  const BeforeModule = (ordNumber): void => {
    setLoader(true)
    setSelectedOrder(ordNumber - 1)
    backModule = moduleHead.filter((row) => row.Order < ordNumber)
    backContent = backModule[backModule.length - 1]
    setTimeout(() => {
      readModules()
    }, 1000)
  }

  /* function of Next Module */
  const AfterModule = (ordNumber): void => {
    setLoader(true)
    setSelectedOrder(ordNumber + 1)
    backModule = moduleHead.filter((row) => row.Order > ordNumber)
    backContent = backModule.shift()
    setTimeout(() => {
      readModules()
    }, 1000)
  }

  /* Get Category Config */
  const getCategoryConfig = (link) => {
    props.URL.lists
      .getByTitle('CaterogyConfig')
      .items.top(4000)
      .get()
      .then((res) => {
        arrCatConfig = res.map((row) => ({
          Title: row.Title,
          Icon: row.Icon,
          // //FooterIcon: row.FooterIcon
          FooterIcon: `${JSON.parse(row.FooterIcon).serverUrl}${
            JSON.parse(row.FooterIcon).serverRelativeUrl
          }`,
        }))
        setPage(link)
        link == 'phases' ? getPhasesConfig() : getPracticeConfig()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* get delivery plan phase list */
  const getDliverPlan = (type) => {
    pathwayTOD = type
    props.URL.lists
      .getByTitle(props.deliveryPlan)
      .items.select('*, Phases/Title, Phases/ID')
      .expand('Phases')
      .top(4000)
      .get()
      .then((values) => {
        // Get items filtered ny TOD
        let arrProject = values
          .map((arr) => {
            return {
              Title: arr.Title,
              delPlan: arr.DeliveryPlanCategory,
              DelTOD: arr.DeliverPlanTypeOfWork.filter((tod) => tod == type)[0],
              Hours: arr.Hours,
              Phases: arr.PhasesId == null ? '' : arr.Phases.Title,
            }
          })
          .filter((event) => event.DelTOD != undefined)
        // filter completion
        let totObj = arrProject.length - 1
        //Set Prevs and Next to Activities
        arrCurProject = arrProject.map((e, i) => {
          return {
            Title: e.Title,
            delPlan: e.delPlan,
            DelTOD: e.DelTOD,
            Hours: e.Hours,
            Phases: e.Phases,
            Order: i + 1,
            Previous: i == 0 ? null : i,
            Next: i < totObj ? 2 + i : null,
          }
        })
        getNavHeader(pageType, pathwayTOD)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* get current project Id */
  const getCurrProjectData = (Id, type) => {
    curProject = null
    curProject = Id
    // curActivity = type;
    curActivity = ''
    strSelecetdPhase = ''
    getDliverPlan(type)
  }

  /* function of navigation */
  const getNavigationLink = (nav, Type) => {
    getNavHeader(nav, Type)
  }

  /* get naveHeader */
  const getNavHeader = (nav, Type) => {
    curTOD = Type
    setLoader(true)
    setNavLink(nav)
    getCategoryConfig(nav)
    setSelectedCategory('')
    strSelectedCategory = ''
  }

  /* footer Navigation function */
  const footerNavigation = (type, cat, curData) => {
    getNavFooter(type, cat, curData)
  }

  /* get footer nav */
  const getNavFooter = (type, cat, curData) => {
    curTOD = curData
    pageType = type
    setNavLink(pageType)
    setPage(pageType)
    getCategoryConfig(pageType)
    navComplete = false
    strSelectedCategory = ''
    strSelectedCategory = cat.toLowerCase()
  }

  const changeHeaderHandler = (selectedPhase) => {
    setArrDelSec(undefined)
    setArrDelSec({ ...selectedPhase })
  }

  const changeFooterHandler = (selectedTitle) => {
    footerArr.forEach((li, i) => {
      footerArr[i].isActive = false
    })
    footerArr.filter((row) => row.Title == selectedTitle)[0].isActive = true
    setArrFooter([...footerArr])
  }

  /* get type of TOD */
  const getTODType = (type) => {
    pageType = 'phases'
    getDliverPlan(type)
  }

  /* life cycle of onload */
  useEffect(() => {
    getCurrentUserDetail()
    setTimeout(() => {
      setIsSplash(false)
    }, 5000)
  }, [])

  return (
    <>
      {isSplash ? (
        <>
          {/* <img src={`${SplashImage}`} style={{ width: 500, height: 500 }} /> */}
          <Loader splashImg={SplashImage} />
        </>
      ) : (
        <>
          <NavHeader
            getNavigationLink={getNavigationLink}
            navLink={navLink}
            dPID={dPID}
            pathwayTOD={pathwayTOD}
            getNavHeader={getNavHeader}
          />
          {navLink == 'phases' ? (
            <>
              {
                <>
                  {arrDelSec && (
                    <Header
                      isPhaseAvail={isPhaseAvail}
                      context={props.context}
                      sp={props.sp}
                      URL={props.URL}
                      pageType={page}
                      arrDelSec={arrDelSec}
                      userName={userName}
                      valueOfFirstLetter={valueOfFirstLetter}
                      valueOfLastLetter={valueOfLastLetter}
                      arrMasterAnnual={arrMasterAnnual}
                      ProjectID={curProject}
                      getCurrProjectData={getCurrProjectData}
                    />
                  )}
                  {allPhasesSteps.length > 0 || !isPhaseAvail ? (
                    loader ? (
                      <Loader splashImg={SplashImage} />
                    ) : (
                      <>
                        {isPhaseAvail ? (
                          <>
                            <PhaseQuestion
                              context={props.context}
                              sp={props.sp}
                              URL={props.URL}
                              pageType={page}
                              PrimarySteps={primarySteps}
                              arrDelSec={arrDelSec}
                              reRunning={reRunning}
                              BeforeModule={BeforeModule}
                              AfterModule={AfterModule}
                              firstModOrdNo={firstModOrdNo}
                              lastModOrdNo={lastModOrdNo}
                              latestOrderNO={latestOrderNO}
                              latestModOrdNo={latestModOrdNo}
                              allPhasesSteps={allPhasesSteps}
                              changeheaderHandler={changeHeaderHandler}
                              changeFooterHandler={changeFooterHandler}
                            />
                            <Footerimg
                              context={props.context}
                              sp={props.sp}
                              URL={props.URL}
                              arrFooter={arrFooter}
                              pageType={page}
                            />
                            <FooterCategories
                              context={props.context}
                              sp={props.sp}
                              URL={props.URL}
                              footerNavigation={footerNavigation}
                              pageType={page}
                              Category={arrCategory}
                              catConfig={arrCatConfig}
                              dPID={dPID}
                              pathwayTOD={pathwayTOD}
                              getNavFooter={getNavFooter}
                            />
                          </>
                        ) : (
                          <div className={styles.noPhaseMsg}>
                            No phases available for selected project!
                          </div>
                        )}
                      </>
                    )
                  ) : (
                    ''
                  )}
                </>
              }
            </>
          ) : navLink == 'practice' ? (
            <>
              {primarySteps.length > 0 && (
                <>
                  {loader ? (
                    <Loader splashImg={SplashImage} />
                  ) : (
                    <>
                      <Header
                        context={props.context}
                        sp={props.sp}
                        URL={props.URL}
                        pageType={page}
                        arrDelSec={arrDelSec}
                        userName={userName}
                        valueOfFirstLetter={valueOfFirstLetter}
                        valueOfLastLetter={valueOfLastLetter}
                        arrMasterAnnual={arrMasterAnnual}
                        ProjectID={curProject}
                        getCurrProjectData={getCurrProjectData}
                      />
                      <Questions
                        context={props.context}
                        sp={props.sp}
                        URL={props.URL}
                        pageType={page}
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
                        pageType={page}
                      />
                      <FooterCategories
                        allPhasesSteps={allPhasesSteps}
                        context={props.context}
                        sp={props.sp}
                        URL={props.URL}
                        footerNavigation={footerNavigation}
                        pageType={page}
                        Category={arrCategory}
                        catConfig={arrCatConfig}
                        dPID={dPID}
                        pathwayTOD={pathwayTOD}
                        getNavFooter={getNavFooter}
                      />
                    </>
                  )}
                </>
              )}
            </>
          ) : navLink == 'patheay' ? (
            <Patheay
              userName={userName}
              firstName={valueOfFirstLetter}
              lastName={valueOfLastLetter}
              getTODType={getTODType}
            />
          ) : // <></>
          navLink == 'helpguid' ? (
            <HelpGuide />
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

export default App
