import * as React from "react";
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator";
import { Icon } from "@fluentui/react";
import classes from "./Timeline.module.scss";
import { useState, useEffect } from "react";

let arrTimeline = [];
let curQusOrderNo = 0;

const ProgressStyles = {
  root: {
    minWidth: 70,
    marginRight: -2,
    marginLeft: -2,
  },
  progressTrack: {
    height: 10,
  },
  progressBar: {
    height: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#03787c",
  },
};
const Timeline = (props) => {
  const [timelineData, setTimelineData] = useState(arrTimeline);
  const [curOrder, setCurOrder] = useState(curQusOrderNo);
  const [render, setRender] = useState(props.timelineRender);

  useEffect(() => {
    arrTimeline = props.timeline;
    curQusOrderNo =
      arrTimeline.length > 0 &&
      arrTimeline.filter((li) => li.isRead == false)[0].Order;
    setCurOrder(curQusOrderNo);
    setTimelineData([...arrTimeline]);
    setRender(false);
  }, [render, props.timelineRender]);

  return (
    <div className={classes.TimeLineCover}>
      {timelineData.length > 0 &&
        timelineData.map((li, i) => {
          return (
            <>
              <div
                className={classes.TimeLineIconCover}
                style={{
                  border: `4px solid ${
                    li.Order <= curOrder ? "#03787c" : "#878787"
                  }`,
                }}
              >
                <Icon
                  iconName={`${li.Icon}`}
                  styles={{
                    root: {
                      fontSize: 24,
                      fontWeight: 600,
                      color: li.Order <= curOrder ? "#03787c" : "#878787",
                      cursor: "pointer",
                    },
                  }}
                />
              </div>
              {li.ID == timelineData[timelineData.length - 1].ID ? (
                ""
              ) : (
                <ProgressIndicator
                  styles={ProgressStyles}
                  percentComplete={
                    li.Order == curOrder ? 0.5 : li.Order < curOrder ? 1 : 0
                  }
                />
              )}
            </>
          );
        })}
    </div>
  );
};

export default Timeline;
