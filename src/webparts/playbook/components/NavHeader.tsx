import * as React from "react";
// import styles from "./NavHeader.module.scss";
import styles from "./NavHeader.module.scss";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";
const headerLogo = require("./../../../ExternalRef/img/GGSATopLogo.png");
const menu = require("./../../../ExternalRef/img/menu.png");
const NavHeader = () => {
  return (
    <div className={styles.headerSection}>
      <img src={`${headerLogo}`} alt="logo" />
      <img className={styles.navMenu} src={`${menu}`} alt="menu" />
    </div>
  );
};

export default NavHeader;
