import * as React from "react";
import styles from "./Patheay.module.scss";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const cardImage1 = require("../../../ExternalRef/img/analytics.jpg");
const cardImage2 = require("../../../ExternalRef/img/computing.jpg");
const cardImage3 = require("../../../ExternalRef/img/groupConference.jpg");
const cardImage4 = require("../../../ExternalRef/img/usingSystem.jpg");

const Pathway = (props) => {
  console.log(props);

  return (
    <div className={`${styles.PathwayWrapper} container`}>
      <div className={styles.Pathwayheader}>
        <h1 className={styles.title}>
          Select the pathway for your deliverable
        </h1>
        <div className={styles.profile}>
          <p style={{ fontSize: 18, fontWeight: "bold" }}>{props.userName}</p>
          <div className={styles.avatar}>
            {props.firstName}
            {props.lastName}
          </div>
        </div>
      </div>
      <div className={styles.infoText}>
        There are 8 discrete pathways to deliver a Product and 4 to deliver a
        Solution.  Your Deliverable defines which pathway to take. Read the
        examples to identify your deliverable and select your pathway.
      </div>
      <div className={styles.pathwayContent}>
        <div className={styles.pathwayCard}>
          <div className={styles.img}>
            <img src={`${cardImage1}`} alt="" />
          </div>
          <div className={styles.accordion}>
            {/* <AccordionItem value={["salam"]}>
              <AccordionHeader>Accordion Header 1</AccordionHeader>
              <AccordionPanel>
                <div>
                  <button>Button 1</button>
                </div>
                <div>
                  <button>Button 1</button>
                </div>
                <div>Accordion Panel 1</div>
                <div>Accordion Panel 1</div>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem> */}
            {/* <fluentAccordionItem>
              <span slot="heading">Woodleigh Link</span>
              <Pivot
                aria-label="Large Link Size Pivot Example"
                linkSize="normal"
                styles={{ root: { display: "flex", justifyContent: "center" } }}
              >
                <h1>vanakkam da mapla !</h1>
              </Pivot>
            </fluentAccordionItem> */}
            <div
              className={`accordion accordion-flush w-100`}
              id="accordionFlushExample"
            >
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className={`${styles.accordianHeader} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>Product</span>
                    </div>{" "}
                    <span className={styles.months}>6-12 months</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Oz-e-science F–6, Music For Learning F–6, Mastery Teaching
                      Pathway, 8 Cycles of School Practice, School Improvement
                      Framework, Teaching and Learning Platform, Playschool
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className={`${styles.accordianHeader} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>
                        Product initiative
                      </span>
                    </div>{" "}
                    <span className={styles.months}>3–6 months</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Discovery Trail, CYAAA Cape York Expansion, National
                      School Improvement
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className={`${styles.accordianHeader} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>
                        Organisation Solution
                      </span>
                    </div>{" "}
                    <span className={styles.months}>1–6 months</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Setting up new office, Building Infrastructure, Investment
                      Campaign
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pathwayCard}>
          <div className={styles.img}>
            <img src={`${cardImage2}`} alt="" />
          </div>
          <div className={styles.accordion}>
            <div
              className={`accordion accordion-flush w-100`}
              id="accordionFlushExample2"
            >
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingFour">
                  <button
                    className={`${styles.accordianHeaderBlue} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>Product</span>
                    </div>{" "}
                    <span className={styles.months}>2-3 months</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample2"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Oz-e-science F–3 Biology, Oz-e-English Writing F–6,
                      Mastery Teaching Pathway Platform, Spelling Mastery
                      professional learning module, Flight Path, Coaching Model,
                      Leading Mate
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingFive">
                  <button
                    className={`${styles.accordianHeaderBlue} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>
                        Product tool
                      </span>
                    </div>{" "}
                    <span className={styles.months}>1–3 months</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample2"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Discovery Trail, CYAAA Cape York Expansion, National
                      School Improvement
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingSix">
                  <button
                    className={`${styles.accordianHeaderBlue} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseSix"
                    aria-expanded="false"
                    aria-controls="flush-collapseSix"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>
                        Project Solution
                      </span>
                    </div>{" "}
                    <span className={styles.months}>1–3 months</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample2"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Setting up new office, Building Infrastructure, Investment
                      Campaign
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pathwayCard}>
          <div className={styles.img}>
            <img src={`${cardImage3}`} alt="" />
          </div>
          <div className={styles.accordion}>
            <div
              className={`accordion accordion-flush w-100`}
              id="accordionFlushExample3"
            >
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingSeven">
                  <button
                    className={`${styles.accordianHeaderBlue} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseSeven"
                    aria-expanded="false"
                    aria-controls="flush-collapseSeven"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>Task</span>
                    </div>{" "}
                    <span className={styles.months}>1-6 Weeks</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample3"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Oz-e-science F–6, Music For Learning F–6, Mastery Teaching
                      Pathway, 8 Cycles of School Practice, School Improvement
                      Framework, Teaching and Learning Platform, Playschool
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingEight">
                  <button
                    className={`${styles.accordianHeaderBlue} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseEight"
                    aria-expanded="false"
                    aria-controls="flush-collapseEight"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>
                        Product related
                      </span>
                    </div>{" "}
                    <span className={styles.months}>1-6 Weeks</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseEight"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample3"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Discovery Trail, CYAAA Cape York Expansion, National
                      School Improvement
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingNine">
                  <button
                    className={`${styles.accordianHeaderBlue} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseNine"
                    aria-expanded="false"
                    aria-controls="flush-collapseNine"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>
                        Task Solution
                      </span>
                    </div>{" "}
                    <span className={styles.months}>1–6 Weeks</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseNine"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample3"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Setting up new office, Building Infrastructure, Investment
                      Campaign
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pathwayCard}>
          <div className={styles.img}>
            <img src={`${cardImage4}`} alt="" />
          </div>
          <div className={styles.accordion}>
            <div
              className={`accordion accordion-flush w-100`}
              id="accordionFlushExample4"
            >
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingTen">
                  <button
                    className={`${styles.accordianHeader} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTen"
                    aria-expanded="false"
                    aria-controls="flush-collapseTen"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>Activity</span>
                    </div>{" "}
                    <span className={styles.months}>1-3 days</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseTen"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample4"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Oz-e-science F–6, Music For Learning F–6, Mastery Teaching
                      Pathway, 8 Cycles of School Practice, School Improvement
                      Framework, Teaching and Learning Platform, Playschool
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingEleven">
                  <button
                    className={`${styles.accordianHeader} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseEleven"
                    aria-expanded="false"
                    aria-controls="flush-collapseEleven"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>
                        Activity planner
                      </span>
                    </div>{" "}
                    <span className={styles.months}>1-2 Weeks</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseEleven"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample4"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Discovery Trail, CYAAA Cape York Expansion, National
                      School Improvement
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="flush-headingTwelve">
                  <button
                    className={`${styles.accordianHeader} accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwelve"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwelve"
                  >
                    <div>
                      <span className="plus">+</span>{" "}
                      <span className={styles.accordianTitle}>
                        Activity Solution
                      </span>
                    </div>{" "}
                    <span className={styles.months}>1-2 Week</span>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwelve"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample4"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <p>Examples:</p>
                    <span>
                      Setting up new office, Building Infrastructure, Investment
                      Campaign
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pathway;
