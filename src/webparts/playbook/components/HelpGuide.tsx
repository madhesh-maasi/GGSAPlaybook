import * as React from 'react'
import styles from './HelpGuide.module.scss'
// Pivot
import {
  IPivotStyles,
  Pivot,
  PivotItem,
} from 'office-ui-fabric-react/lib/Pivot'
import { Icon, IStyleSet, mergeStyleSets } from 'office-ui-fabric-react'
// images
const bgImage1 = require('../../../ExternalRef/img/discussionImg1.jpg')
const bgImage2 = require('../../../ExternalRef/img/discussionImg2.jpg')
const avatarYellow = require('../../../ExternalRef/img/avatarYellow.png')
const avatarBlue = require('../../../ExternalRef/img/avatarBlue.png')
const avatarWhite = require('../../../ExternalRef/img/avatarWhite.png')
const boxBlue = require('../../../ExternalRef/img/boxBlue.png')
const boxYellow = require('../../../ExternalRef/img/boxYellow.png')
const giftBlue = require('../../../ExternalRef/img/giftBlue.png')

// lines
// yellow lines
const lineY1 = require('../../../ExternalRef/img/Product flow michel yellow lines/lineYel1.png')
const lineY2 = require('../../../ExternalRef/img/Product flow michel yellow lines/lineYel2.png')
const lineY3 = require('../../../ExternalRef/img/Product flow michel yellow lines/lineYel3.png')
const lineY4 = require('../../../ExternalRef/img/Product flow michel yellow lines/lineYel4.png')
const lineY5 = require('../../../ExternalRef/img/Product flow michel yellow lines/lineYel5.png')
// blue lines
const lineBl1 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl1.png')
const lineBl2 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl2.png')
const lineBl3 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl3.png')
const lineBl4 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl4.png')
const lineBl5 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl5.png')
const lineBl6 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl6.png')
const lineBl7 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl7.png')
const lineBl8 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl8.png')
const lineBl9 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl9.png')
const lineBl10 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl10.png')
const lineBl11 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl11.png')
const lineBl12 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl12.png')
const lineBl13 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl13.png')
const lineBl14 = require('../../../ExternalRef/img/Product flow michel blue lines/lineBl14.png')

// cards badge images
const productImg = require('../../../ExternalRef/img/products.png')
const solutionsImg = require('../../../ExternalRef/img/solutions.png')
const InnovationSysImg = require('../../../ExternalRef/img/inoSys.png')
const DelivarablesImg = require('../../../ExternalRef/img/delivarables.png')
const clientFuncImg = require('../../../ExternalRef/img/clientFunc.png')
const productionBlueImg = require('../../../ExternalRef/img/productionBlue.png')
const teamsImg = require('../../../ExternalRef/img/teams.png')

const pivotStyles: Partial<IStyleSet<IPivotStyles>> = {
  root: {
    '.ms-Pivot-icon': {
      fontSize: '25px',
      color: '#8F8F8F',
    },
  },
  itemContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 100px',
  },
  link: {
    width: '220px ',
    ':hover': {
      background: 'transparent',
    },
    ':active': {
      background: 'transparent',
    },
  },
  linkContent: {},
  linkIsSelected: {
    width: '220px ',
    selectors: {
      ':hover': {
        background: 'transparent',
        ':before': {
          left: '8px',
          right: '8px',
        },
        ':active': {
          background: 'transparent',
        },
        '.ms-Pivot-icon': {
          fontSize: '25px',
          fontWeight: 'bold',
        },
      },
      ':before': {
        borderRadius: '50px',
        height: '12px',
        transform: 'translateY(20px)',
        background: 'linear-gradient(18deg,#F99D26,#FCB427 )',
        boxShadow: '0px 2px 10px #F99D2680',
      },
      '.ms-Pivot-icon': {
        fontSize: '25px',
        fontWeight: 'bold',
        color: '#f99d26',
      },
    },
  },
}
const eventab = mergeStyleSets({
  tabBlue: {
    linkIsSelected: {
      width: '220px ',
      selectors: {
        ':before': {
          borderRadius: '50px',
          height: '13px',
          transform: 'translateY(20px)',
          background: 'linear-gradient(18deg,#00859C,#00859C90 ) !important',
          boxShadow: '0px 2px 10px #00859C80 !important',
        },
        '.ms-Pivot-icon': {
          fontSize: '25px',
          fontWeight: 'bold',
          color: '#00859C !important',
        },
      },
    },
  },
})
// popup function
// const openPopup = (e) => {
//   document
//     .querySelector(".MapPopup")
//     .classList.toggle(`${styles.closeMapPopup}`);
// };

const HelpGuide = (props) => {
  return (
    <div className={styles.helpWrapper}>
      {/* header */}
      <div className={styles.header}>
        <h1>Help guide</h1>
      </div>
      {/* pivot tabs */}
      {/* progress line */}
      <div className={styles.progress}></div>
      {/* pivot wrapper */}
      <Pivot className={styles.pivotWrapper} styles={pivotStyles}>
        <PivotItem itemIcon="home">
          <div className={styles.pivotContainer}>
            <div className={styles.tabInfoText}>
              <h1>Our products and solutions</h1>
            </div>
            <div className={styles.cardsSection}>
              <div className={styles.card}>
                <div className={styles.topContentLg}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage1}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${productImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Products</h2>
                    <p>
                      The three types of Product are Curriculum, Professional
                      Learning and School Improvement. Curriculum programs Our
                      integrated curriculum uses evidence-based effective
                      teaching and assessment to cover Australian Curriculum
                      subject areas. It contains ready-to-teach lessons, Student
                      Workbooks and Teaching Guides and related resources.
                    </p>
                  </div>
                </div>
                <div className={styles.bottomContent}>
                  <div className={styles.textContent}>
                    <p>Professional Learning</p>
                    <span>
                      Our professional learning online platform is for school
                      leaders and teaching teams. The suite of modules covers
                      effective teaching techniques and practices and subject
                      specific programs. It enables school teams to achieve
                      mastery accreditation with certification to national
                      standards.
                    </span>
                  </div>
                  <div className={styles.textContent}>
                    <p>School Improvement</p>
                    <span>
                      Our suite of school improvement tools supports schools in
                      implementing school improvement. Tools include planning,
                      setting up local partnerships, leadership and teaching
                      coaching and data monitoring to manage continuous
                      improvement. The Teaching and Learning Instrument enables
                      schools to store team development, implementation
                      delivery, student testing to manage improvement
                      implementation.
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.topContentLg}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage2}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${solutionsImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Solutions</h2>
                    <p>
                      Internal GGSA systems and documentation that are used for
                      planning, development or delivery of GGSA products.
                    </p>
                  </div>
                </div>
                <div className={styles.bottomContent}>
                  <div className={styles.textContent}>
                    <p>Technology systems</p>
                    <span>
                      Systems that the team use to develop and deliver products
                      like the Digital database which stores thousands of
                      images, illustrations and graphics used to build GGSA
                      product. Of the Contacts register which stores thousands
                      of customer and partner names used the promote GGSA
                      product.
                    </span>
                  </div>
                  <div className={styles.textContent}>
                    <p>Business processes</p>
                    <span>
                      Documentation that assist the team to develop and promote
                      GGSA product like funding proposals, HR and purchasing
                      policies, and contract register.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PivotItem>

        <PivotItem itemIcon="refresh" className={eventab.tabBlue}>
          <div className={styles.pivotContainer}>
            <div className={styles.tabInfoText}>
              <h1>Our Innovation Hub</h1>
              <p>
                All team members follow the <b>Playbook</b> to deliver their
                work. It articulates how teams deliver{' '}
                <b>products and solutions</b> by following <b>practices</b> and
                <b>phases</b>.
              </p>
            </div>
            <div className={styles.cardsSection}>
              <div className={styles.cardBlue}>
                <div className={styles.topContentSm}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage1}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${InnovationSysImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Innovation system</h2>
                  </div>
                </div>
                <div className={styles.bottomContent}>
                  <div className={styles.textContent}>
                    <ul>
                      <li>
                        The <b>Annual Plan</b> lists all the <b>Products</b> and
                        <b> Solutions</b> that are to be developed for that
                        calendar year.
                      </li>
                      <li>
                        The <b>Delivery Plan</b> lists all of the deliverables
                        for that particular <b>Product or Solution</b>.
                      </li>
                      <li>
                        The <b>Production board</b> lists the work, called
                        <b> Activities</b>, that you will do for that week. All
                        roles log their productor solution development{' '}
                        <b>activity</b> on the <b>Production Board</b> each
                        week. 
                      </li>
                      <li>
                        The <b>Activity Planner</b> lists the steps that
                        standard
                        <b> Activity</b> follows and indicates when each one is
                        completed by team members.{' '}
                      </li>
                      <li>
                        The <b>Document Review</b> shows all the{' '}
                        <b>Deliverables</b> for that week that you have
                        submitted for review and/or sign off.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.cardBlue}>
                <div className={styles.topContentSm}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage2}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${DelivarablesImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Deliverables</h2>
                  </div>
                </div>
                <div className={styles.bottomContent}>
                  <div className={styles.textContent}>
                    <ul>
                      <li>
                        Every piece of work associated with a <b>Product</b> or
                        <b> Solution</b> is called a <b>Deliverable</b>.
                      </li>
                      <li>
                        Every <b>Deliverable</b> belongs to a business area.
                      </li>
                      <li>
                        Each <b>Deliverable</b> is categorised as either a:
                        <span>
                          <b>Planning</b>: To plan deliverables, e.g.
                          Commencement Brief, Delivery Plan
                        </span>
                        <span>
                          <b>Development</b>: To design and build a deliverable,
                          e.g. a strategic conversation, User Stories
                        </span>
                        <span>
                          <b> Product/solution</b>: <b>The actual piece</b> or
                          <b> component</b> that is part of a product that the
                          customer uses, e.g. Teaching Guide, Professional
                          Learning module or a School Improvement Plan or part
                          of the <b>solution</b> the team uses
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PivotItem>

        <PivotItem itemIcon="People">
          <div className={styles.pivotContainer}>
            <div className={styles.tabInfoText}>
              <h1>
                Client and team relationship{' '}
                <div>
                  Developers are supported by leadership to successfully produce
                  deliverables in their roles.
                </div>
              </h1>
              <p>
                <ul>
                  <li>
                    The leadership is provided by the Client, who holds the
                    vision for the product and directs the team on product
                    development.
                  </li>
                </ul>
                <ul>
                  <li>
                    The developer ensures they confidently plan and carry out
                    their work, resolve process issues as they arise, and
                    deliver the work to agreed timelines.
                  </li>
                </ul>
              </p>
            </div>
            <div className={styles.cardsSection}>
              <div className={styles.card}>
                <div className={styles.topContentSm}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage1}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${clientFuncImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Client</h2>
                  </div>
                </div>
                <div className={`${(styles.bottomContent, styles.tab3Cont)}`}>
                  <div className={styles.textContent}>
                    <ol>
                      <li>
                        Understand the vision for the deliverable and lead its
                        development.
                      </li>
                      <li>Endorse resourcing, budget and products.</li>
                      <li>
                        Provide direction in Client Innovation Meetings on work
                        underway and work about to commence.
                      </li>
                      <li>
                        Inform Developer of emerging issues regarding quality
                        and timelines of deliverables.
                      </li>
                      <li>
                        Provide Developers feedback to support weekly process
                        debriefs.
                      </li>
                      <li>Sign off on deliverables.</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.topContentSm}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage2}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${productImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Scheduler </h2>
                  </div>
                </div>
                <div className={`${(styles.bottomContent, styles.tab3Cont)}`}>
                  <div className={styles.textContent}>
                    <ol>
                      <li>Oversee timelines, resourcing and budget.</li>
                      <li>Advise team on following work practices.</li>
                      <li>
                        Support developers to manage work to agreed timelines.
                      </li>
                      <li>Ensure teams schedule advised stand-ups.</li>
                      <li>
                        Address productivity issues impacting on delivery.
                      </li>
                      <li>
                        Facilitate weekly debriefs on process and implement
                        improvements with the team.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PivotItem>

        <PivotItem itemIcon="SwitchUser" className={eventab.tabBlue}>
          <div className={styles.pivotContainer}>
            <div className={styles.tabInfoText}>
              <h1>Our teams</h1>
            </div>
            <div className={styles.cardsSection}>
              <div className={styles.cardBlueSm}>
                <div className={styles.topContentSm}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage1}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${productionBlueImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Production</h2>
                  </div>
                </div>
                <div className={`${(styles.bottomContent, styles.tab4Cont)}`}>
                  <div className={styles.textContent}>
                    <ul>
                      <li>
                        There are 10 <b>business areas</b> made up of three
                        <b> Product Development</b>, six <b>Skilled Services</b>{' '}
                        and one school support area, being{' '}
                        <b>School Partnerships.</b>{' '}
                      </li>
                      <li>
                        <b>Developers</b> work in
                        <b> Curriculum, Professional Learning</b> and{' '}
                        <b>School Improvement.</b>
                      </li>
                      <li>
                        <b>Specialist Developers</b> work in their respective
                        <b> Skilled Services business areas</b> and work
                        products and solutions as required.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.cardBlueSm}>
                <div className={styles.topContentSm}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage2}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${teamsImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Teams</h2>
                  </div>
                </div>
                <div className={`${(styles.bottomContent, styles.tab4Cont)}`}>
                  <div className={styles.textContent}>
                    <ul>
                      <li>
                        <b>Clients</b> provide direction on all work
                      </li>
                      <li>
                        <b>Scheduler</b> supports team members to deliver work
                        based on the Client direction.
                      </li>
                      <li>
                        <b>Business Area Leads</b> get direction from Clients
                        for their team’s work for each year which the build into
                        the
                        <b> Annual Plan.</b>{' '}
                      </li>
                      <li>
                        They support their team members to plan so they complete
                        deliverables on time and to expected standard.
                      </li>
                      <li>
                        Team members work on products and solution from start to
                        finish so they develop expertise in those products.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.cardBlueSm}>
                <div className={styles.topContentSm}>
                  <div className={styles.bgImg}>
                    <img src={`${bgImage2}`} alt="bgImage" />
                  </div>
                  <div className={styles.badge}>
                    <img src={`${InnovationSysImg}`} alt="Badge image" />
                  </div>
                  <div className={styles.heading}>
                    <h2>Work allocations</h2>
                  </div>
                </div>
                <div className={`${(styles.bottomContent, styles.tab4Cont)}`}>
                  <div className={styles.textContent}>
                    <ul>
                      <li>
                        Every role in GGSA carries out their work using the
                        Innovation Hub.
                      </li>
                      <li>
                        Some roles use it more than others:
                        <span>
                          Operational roles spend 60-80 per cent of their time
                          on operations activity which is not recorded in the
                          Innovation Hub.
                        </span>
                        <span>
                          Development roles spend 80–90 per cent of their time
                          on innovation activity which I all done using the
                          Innovation Hub.
                        </span>
                      </li>
                      <li>
                        Every role has an administration allocation of two hours
                        per week or eight hours per month pre-set time to role
                        management.{' '}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PivotItem>

        <PivotItem itemIcon="Code">
          <div className={styles.pivotContainer}>
            <div className={styles.map}>
              <div className={styles.titles}>
                <h2>Solutions</h2>
                <h2 className={styles.titleBlue}>Products</h2>
              </div>
              <div className={styles.mapsWrapper}>
                <div className={styles.lMap}>
                  <div className={styles.row1}>
                    <img src={`${lineY5}`} className={styles.lineY5} alt="" />

                    <div className={styles.roundCard}>
                      <p>Business area manager</p>
                      <div
                        className={styles.img}
                        onClick={() => {
                          document
                            .querySelector('.MapPopup1')
                            .classList.toggle(`${styles.closeMapPopup}`)
                        }}
                      >
                        <img src={`${avatarYellow}`} alt="" />
                        <div
                          className={`MapPopup1 ${styles.MapPopup} ${styles.closeMapPopup}`}
                        >
                          Oversees development of solution throughout its life
                          cycle to ensure it meets timeline, GGSA standard
                          quality and is fit for purpose
                        </div>
                      </div>
                    </div>
                    <img src={`${lineY1}`} className={styles.lineY1} alt="" />
                    <img src={`${lineY2}`} className={styles.lineY2} alt="" />
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.roundCard}>
                      <div className={styles.img}>
                        <img src={`${boxYellow}`} alt="" />
                      </div>
                    </div>
                    <img src={`${lineY3}`} className={styles.lineY3} alt="" />
                    <img src={`${lineY4}`} className={styles.lineY4} alt="" />
                  </div>
                  <div className={styles.row3}>
                    <div className={styles.roundCard}>
                      <p>Solution developer</p>
                      <div
                        className={styles.img}
                        onClick={() => {
                          document
                            .querySelector('.MapPopup2')
                            .classList.toggle(`${styles.closeMapPopup}`)
                        }}
                      >
                        <img src={`${avatarYellow}`} alt="" />
                        <div
                          className={`MapPopup2 ${styles.MapPopup} ${styles.closeMapPopup}`}
                        >
                          May come from any team in with right skills and takes
                          solution through lifecycle from start-up
                        </div>
                      </div>
                    </div>
                    <div className={styles.roundCard}>
                      <p>Business developer</p>
                      <div className={styles.img}>
                        <img src={`${avatarYellow}`} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.rMap}>
                  <div className={styles.row1}>
                    <div className={styles.roundCard}>
                      <p>Client</p>
                      <div className={styles.img}>
                        {' '}
                        <img src={`${boxBlue}`} alt="" />
                      </div>
                      <img
                        src={`${lineBl8}`}
                        className={styles.lineB1}
                        alt=""
                      />
                      <img
                        src={`${lineBl13}`}
                        className={styles.lineB2}
                        alt=""
                      />
                      <img
                        src={`${lineBl5}`}
                        className={styles.lineL1}
                        alt=""
                      />
                      <img
                        src={`${lineBl1}`}
                        className={styles.lineR1}
                        alt=""
                      />
                    </div>
                    <div className={styles.roundCard}>
                      <p>Product manager</p>
                      <div
                        className={styles.img}
                        onClick={() => {
                          document
                            .querySelector('.MapPopup3')
                            .classList.toggle(`${styles.closeMapPopup}`)
                        }}
                      >
                        {' '}
                        <img src={`${avatarBlue}`} alt="" />
                        <div
                          className={`MapPopup3 ${styles.MapPopup} ${styles.closeMapPopup}`}
                        >
                          Oversees development of solution throughout its life
                          cycle to ensure it meets timeline, GGSA standard
                          quality and Properly operationized
                        </div>
                      </div>
                      <img
                        src={`${lineBl9}`}
                        className={styles.lineB3}
                        alt=""
                      />
                    </div>
                    <img
                      src={`${lineBl14}`}
                      className={styles.lineTopL1}
                      alt=""
                    />
                    <div className={styles.roundCard}>
                      <p>Product developer</p>
                      <div
                        className={styles.img}
                        onClick={() => {
                          document
                            .querySelector('.MapPopup4')
                            .classList.toggle(`${styles.closeMapPopup}`)
                        }}
                      >
                        {' '}
                        <img src={`${avatarBlue}`} alt="" />
                        <div
                          className={`MapPopup4 ${styles.MapPopup} ${styles.closeMapPopup}`}
                          style={{ fontSize: '12px' }}
                        >
                          Curriculam, professional learning and school
                          improvement. Develops a set of allocated products
                          through every version in innovation life cycle from
                          start-up onwards. ensures BA developers complete
                          allocated deliverables on their product per client
                          directions. and advises manager of any issues relating
                          to collaboration across teams.
                        </div>
                      </div>
                      <img
                        src={`${lineBl7}`}
                        className={styles.lineB4}
                        alt=""
                      />{' '}
                    </div>
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.lCont}>
                      <div className={styles.infoCard}>
                        <div className={styles.infoTop}>
                          <div className={styles.img}>
                            <img src={`${avatarWhite}`} alt="" />
                          </div>
                          <p>Technology developer</p>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoTop}>
                          <div className={styles.img}>
                            <img src={`${avatarWhite}`} alt="" />
                          </div>
                          <p>Data developer</p>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoTop}>
                          <div className={styles.img}>
                            <img src={`${avatarWhite}`} alt="" />
                          </div>
                          <p>Research developer</p>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoTop}>
                          <div className={styles.img}>
                            <img src={`${avatarWhite}`} alt="" />
                          </div>
                          <p>Design developer</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.roundCard}>
                      <div
                        className={styles.img}
                        onClick={() => {
                          document
                            .querySelector('.MapPopup5')
                            .classList.toggle(`${styles.closeMapPopup}`)
                        }}
                      >
                        <img src={`${giftBlue}`} alt="" />
                        <div
                          className={`MapPopup5 ${styles.MapPopup} ${styles.closeMapPopup}`}
                        >
                          Specialist developers sit across business areas and
                          are assigned work from product managers( who hold the
                          budget and purchase and purchase that resource).
                          <span style={{ marginTop: '10px' }}>
                            <b>Skilled services</b> develops product components
                            in their areas to complete deliverables as needed
                            according to annual and term plans
                          </span>
                        </div>
                      </div>
                    </div>

                    <img src={`${lineBl10}`} className={styles.lineL2} alt="" />
                    <img src={`${lineBl6}`} className={styles.lineL3} alt="" />
                    <img src={`${lineBl11}`} className={styles.lineL4} alt="" />
                    <img src={`${lineBl2}`} className={styles.lineR2} alt="" />
                    <img src={`${lineBl3}`} className={styles.lineR3} alt="" />
                    <img src={`${lineBl4}`} className={styles.lineR4} alt="" />
                    <img
                      src={`${lineBl12}`}
                      className={styles.lineBt1}
                      alt=""
                    />
                    <div className={styles.rCont}>
                      <div className={styles.infoCard}>
                        <div className={styles.infoTop}>
                          <div className={styles.img}>
                            <img src={`${avatarWhite}`} alt="" />
                          </div>
                          <p>Marketing developer</p>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoTop}>
                          <div className={styles.img}>
                            <img src={`${avatarWhite}`} alt="" />
                          </div>
                          <p>Content curator</p>
                        </div>
                      </div>
                      <div className={styles.infoCard}>
                        <div className={styles.infoTop}>
                          <div className={styles.img}>
                            <img src={`${avatarWhite}`} alt="" />
                          </div>
                          <p>Content developer</p>
                        </div>
                      </div>
                      <div
                        className={styles.infoCard}
                        onClick={() => {
                          document
                            .querySelector('.MapInfoPopup')
                            .classList.toggle(`${styles.closeMapPopup}`)
                        }}
                      >
                        <div className={styles.infoTop}>
                          <div className={styles.img}>
                            <img src={`${avatarWhite}`} alt="" />
                          </div>
                          <p>Events developer</p>
                        </div>
                        <div
                          className={`MapInfoPopup ${styles.infoBt} ${styles.closeMapPopup}`}
                        >
                          <span>
                            Coordinates events to promote GGSA and its products
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.infoBtCard}>
                      <div className={styles.img}>
                        <img src={`${avatarYellow}`} alt="" />
                      </div>
                      <p>Editor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PivotItem>
      </Pivot>
    </div>
  )
}
export default HelpGuide
