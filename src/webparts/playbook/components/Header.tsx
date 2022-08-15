import * as React from "react";
import styles from "./Header.module.scss";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";

const closeIcon = require("../../../ExternalRef/img/close-button.png");

let firstName;
let firstValue;
let lastName;
let lastValue;
let firstValSplit;
let lastValSplit;
let valueOfFirstLetter;
let valueOfLastLetter;

let headingDetails = {
  Title: "",
  About: "",
  isShow: false,
};

const Header = (props) => {
  const [userName, setUserName] = useState("");
  const [modHeading, setModHeading] = useState(headingDetails);

  // Life cycle of Onload
  useEffect(() => {
    // current user taken
    props.URL
      .currentUser()
      .then(async (res) => {
        await props.sp.profiles
          .getPropertiesFor(res.LoginName)
          .then((event) => {
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
            headingDetails = {
              Title: props.arrDelSec.Title,
              About: props.arrDelSec.About,
              isShow: false,
            };
            setModHeading({
              Title: "",
              About: "",
              isShow: false,
            });
            setModHeading(headingDetails);
          })
          .catch((err) => {
            console.log(err);
          });
        setUserName(res.Title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <div className={styles.valueofHead}>
        <div className={styles.titleWrapper}>
          <span className={props.pageType == "phases" ? styles.phaseTitle : styles.title}>
            {modHeading.Title}{" "}
            <Icon
              iconName="InfoSolid"
              style={{ cursor: "pointer" }}
              className={props.pageType == "phases" ? styles.phaseInfoIcon : styles.infoIcon}
              onClick={() => {
                modHeading.isShow = true;
                setModHeading({ ...modHeading });
              }}
            />
            {modHeading.isShow == true && (
              <div
                className={styles.parentModalBox}
              >
                <div
                  className={styles.modalBox}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      className={props.pageType == "phases" ? styles.phaseModalSet : styles.modalSet}
                      style={{ display: "flex" }}
                    >
                      <Icon
                        iconName="Settings"
                        style={{
                          color: "white"
                        }}
                      />{"      "}
                      <div>About</div>
                    </div>
                    <img
                      style={{ cursor: "pointer" }}
                      src={`${closeIcon}`}
                      height={15}
                      width={15}
                      onClick={() => {
                        modHeading.isShow = false;
                        setModHeading({ ...modHeading });
                      }}
                    />
                  </div>
                  <p>{modHeading.About}</p>
                </div>
              </div>
            )}
          </span>
        </div>
        <div className={styles.profiles}>
          <div className={styles.dev}>BA</div>
          <div className={styles.manager}>CP</div>
          <div title={userName} className={styles.user}>
            {valueOfFirstLetter}
            {valueOfLastLetter}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
