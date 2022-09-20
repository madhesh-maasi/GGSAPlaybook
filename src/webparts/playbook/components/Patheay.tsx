import * as React from "react";
import styles from "./Patheay.module.scss";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Icon } from "@fluentui/react";

const cardImage1 = require("../../../ExternalRef/img/analytics.jpg");
const cardImage2 = require("../../../ExternalRef/img/computing.jpg");
const cardImage3 = require("../../../ExternalRef/img/groupConference.jpg");
const cardImage4 = require("../../../ExternalRef/img/usingSystem.jpg");

const annualPlanURL = "https://ggsaus.sharepoint.com/sites/Intranet_dev/SitePages/InnovationHub.aspx?Page=AP";

const Pathway = (props) => {
  /* add the new type of delivery */
  const addNewTOD = (type) => {
    type != "" && window.open(annualPlanURL+"&TOD="+type);
  }

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
        There are 8 discrete pathways to deliver a <b>Product</b> and 4 to
        deliver a<b> Solution.</b>   Your <b> Deliverable</b> defines which
        pathway to take. Read the examples to identify your deliverable and
        select your pathway.
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
                      <span className={styles.accordianTitle}>Product:</span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("PT");
                        }}
                      />
                      <span className={styles.months}>6-12 months</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("PT")}>open</button>
                    </div>
                    <span>
                      Oz-e-science F–6… Music For Learning F–6… Mastery Teaching
                      Pathway Courses… 8 Cycles of School Practice… School
                      Improvement Framework… PlayschoolFlight Path… Coaching
                      Model…
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
                        New initiative:
                      </span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("NI");
                        }}
                      />
                      <span className={styles.months}>3–6 months</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("NI")}>open</button>
                    </div>
                    <span>
                      Discovery Trail… CYAAA Cape York Expansion… National
                      School Improvement…Funding proposal for major initiative…
                      Investment Campaign
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
                        Organisation solution:
                      </span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("OS");
                        }}
                      />
                      <span className={styles.months}>1–6 months</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("OS")}>open</button>
                    </div>
                    <span>Setting up new office… Building Infrastructure</span>
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
                      <span className={styles.accordianTitle}>Project:</span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("PR");
                        }}
                      />
                      <span className={styles.months}>2-3 months</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample2"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("PR")}>open</button>
                    </div>
                    <span>
                      Oz-e-science F–3 Biology… Oz-e-English Writing F–6…
                      Spelling Mastery professional learning module…Effective
                      teaching module…Signals Practice Lesson
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
                      <span className={styles.accordianTitle}>Technology:</span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("TEC");
                        }}
                      />
                      <span className={styles.months}>1–3 months</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample2"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("TEC")}>open</button>
                    </div>
                    <span>
                      Teaching and Learning Platform… MTP Learning
                      portal…Leading Mate…8 cycles of school practice web
                      application… Effective teaching web application
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
                        System solution:
                      </span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("SS");
                        }}
                      />
                      <span className={styles.months}>1–3 months</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample2"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("SS")}>open</button>
                    </div>
                    <span>
                      Contracts Register… Digital Database… HR Database…
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
                      <span className={styles.accordianTitle}>Task:</span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("T");
                        }}
                      />
                      <span className={styles.months}>1-6 Weeks</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample3"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("T")}>open</button>
                    </div>
                    <span>
                      Maths of Science research… Playschool Professional
                      Learning Framework… Oz-e-English Unit 1 Year 5 Poster Set…
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
                      <span className={styles.accordianTitle}>Strategy:</span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("S");
                        }}
                      />
                      <span className={styles.months}>1-6 Weeks</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseEight"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample3"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("S")}>open</button>
                    </div>
                    <span>
                      Investors Policy Paper… Annual Marketing
                      Strategy…Marketing Campaign
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
                        Task Solution:
                      </span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("TS");
                        }}
                      />
                      <span className={styles.months}>1-6 Weeks</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseNine"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample3"
                >
                  <div className={`${styles.contentBlue} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("TS")}>open</button>
                    </div>
                    <span>HR strategy or policies…Board meeting…</span>
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
                      <span className={styles.accordianTitle}>Activity:</span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("A");
                        }}
                      />
                      <span className={styles.months}>1-3 days</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseTen"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample4"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("A")}>open</button>
                    </div>
                    <span>
                      Planning document: Delivery Plan… Commencement Brief… ABCD
                      on a Page… User Stories…Science Exhibition Flyer to
                      Parents… Observation Form… Research Brief… Requirements
                      Brief…School Review Report…
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
                        Activity planner:
                      </span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("AP");
                        }}
                      />
                      <span className={styles.months}>1-6 Weeks</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseEleven"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample4"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("AP")}>open</button>
                    </div>
                    <span>
                      Oz-e-maths lesson… Playschool Lesson… Teach Spelling
                      Mastery Lesson… Marketing Campaign Copy… Event… Produce a
                      video clip…Make a graphic illustration…Host a Band camp
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
                        Activity Solution:
                      </span>
                    </div>{" "}
                    <div>
                      <Icon
                        iconName="Add"
                        onClick={() => {
                          addNewTOD("AS");
                        }}
                      />
                      <span className={styles.months}>1-2 Weeks</span>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwelve"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample4"
                >
                  <div className={`${styles.contentYellow} accordion-body`}>
                    <div className={styles.navPhases}>
                      <p>Examples:</p>
                      <button onClick={() => props.getTODType("AS")}>open</button>
                    </div>
                    <span>
                      Purchasing Brief… Business Area Report to CEO… Weekly
                      Production Report……GGSA Annual Plan…
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
