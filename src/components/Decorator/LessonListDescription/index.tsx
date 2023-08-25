import React, { useState } from "react";
import { Tooltip } from 'reactstrap';

type LessonListDescriptionType = {
  description: string
}

export default function LessonListDescription({ description }: LessonListDescriptionType) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <React.Fragment>
      {description.length >= 31 ? (
        <React.Fragment>
          <span>{description.substring(0, 30)}</span>
          <a
            href="#"
            rel="noreferrer"
            id="TooltipExample"
          > ... </a>

          <Tooltip
            autohide={true}
            flip={true}
            isOpen={tooltipOpen}
            target="TooltipExample"
            toggle={toggle}>
            {description}
          </Tooltip>
        </React.Fragment>
      ) : (
        <span>{description}</span>
      )
      }
    </React.Fragment >
  );

}