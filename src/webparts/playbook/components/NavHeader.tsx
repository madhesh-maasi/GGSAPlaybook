import * as React from "react";
// import styles from "./NavHeader.module.scss";
import styles from "./NavHeader.module.scss";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";
const headerLogo = require("./../../../ExternalRef/img/GGSATopLogo.png");
const menu = require("./../../../ExternalRef/img/menu.png");
import { Panel } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";

const NavHeader = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  return (
    <div>
      <div className={styles.headerSection}>
        <img src={`${headerLogo}`} alt="logo" />
        <img
          className={styles.navMenu}
          src={`${menu}`}
          alt="menu"
          onClick={openPanel}
        />
      </div>
      <div>
        <Panel
          isLightDismiss
          isOpen={isOpen}
          onDismiss={dismissPanel}
          closeButtonAriaLabel="Close"
          headerText="Menu"
        >
          <div className={styles.navWrapper}>
            <div className={styles.linkActive}>Phases</div>
            <div className={styles.navbtn}>Practice</div>
            <div className={styles.navbtn}>Pathway</div>
            <div className={styles.navbtn}>HelpGuid</div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default NavHeader;
