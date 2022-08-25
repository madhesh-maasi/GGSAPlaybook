import * as React from "react";
import styles from "./Footerimg.module.scss";

let footerList = [];

const Footerimg = (props) => {
  footerList = props.arrFooter;

  return (
    <>
      {footerList.length > 0 && props.pageType.toLowerCase() == "phases" ? (
        <>
          <div className={styles.phaseFooterImgWrapper}>
            <div
              className={styles.footerImg}
              style={{
                backgroundImage: `url(https://ggsaus.sharepoint.com${
                  JSON.parse(
                    footerList.filter((row) => row.isActive)[0].FooterImage
                  ).serverRelativeUrl
                })`,
              }}
            >
              <div className={styles.overlayer}></div>
            </div>
            <div className={styles.footerContent}>
              <div className={styles.routineOperationList}>
                <h2 className={styles.phaseRoutineTitle}>
                  Design
                </h2>
                {footerList.map((row) => {
                  return (
                    <>
                      <div
                        className={
                          row.isActive == true
                            ? styles.phaseListActive
                            : styles.phaseList
                        }
                      >
                        {row.Category == "design" && (
                          <li>{row.Title}</li>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className={styles.routineInnovationList}>
                <h2 className={styles.phaseRoutineTitle}>
                  Build
                </h2>
                {footerList.map((row) => {
                  return (
                    <>
                      <div
                        className={
                          row.isActive == true
                            ? styles.phaseListActive
                            : styles.phaseList
                        }
                      >
                        {row.Category == "build" && (
                          <li>{row.Title}</li>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className={styles.routineInnovationList}>
                <h2 className={styles.phaseRoutineTitle}>
                  Implement
                </h2>
                {footerList.map((row) => {
                  return (
                    <>
                      <div
                        className={
                          row.isActive == true
                            ? styles.phaseListActive
                            : styles.phaseList
                        }
                      >
                        {row.Category == "implement" && (
                          <li>{row.Title}</li>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className={styles.routineInnovationList}>
                <h2 className={styles.phaseRoutineTitle}>
                  Operate
                </h2>
                {footerList.map((row) => {
                  return (
                    <>
                      <div
                        className={
                          row.isActive == true
                            ? styles.phaseListActive
                            : styles.phaseList
                        }
                      >
                        {row.Category == "operate" && (
                          <li>{row.Title}</li>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              props.pageType.toLowerCase() == "phases"
                ? styles.phaseFooterImgWrapper
                : styles.footerImgWrapper
            }
          >
            <div
              className={styles.footerImg}
              style={{
                backgroundImage: `url(https://ggsaus.sharepoint.com${
                  JSON.parse(
                    footerList.filter((row) => row.isActive)[0].FooterImage
                  ).serverRelativeUrl
                })`,
              }}
            >
              <div className={styles.overlayer}></div>
            </div>
            <div className={styles.footerContent}>
              <div className={styles.routineOperationList}>
                <h2
                  className={
                    props.pageType.toLowerCase() == "phases"
                      ? styles.phaseRoutineTitle
                      : styles.routineTitle
                  }
                >
                  Routine Operations Practices
                </h2>
                {footerList.map((row) => {
                  return (
                    <>
                      <div
                        className={
                          props.pageType.toLowerCase() == "phases"
                            ? row.isActive == true
                              ? styles.phaseListActive
                              : styles.phaseList
                            : row.isActive == true
                            ? styles.listActive
                            : styles.list
                        }
                      >
                        {row.Category == "routine operations practice" && (
                          <li>{row.Title}</li>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className={styles.routineInnovationList}>
                <h2
                  className={
                    props.pageType.toLowerCase() == "phases"
                      ? styles.phaseRoutineTitle
                      : styles.routineTitle
                  }
                >
                  Routine Innovation Practices
                </h2>
                {footerList.map((row) => {
                  return (
                    <>
                      <div
                        className={
                          props.pageType.toLowerCase() == "phases"
                            ? row.isActive == true
                              ? styles.phaseListActive
                              : styles.phaseList
                            : row.isActive == true
                            ? styles.listActive
                            : styles.list
                        }
                      >
                        {row.Category == "rotine innovation practice" && (
                          <li>{row.Title}</li>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Footerimg;
