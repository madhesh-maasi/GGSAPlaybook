import * as React from "react";
import styles from "./FooterCategories.module.scss";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";
// const designImg = require("../../../ExternalRef/img/DesignImg.png");
// const buildImg = require("../../../ExternalRef/img/buildImg.png");
// const implementImg = require("../../../ExternalRef/img/implementImg.png");
// const operateImg = require("../../../ExternalRef/img/operateImg.png");
// let arrCatConfig = [];
const FooterCategories = (props) => {
  const [category, setCategory] = useState(props.Category);
  const [catConfig, setCatConfig] = useState(props.catConfig);
  return (
    <div className={styles.footerWrapper}>
      <div
        className={
          props.pageType.toLowerCase() == "phases"
            ? styles.phaseFooterContent
            : styles.footerContent
        }
      >
        <h3>
          {" "}
          {props.pageType.toLowerCase() == "phases"
            ? `Pracitice :`
            : `Phases :`}
        </h3>
        <>
          {category.map((cat) => (
            <a>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "1rem",
                }}
                onClick={() => {
                  let currUrl = window.location.href;
                  console.log(currUrl);

                  let reDirectTo =
                    props.pageType.toLowerCase() == "phases"
                      ? "practice"
                      : "phases";
                  console.log(reDirectTo);
                  window.location.href = `${
                    currUrl.split("?")[0]
                  }?type=${reDirectTo}`;
                }}
              >
                {" "}
                <Icon
                  iconName={`${
                    catConfig.filter((row) => row.Title == cat)[0].Icon
                  }`}
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "0.5rem",
                  }}
                />{" "}
                {cat}
              </p>
            </a>
          ))}
        </>
        {/* <a href="#" className={styles.footerItem}>
          <img src={`${designImg}`} alt="" />
          <p>Design</p>
        </a>
        <a href="#" className={styles.footerItem}>
          <img src={`${buildImg}`} alt="" />
          <p>Build</p>
        </a>
        <a href="#" className={styles.footerItem}>
          <img src={`${implementImg}`} alt="" />
          <p>Implement</p>
        </a>
        <a href="#" className={styles.footerItem}>
          <img src={`${operateImg}`} alt="" />
          <p>operate</p>
        </a> */}
      </div>
    </div>
  );
};

export default FooterCategories;
