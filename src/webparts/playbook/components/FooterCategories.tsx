import * as React from 'react'
import styles from "./FooterCategories.module.scss";

const designImg = require("../../../ExternalRef/img/DesignImg.png");
const buildImg = require("../../../ExternalRef/img/buildImg.png");
const implementImg = require("../../../ExternalRef/img/implementImg.png");
const operateImg = require("../../../ExternalRef/img/operateImg.png");

const FooterCategories = (props) => {
  return (
    <div className={styles.footerWrapper}>
      <div className={props.pageType.toLowerCase() == "phases" ? styles.phaseFooterContent : styles.footerContent}>
        <h3>Phases : </h3>
        <a href="#" className={styles.footerItem}>
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
        </a>
      </div>
    </div>
  )
}

export default FooterCategories
