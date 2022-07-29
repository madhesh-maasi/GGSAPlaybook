import * as React from "react";
import { useState, useEffect } from "react";
import style from "./Deliverable.module.scss";

const planningImg = require("../../../ExternalRef/img/grapgBars.png");
const devImg = require("../../../ExternalRef/img/codeTags.png");
const productImg = require("../../../ExternalRef/img/productBox.png");

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
        // width: "435px",
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
                      height: "100px",
                      width: "200px",
                      backgroundColor: "#f99d26",
                      padding: "15px",
                      borderRadius: "20px",
                      position: "relative",
                      cursor: "pointer",
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
                        <img
                          src={`${planningImg}`}
                          alt="planning"
                          width="15px"
                          style={{
                            position: "absolute",
                            top: "8%",
                            left: "50%",
                            transform: "translateX(-50%)",
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
                        <img
                          src={`${devImg}`}
                          alt="planning"
                          width="15px"
                          style={{
                            position: "absolute",
                            top: "8%",
                            left: "50%",
                            transform: "translateX(-50%)",
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
                          <img
                            src={`${productImg}`}
                            alt="planning"
                            width="15px"
                            style={{
                              position: "absolute",
                              top: "8%",
                              left: "50%",
                              transform: "translateX(-50%)",
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
                      color: "#f99d26",
                      padding: "5px 10px",
                      margin: "10px",
                      cursor: "pointer",
                      // width: "120px",
                      textAlign: "center",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: 100,
                    }}
                  >
                    <div className={style.cardImg}>
                      {item.Title == "Planning" ? (
                        <img
                          src={`${planningImg}`}
                          alt="planning"
                          width="30px"
                        />
                      ) : item.Title == "Development" ? (
                        <img src={`${devImg}`} alt="planning" width="30px" />
                      ) : (
                        item.Title == "Product/solution" && (
                          <img
                            src={`${productImg}`}
                            alt="planning"
                            width="30px"
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
