import * as React from 'react'
import styles from './Patheay.module.scss'
import { Label, Pivot, PivotItem } from '@fluentui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Icon } from '@fluentui/react'
import { useEffect, useState } from 'react'

const cardImage1 = require('../../../ExternalRef/img/analytics.jpg')
const cardImage2 = require('../../../ExternalRef/img/computing.jpg')
const cardImage3 = require('../../../ExternalRef/img/groupConference.jpg')
const cardImage4 = require('../../../ExternalRef/img/usingSystem.jpg')

const annualPlanURL =
  'https://ggsaus.sharepoint.com/sites/Intranet_dev/SitePages/InnovationHub.aspx?Page=AP'

const Pathway = (props) => {
  /* add the new type of delivery */
  const [pathwayEntry, setPathwayEntry] = useState([])

  const addNewTOD = (type) => {
    type != '' && window.open(annualPlanURL + '&TOD=' + type)
  }
  const getPathwayConfig = (): void => {
    let pathwaySteps: []
    let pathwayEntry
    props.sp.lists
      .getByTitle('PathwayConfig')
      .items.select('*')
      .top(5000)
      .get()
      .then((pathway) => {
        pathwaySteps = pathway.map((row) => {
          return {
            ID: row.ID,
            Value: row.Title,
            Category: row.Category,
          }
        })
        console.log(pathwaySteps)
        setPathwayEntry(pathwaySteps)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getPathwayConfig()
  }, [])

  return (
    <div className={`${styles.PathwayWrapper} container`}>
      <div className={styles.Pathwayheader}>
        <h1 className={styles.title}>
          Select the pathway for your deliverable
        </h1>
        <div className={styles.profile}>
          <p style={{ fontSize: 18, fontWeight: 'bold' }}>{props.userName}</p>
          <div className={styles.avatar}>
            {props.firstName}
            {props.lastName}
          </div>
        </div>
      </div>
      <div className={styles.infoText}>
        There are 8 discrete pathways to deliver a <b>Product</b> and 4 to
        deliver a<b> Solution.</b>   Your <b> Deliverable</b> defines which
        pathway to take.
        <br />
        <p
          style={{
            background: '#00859c',
            color: 'white',
            width: 'fit-content',
            marginTop: '10px',
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '12px',
            paddingRight: '12px',
          }}
        >
          Read the examples to identify your deliverable and select your
          pathway.
        </p>
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>Product:</span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{
                          backgroundColor: '#f99d26',
                        }}
                        onClick={() => {
                          addNewTOD('PT')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>
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
                      {/* <button
                        style={{ color: '#f99d26' }}
                        onClick={() => props.getTODType('PT')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Product' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}

                    {/* <span>
                      Oz-e-science F–6. <br />
                      Music For Learning F–6. <br />
                      Mastery Teaching Pathway Courses. <br /> 8 Cycles of
                      School Practice. <br />
                      School Improvement Framework. <br />
                      PlayschoolFlight Path. <br />
                      Coaching Model.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>
                        New initiative:
                      </span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{
                          backgroundColor: '#f99d26',
                        }}
                        onClick={() => {
                          addNewTOD('NI')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>

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
                      {/* <button
                        style={{ color: '#f99d26' }}
                        onClick={() => props.getTODType('NI')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'New initiative' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {/* 
                    <span>
                      Discovery Trail. <br />
                      CYAAA Cape York Expansion. <br />
                      National School Improvement. <br />
                      Funding proposal for major initiative. <br />
                      Investment Campaign.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>
                        Organisation solution:
                      </span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{
                          backgroundColor: '#f99d26',
                        }}
                        onClick={() => {
                          addNewTOD('OS')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>

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
                      {/* <button
                        style={{ color: "#f99d26" }}
                        onClick={() => props.getTODType("OS")}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Organisation solution' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}

                    {/* <span>
                      Setting up new office. <br />
                      Building Infrastructure.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>Project:</span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#2289ae' }}
                        onClick={() => {
                          addNewTOD('PR')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>

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
                      {/* <button
                        style={{ color: '#2289ae' }}
                        onClick={() => props.getTODType('PR')}
                      >
                        open
                      </button> */}
                    </div>
                    {/* <span>
                      Oz-e-science F–3 Biology. <br /> Oz-e-English Writing F–6.{' '}
                      <br />
                      Spelling Mastery professional learning module. <br />
                      Effective teaching module. <br />
                      Signals Practice Lesson.
                    </span> */}
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Project' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>Technology:</span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#2289ae' }}
                        onClick={() => {
                          addNewTOD('TEC')
                        }}
                      >
                        <Icon iconName="Add" /> Add
                      </div>

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
                      {/* <button
                        style={{ color: '#2289ae' }}
                        onClick={() => props.getTODType('TEC')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Technology' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {/* <span>
                      Teaching and Learning Platform. <br />
                      MTP Learning portal. <br />
                      Leading Mate. <br />8 cycles of school practice web
                      application. <br />
                      Effective teaching web application.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>
                        System solution:
                      </span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#2289ae' }}
                        onClick={() => {
                          addNewTOD('SS')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>

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
                      {/* <button
                        style={{ color: '#2289ae' }}
                        onClick={() => props.getTODType('SS')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'System solution' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {/* <span>
                      Contracts Register. <br />
                      Digital Database. <br />
                      HR Database.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>Task:</span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#2289ae' }}
                        onClick={() => {
                          addNewTOD('T')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>

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
                      {/* <button
                        style={{ color: '#2289ae' }}
                        onClick={() => props.getTODType('T')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Task' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {/* <span>
                      Maths of Science research. <br />
                      Playschool Professional Learning Framework. <br />
                      Oz-e-English Unit 1 Year 5 Poster Set.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>Strategy:</span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#2289ae' }}
                        onClick={() => {
                          addNewTOD('S')
                        }}
                      >
                        <Icon iconName="Add" /> Add
                      </div>
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
                      {/* <button
                        style={{ color: '#2289ae' }}
                        onClick={() => props.getTODType('S')}
                      >
                        open
                      </button> */}
                    </div>
                    {/* <span>
                      Investors Policy Paper. <br />
                      Annual Marketing Strategy. <br />
                      Marketing Campaign.
                    </span> */}
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Strategy' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>
                        Task solution:
                      </span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#2289ae' }}
                        onClick={() => {
                          addNewTOD('TS')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>

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
                      {/* <button
                        style={{ color: '#2289ae' }}
                        onClick={() => props.getTODType('TS')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Task solution' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {/* <span>
                      HR strategy or policies. <br />
                      Board meeting.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>Activity:</span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#f99d26' }}
                        onClick={() => {
                          addNewTOD('A')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>

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
                      {/* <button
                        style={{ color: '#f99d26' }}
                        onClick={() => props.getTODType('A')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Activity' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {/* <span>
                      Planning document: Delivery Plan. <br />
                      Commencement Brief. <br />
                      ABCD on a Page. <br />
                      User Stories. <br />
                      Science Exhibition Flyer to Parents. <br />
                      Observation Form. <br />
                      Research Brief. <br />
                      Requirements Brief. <br />
                      School Review Report.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>
                        Activity planner:
                      </span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#f99d26' }}
                        onClick={() => {
                          addNewTOD('AP')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>

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
                      {/* <button
                        style={{ color: '#f99d26' }}
                        onClick={() => props.getTODType('AP')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Activity planner' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {/* <span>
                      Oz-e-maths lesson. <br />
                      Playschool Lesson. <br />
                      Teach Spelling Mastery Lesson. <br /> Marketing Campaign
                      Copy. <br />
                      Event. <br />
                      Produce a video clip. <br />
                      Make a graphic illustration. <br />
                      Host a Band camp.
                    </span> */}
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
                      <span className="plus">+</span>{' '}
                      <span className={styles.accordianTitle}>
                        Activity solution:
                      </span>
                    </div>{' '}
                    <div>
                      <div
                        className={styles.ribbonBtn}
                        style={{ backgroundColor: '#f99d26' }}
                        onClick={() => {
                          addNewTOD('AS')
                        }}
                      >
                        <Icon iconName="Add" />
                        Add
                      </div>
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
                      {/* <button
                        style={{ color: '#f99d26' }}
                        onClick={() => props.getTODType('AS')}
                      >
                        open
                      </button> */}
                    </div>
                    {pathwayEntry.length > 0 && (
                      <div className={styles.scroller}>
                        <span>
                          {pathwayEntry.map((row) => {
                            return row.Category == 'Activity solution' ? (
                              <div>
                                {row.Value}
                                <br />
                              </div>
                            ) : (
                              ''
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {/* <span>
                      Purchasing Brief. <br /> Business Area Report to CEO.{' '}
                      <br />
                      Weekly Production Report. <br />
                      GGSA Annual Plan.
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Pathway
