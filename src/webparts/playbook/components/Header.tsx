import * as React from 'react'
import styles from './Header.module.scss'
import { useState, useEffect } from 'react'
import {
  Icon,
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from '@fluentui/react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const closeIcon = require('../../../ExternalRef/img/close-button.png')

let headingDetails = {
  Title: '',
  About: '',
  isShow: false,
}

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 260 },
}

let currentProject
let managerFirstName
let managerLastName
let developerFirstName
let developerLastName
let manaFirValue
let manaLasValue
let deveFirValue
let deveLasValue
let manaFirValSplit
let manaLasValSplit
let deveFirValSplit
let deveLasValSplit
let manaFirLetter
let manaLasLetter
let deveFirLetter
let deveLasLetter
let curManagerName
let curDeveloperName
let arrDeveloperName
let arrMaster = []
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

const Header = (props: any) => {
  /* All States */
  const [modHeading, setModHeading] = useState(headingDetails)
  const [masterDrop, setMasterDrop] = useState([])
  const [selectedKey, setSelectedKey] = useState<string | number>()
  const [managerTitle, setManagerTitle] = useState()
  const [manaFirLasLetter, setManaFirLasLetter] = useState()
  const [developerTitle, setDeveloperTitle] = useState()
  const [deveFirLasLetter, setDeveFirLasLetter] = useState()
  const [arrDeveName, setArrDeveName] = useState([])
  const [DeveCount, setDeveCount] = useState<string | number>()
  const [defaultSelectedValue, setDefaultSelectedValue] = useState({
    key: 0,
    text: '',
    Value: null,
  })

  /* function of get header details */
  const getHeaderDetail = () => {
    let curProId = props.ProjectID
    currentProject =
      props.arrMasterAnnual &&
      props.arrMasterAnnual.filter((obj) => obj.ID == curProId)[0]
    setModHeading({
      Title: '',
      About: '',
      isShow: false,
    })
    headingDetails = props.arrDelSec
      ? {
          Title: props.arrDelSec.Title,
          About: props.arrDelSec.About,
          isShow: false,
        }
      : headingDetails
    arrMaster =
      props.arrMasterAnnual &&
      props.arrMasterAnnual.map((dropVal) => {
        return { key: dropVal.ID, text: dropVal.Project, Value: dropVal.TOD }
      })
    arrMaster &&
      setDefaultSelectedValue(arrMaster.filter((row) => row.key == curProId)[0])
    props.arrMasterAnnual && getProManagerDetail()
    setMasterDrop(arrMaster ? arrMaster : [])
    setSelectedKey(curProId)
    console.log(headingDetails)
    setModHeading(headingDetails)
  }

  /* get change the project */
  const getChangeProject = (ID) => {
    currentProject =
      props.arrMasterAnnual &&
      props.arrMasterAnnual.filter((obj) => obj.ID == ID)[0]
    let Type = currentProject.TOD
    props.getCurrProjectData(ID, Type)
    props.arrMasterAnnual && getProManagerDetail()
    setSelectedKey(ID)
  }

  /* get project manager details */
  const getProManagerDetail = () => {
    curManagerName = ''
    curManagerName = !currentProject.Manager.Title
      ? ''
      : currentProject.Manager.Title
    let curManagetLoginName = ''
    curManagetLoginName = !currentProject.Manager.Name
      ? ''
      : currentProject.Manager.Name
    !curManagetLoginName
      ? (getProDeveloperDetail(), setManagerTitle(curManagerName))
      : props.sp.profiles
          .getPropertiesFor(curManagetLoginName)
          .then((event) => {
            managerFirstName = event.UserProfileProperties.filter(
              (val) => val.Key == 'FirstName',
            )
            managerLastName = event.UserProfileProperties.filter(
              (val) => val.Key == 'LastName',
            )
            manaFirValue = managerFirstName
              .map((firstVal) => {
                return firstVal.Value
              })
              .toString()
            manaLasValue = managerLastName
              .map((lastVal) => {
                return lastVal.Value
              })
              .toString()
            manaFirValSplit = manaFirValue.split('')
            manaLasValSplit = manaLasValue.split('')
            manaFirLetter = manaFirValSplit[0]
            manaLasLetter = manaLasValSplit[0]
            setManagerTitle(curManagerName)
            setManaFirLasLetter(manaFirLetter + manaLasLetter)
            getProDeveloperDetail()
          })
          .catch((err) => {
            console.log(err)
          })
  }

  /* get project developer details */
  const getProDeveloperDetail = () => {
    arrDeveloperName = []
    arrDeveloperName =
      currentProject.Developer.length > 0
        ? currentProject.Developer.map((detail) => {
            return detail.Title
          })
        : []
    curDeveloperName = arrDeveloperName[0]
    let curDeveloperLoginName = []
    curDeveloperLoginName =
      currentProject.Developer.length > 0
        ? currentProject.Developer.map((detail) => {
            return detail.Name
          })
        : []
    let curFirstDeveloper = curDeveloperLoginName[0]
    curDeveloperLoginName.length > 0
      ? props.sp.profiles
          .getPropertiesFor(curFirstDeveloper)
          .then((event) => {
            developerFirstName = event.UserProfileProperties.filter(
              (val) => val.Key == 'FirstName',
            )
            developerLastName = event.UserProfileProperties.filter(
              (val) => val.Key == 'LastName',
            )
            deveFirValue = developerFirstName
              .map((firstVal) => {
                return firstVal.Value
              })
              .toString()
            deveLasValue = developerLastName
              .map((lastVal) => {
                return lastVal.Value
              })
              .toString()
            deveFirValSplit = deveFirValue.split('')
            deveLasValSplit = deveLasValue.split('')
            deveFirLetter = deveFirValSplit[0]
            deveLasLetter = deveLasValSplit[0]
            let Counting =
              curDeveloperLoginName.length > 1
                ? curDeveloperLoginName.length - 1
                : 0
            setDeveCount(Counting)
            setArrDeveName(arrDeveloperName)
            setDeveloperTitle(curDeveloperName)
            setDeveFirLasLetter(deveFirLetter + deveLasLetter)
          })
          .catch((err) => {
            console.log(err)
          })
      : setArrDeveName(arrDeveloperName)
  }

  /* Life cycle of Onload */
  useEffect(() => {
    getHeaderDetail()
  }, [props.arrDelSec])

  //console.log(modHeading.About)

  return (
    <div style={{ padding: '16px', paddingBottom: '0' }}>
      <div className={styles.valueofHead}>
        <div className={styles.titleWrapper}>
          {props.isPhaseAvail || props.pageType != 'phases' ? (
            <span
              className={
                props.pageType == 'phases' ? styles.phaseTitle : styles.title
              }
            >
              {modHeading.Title}{' '}
              <Icon
                iconName="InfoSolid"
                style={{ cursor: 'pointer' }}
                className={
                  props.pageType == 'phases'
                    ? styles.phaseInfoIcon
                    : styles.infoIcon
                }
                onClick={() => {
                  modHeading.isShow = true
                  setModHeading({ ...modHeading })
                }}
              />
              {modHeading.isShow == true && (
                <div className={styles.parentModalBox}>
                  <div className={styles.modalBox}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        className={
                          props.pageType == 'phases'
                            ? styles.phaseModalSet
                            : styles.modalSet
                        }
                        style={{ display: 'flex' }}
                      >
                        <Icon
                          iconName="Settings"
                          style={{
                            color: 'white',
                          }}
                        />
                        {'      '}
                        <div style={{ transform: 'translateY(5px)' }}>
                          About
                        </div>
                      </div>
                      <img
                        style={{
                          cursor: 'pointer',
                        }}
                        src={`${closeIcon}`}
                        // height={15}
                        // width={"20px"}
                        onClick={() => {
                          modHeading.isShow = false
                          setModHeading({ ...modHeading })
                        }}
                      />
                    </div>
                    <p
                      dangerouslySetInnerHTML={{ __html: modHeading.About }}
                    ></p>
                    {/* <p>{modHeading.About}</p> */}

                    {/* <p>
                      <div>{modHeading.About}</div>
                    </p> */}
                  </div>
                </div>
              )}
            </span>
          ) : (
            ''
          )}
        </div>
        {props.pageType == 'phases' && props.arrMasterAnnual && (
          <div style={{ transform: 'translate(100px, 80px)' }}>
            <Autocomplete
              id="combo-box-demo"
              options={masterDrop}
              defaultValue={defaultSelectedValue.text}
              getOptionLabel={(option) =>
                option.text || defaultSelectedValue.text
              }
              style={{ width: 300, marginRight: 20 }}
              onChange={(e, value) => {
                value && getChangeProject(value.key),
                  setDefaultSelectedValue({ ...value })
              }}
              value={defaultSelectedValue.text}
              renderInput={(params) => (
                <TextField {...params} label="" variant="outlined" />
              )}
            />
            {/* <Dropdown
              options={masterDrop}
              styles={dropdownStyles}
              defaultSelectedKey={selectedKey}
              onChange={(key, text) => {
                console.log(text);
                let selKey: string | number = text.key;
                getChangeProject(selKey);
              }}
            /> */}
          </div>
        )}
        <div className={styles.profiles}>
          {/* <button className={styles.addProjectBtn}>Add Project</button> */}
          {props.arrMasterAnnual && (
            <div title={managerTitle} className={styles.dev}>
              {manaFirLasLetter}
            </div>
          )}
          {DeveCount > 0 && props.arrMasterAnnual ? (
            <>
              <div title={developerTitle} className={styles.manager}>
                {deveFirLasLetter}
              </div>
              <div className={styles.managerCount}>+{DeveCount}</div>
            </>
          ) : arrDeveName.length > 0 ? (
            <>
              <div title={developerTitle} className={styles.manager}>
                {deveFirLasLetter}
              </div>
            </>
          ) : (
            ''
          )}
          <div title={props.userName} className={styles.user}>
            {props.valueOfFirstLetter}
            {props.valueOfLastLetter}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
