import * as React from 'react'
import styles from "./Footerimg.module.scss";
const footerImg = require("../../../ExternalRef/img/laptop.jpg");

const Footerimg = (props) => {
  return (
    <div className={styles.footerImgWrapper}>
      <div className={styles.footerImg}>
        <img src={`${footerImg}`} alt="Footer Image" />
        <div className={styles.overlayer}></div>
      </div>
      <div className={styles.footerContent}>
        <div className={styles.routineOperationList}>
          <h2 className={styles.routineTitle}>Routine Operations Practices</h2>
          <div className={styles.list}>
            <li>Manage Production</li>
            <li>Work in weekly cycle</li>
            <li>Plan in manager</li>
            <li>Hold regular stand-ups</li>
            <li>Reflect on practice</li>
            <li>Develop capacity</li>
          </div>
        </div>
        <div className={styles.routineInnovationList}>
          <h2 className={styles.routineTitle}>Routine Innovation Practices</h2>
          <div className={styles.list}>
            <li>Innovate with the Client</li>
            <li>Develop with Voices of Design</li>
            <li>Co-design with Voicesof Experience</li>
            <li>Promote work across the oraganisation</li>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footerimg
