import * as React from 'react'
import styles from "./Footerimg.module.scss";
import { useState, useEffect } from "react";

const footerImg = require("../../../ExternalRef/img/laptop.jpg");

let footerList = [];

const Footerimg = (props) => {
  footerList = props.arrFooter;

  return (
    <>
      {
        footerList.length > 0
        &&
        <>
          <div className={styles.footerImgWrapper}>
            <div
              className={styles.footerImg}
              style={{
                backgroundImage: `url(https://ggsaus.sharepoint.com${JSON.parse(footerList.filter(row => row.isActive)[0].FooterImage).serverRelativeUrl})`
              }}
            >
              <div className={styles.overlayer}></div>
            </div>
            <div className={styles.footerContent}>
              <div className={styles.routineOperationList}>
                <h2 className={styles.routineTitle}>Routine Operations Practices</h2>
                {footerList.map((row) => {
                  return <>
                    <div className={row.isActive == true ? styles.listActive : styles.list}>
                      {row.Category == "routine operations practice"
                        && <li>{row.Title}</li>}
                    </div>
                  </>
                })}
              </div>
              <div className={styles.routineInnovationList}>
                <h2 className={styles.routineTitle}>Routine Innovation Practices</h2>
                {footerList.map((row) => {
                  return <>
                    <div className={row.isActive == true ? styles.listActive : styles.list}>
                      {row.Category == "rotine innovation practice"
                        && <li>{row.Title}</li>}
                    </div>
                  </>
                })}
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Footerimg
