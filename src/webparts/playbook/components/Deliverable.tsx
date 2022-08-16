import * as React from "react";
import { useState, useEffect } from "react";
import style from "./Deliverable.module.scss";
import { Icon } from "@fluentui/react";

let arrDlble = [];

const Deliverable = (props) => {
  const [currDeliver, setCurrDeliver] = useState([]);

  // life cycle of onload
  useEffect(() => {
    arrDlble = props.arrDelSec.deliver;
    arrDlble = arrDlble.map((li) => ({
      Title: li.title,
      Details: li.details,
      isShow: false,
    }));
    setCurrDeliver(arrDlble);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100px",
        margin: "15px 0",
      }}
    >
      {currDeliver.length > 0
        ? currDeliver.map((item) => {
          return (
            <div>
              {item.isShow == true && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    height: "126px",
                    width: "200px",
                    backgroundColor: props.pageType.toLowerCase() == "phases" ? "#00859c" : "#f99d26",
                    padding: "15px",
                    borderRadius: "20px",
                    position: "relative",
                    cursor: "pointer",
                    marginTop: "46px",
                    boxSizing: "border-box"
                  }}
                  className={style.deliverOpenWrapper}
                  onClick={() => {
                    arrDlble.filter(
                      (fiItem) => fiItem.Title == item.Title
                    )[0].isShow = false;
                    setCurrDeliver([...arrDlble]);
                  }}
                >
                  {item.Title == "Planning" ? (
                    <>
                      <Icon
                        iconName="BarChart4"
                        style={{
                          color: "white",
                          position: "absolute",
                          top: "8%",
                          left: "46%",
                          fontSize: "20px"
                        }}
                      />
                      {item.Details.length > 0 ? (
                        item.Details.map((row) => {
                          return (
                            <div className={style.deliverOpen}>
                              <li>{row}</li>
                            </div>
                          );
                        })
                      ) : (
                        <div className={style.deliverOpen}>
                          <li>N/A</li>
                        </div>
                      )}
                    </>
                  ) : item.Title == "Development" ? (
                    <>
                      <Icon
                        iconName="ChevronUnfold10"
                        style={{
                          color: "white",
                          fontSize: "20px",
                          position: "absolute",
                          top: "8%",
                          left: "46%",
                          transform: "rotate(90deg)"
                        }}
                      />
                      {item.Details.length > 0 ? (
                        item.Details.map((row) => {
                          return (
                            <div className={style.deliverOpen}>
                              <li>{row}</li>
                            </div>
                          );
                        })
                      ) : (
                        <div className={style.deliverOpen}>
                          <li>N/A</li>
                        </div>
                      )}
                    </>
                  ) : (
                    item.Title == "Product/solution" && (
                      <>
                        <Icon
                          iconName="CubeShape"
                          style={{
                            color: "white",
                            position: "absolute",
                            top: "8%",
                            left: "46%",
                            fontSize: "20px"
                          }}
                        />
                        {item.Details.length > 0 ? (
                          item.Details.map((row) => {
                            return (
                              <div className={style.deliverOpen}>
                                <li>{row}</li>
                              </div>
                            );
                          })
                        ) : (
                          <div className={style.deliverOpen}>
                            <li>N/A</li>
                          </div>
                        )}
                      </>
                    )
                  )}
                </div>
              )}
              {item.isShow == false && (
                <div
                  onClick={() => {
                    arrDlble.forEach((li) => (li.isShow = false));
                    arrDlble.filter(
                      (fiItem) => fiItem.Title == item.Title
                    )[0].isShow = true;
                    setCurrDeliver([...arrDlble]);
                  }}
                  style={{
                    color: props.pageType.toLowerCase() == "phases" ? "#00859c" : "#f99d26",
                    padding: "5px 10px",
                    margin: "10px",
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: 100,
                  }}
                >
                  <div className={ props.pageType.toLowerCase() == "phases" ? style.phaseCardImg : style.cardImg}>
                    {item.Title == "Planning" ? (
                      <Icon
                        iconName="BarChart4"
                        style={{
                          color: "white",
                          fontSize: "20px"
                        }}
                      />
                    ) : item.Title == "Development" ? (
                      <Icon
                        iconName="ChevronUnfold10"
                        style={{
                          color: "white",
                          fontSize: "20px",
                          transform: "rotate(90deg)"
                        }}
                      />
                    ) : (
                      item.Title == "Product/solution" && (
                        <Icon
                          iconName="CubeShape"
                          style={{
                            color: "white",
                            fontSize: "20px"
                          }}
                        />
                      )
                    )}
                  </div>
                  {item.Title}
                </div>
              )}
            </div>
          );
        })
        : ""}
    </div>
  );
};

export default Deliverable;
