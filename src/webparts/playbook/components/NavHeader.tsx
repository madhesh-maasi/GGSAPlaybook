import * as React from 'react'
import styles from './NavHeader.module.scss'
import { Panel } from '@fluentui/react/lib/Panel'
import { useBoolean } from '@fluentui/react-hooks'
import { useState, useEffect } from 'react'
import { Icon } from '@fluentui/react'
import { PanelBase } from 'office-ui-fabric-react'

const menu = require('./../../../ExternalRef/img/menu.png')
const headerLogo = require('./../../../ExternalRef/img/GGSATopLogoNew.png')

const NavHeader = (props) => {
  const [isPanel, setIsPanel] = useState(false)

  const getPanelWork = (bool) => {
    setIsPanel(bool)
  }

  useEffect(() => {
    getPanelWork(false)
  }, [])

  return (
    <div>
      <div className={styles.headerSection}>
        <div className={styles.headerLogo}>
          <img src={`${headerLogo}`} alt="logo" width={300} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            className={styles.navMenu}
            src={`${menu}`}
            alt="menu"
            onClick={() => {
              getPanelWork(true)
            }}
          />
        </div>
      </div>
      <div>
        {isPanel == true && (
          <Panel
            isLightDismiss
            isOpen={isPanel}
            closeButtonAriaLabel="Close"
            headerText="Menu"
            onClick={() => {
              getPanelWork(false)
            }}
          >
            <div className={styles.navWrapper}>
              <div
                className={
                  props.navLink == 'phases' ? styles.linkActive : styles.navbtn
                }
                onClick={() => {
                  props.dPID != undefined
                    ? props.getNavigationLink('phases', props.pathwayTOD)
                    : props.getNavHeader('phases', '')
                }}
              >
                Phases
              </div>
              <div
                className={
                  props.navLink == 'practice'
                    ? styles.linkActive
                    : styles.navbtn
                }
                onClick={() => {
                  props.getNavHeader('practice', '')
                }}
              >
                Practices
              </div>
              <div
                className={
                  props.navLink == 'patheay' ? styles.linkActive : styles.navbtn
                }
                onClick={() => {
                  props.getNavHeader('patheay', '')
                }}
              >
                Pathway
              </div>
              <div
                className={
                  props.navLink == 'helpguid'
                    ? styles.linkActive
                    : styles.navbtn
                }
                onClick={() => {
                  props.getNavHeader('helpguid', '')
                }}
              >
                Help guide
              </div>
            </div>
          </Panel>
        )}
      </div>
    </div>
  )
}

export default NavHeader
