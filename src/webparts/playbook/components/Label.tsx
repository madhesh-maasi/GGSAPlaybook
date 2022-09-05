import * as React from "react";
import { useState, useEffect } from "react";

const Label = (props) => {
  const [labelContent, setLabelContent] = useState([]);

  // get Label content
  const getLabelSec = () => {
    setLabelContent(props.arrDelSec.usersRoles);
  };

  // life cycle
  useEffect(() => {
    getLabelSec();
  }, []);

  return (
    <div
      style={{
        textAlign: "right",
      }}
    >
      {labelContent.length > 0 && (
        <div>
          {labelContent.map((row) => {
            return (
              <>
                <div>{row}</div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Label;
