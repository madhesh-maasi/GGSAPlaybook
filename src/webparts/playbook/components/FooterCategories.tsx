import * as React from "react";
import styles from "./FooterCategories.module.scss";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";

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
            <a
              style={{
                cursor: "pointer",
                margin: "10px 5px",
                padding: "0px 10px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "auto",
                  marginRight: "1rem",
                }}
                onClick={() => {
                  let reDirectTo =
                    props.pageType == "phases" ? "practice" : "phases";
                  props.footerNavigation(reDirectTo, cat);
                }}
              >
                {" "}
                <Icon
                  iconName={`${
                    catConfig.filter((row) => row.Title == cat)[0].Icon
                  }`}
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginRight: "0.5rem",
                  }}
                />{" "}
                {cat}
              </p>
            </a>
          ))}
        </>
      </div>
    </div>
  );
};

export default FooterCategories;
