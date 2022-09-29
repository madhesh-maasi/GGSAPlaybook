import * as React from 'react'
import styles from './Loader.module.scss'

const Loader = (props) => {
  return (
    <>
      {/* <div className={styles.Overlay}>
                <div className={styles.wrapper}>
                    <div className={styles.opposites}>
                        <div className={`${styles.opposites} ${styles.bl}`}></div>
                        <div className={`${styles.opposites} ${styles.tr}`}></div>
                        <div className={`${styles.opposites} ${styles.br}`}></div>
                        <div className={`${styles.opposites} ${styles.tl}`}></div>
                    </div>
                </div>
            </div> */}
      <div>
        <div className={styles.Overlay}>
          <img
            //className={styles.splashLogo}
            src={`${props.splashImg}`}
            style={{ width: 500, height: 500 }}
          />
        </div>
        <div>
          <div className={styles.wrapper}>
            <div className={styles.opposites}>
              <div className={`${styles.opposites} ${styles.bl}`}></div>
              <div className={`${styles.opposites} ${styles.tr}`}></div>
              <div className={`${styles.opposites} ${styles.br}`}></div>
              <div className={`${styles.opposites} ${styles.tl}`}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loader
