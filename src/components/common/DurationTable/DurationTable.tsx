import classNames from "classnames";
import React from "react";
import { TBorder, TColor, TDurationTable} from "types";
import {
  createDateFromString,
  dayDiff,
  getDaysInMonth,
} from "util/helper";
import style from "./DurationTable.module.css";

const colors: TColor = {
  1: "#E2EBFF",
  2: "#CFF0D6",
  3: "#FFF2E0",
  4: "#FAEFF2",
  5: "#F5F1FE",
};

const borders: TBorder = {
  1: "1px solid #497CF6",
  2: "1px solid #2DB77B",
  3: "1px solid #FFA530",
  4: "1px solid #BE385E",
  5: "1px solid #8754F6",
};


export const DurationTable: React.FC<
  React.PropsWithChildren<TDurationTable>
> = ({ columnNumber, tasks, startDate, endDate }) => {
  let durationRow: JSX.Element[] = [];
  const taskRow: JSX.Element[] = [];

  if (tasks) {
    tasks.forEach((elem) => {
      const color = colors[elem.level];
      const border = borders[elem.level];
      const taskDuration = dayDiff(elem.start, elem.end);
      if (startDate && endDate) {
        const year = startDate.getFullYear();
        const startMonth = startDate.getMonth() + 1;
        const endMonth = endDate.getMonth() + 1;
        for (let i = startMonth; i < endMonth + 1; i++) {
          const days = getDaysInMonth(year, i);
          for (let j = 1; j < days + 1; j++) {
            const formattedDate = createDateFromString(year, i, j);
            durationRow.push(
              <div
                style={{
                  width:
                    formattedDate === elem.start ? `${taskDuration * 22}px` : "",
                  backgroundColor: formattedDate === elem.start ? color : "",
                  border: formattedDate === elem.start ? border : "",
                }}
                className={classNames(
                  formattedDate === elem.start
                    ? style.durationActiveCell
                    : style.durationCell
                )}
                data-date={formattedDate}
              >
                <span className={style.durationTitle}>
                  {formattedDate === elem.start ? elem.title : null}
                </span>
              </div>
            );
          }
        }
      }
      taskRow.push(
        <div className={style.task} data-id={elem.id} data-date={elem.start}>
          <div className={style.durationWrap}>{durationRow}</div>
        </div>
      );
      durationRow = [];
    });
  }
  const columnNumberArray = [];
  for (let i = 0; i < columnNumber; i++) {
    columnNumberArray.push(<div className={style.line}></div>);
  }
  return (
    <div className={style.wrap}>
      <div className={style.periodsWrap}>{taskRow.map((elem) => elem)}</div>
      {columnNumberArray && columnNumberArray.map((elem) => elem)}
    </div>
  );
};
