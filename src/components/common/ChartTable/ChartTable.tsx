import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { TDaysArr, TTask } from "types";
import {
  getDaysInMonth,
  getNameOfMonth,
  monthDiff,
} from "../../../util/helper";
import { DurationTable } from "../DurationTable/DurationTable";
import style from "./ChartTable.module.css";

export const ChartTable: React.FC = () => {
  const { period } = useSelector((state: RootState) => state.dataReducer.data);
  const startPeriodRef = useRef<null | Date>(null);
  const endPeriodRef = useRef<null | Date>(null);
  const monthsDiffRef = useRef<null | number>(null);
  const [columnNumber, setColumnNumber] = useState<number>(0);
  const { task } = useSelector((state: RootState) => state.taskReducer);
  
  let temp = 0;
  let sevenDaysArr: TDaysArr = [];
  const daysArr: TDaysArr[] = [];
  const [elementsArr, setElementsArr] = useState<[TDaysArr[], string[]] | null>(null);
  const months: string[] = [];
  const weekDays = useRef<string[]>([]);
  const taskRef = useRef<TTask[]>([]);

  useEffect(() => {
    if (task) {
      taskRef.current = task.sort((a: TTask, b: TTask) => a.id - b.id);
    }
  }, [task]);

  useEffect(() => {
    if (period !== "") {
      const fullPeriod = period.split("-");
      const [startDay, startMonth, startYear] = fullPeriod[0].split(".");
      const [endDay, endMonth, endYear] = fullPeriod[1].split(".");
      const startPeriodDate = new Date(
        +startYear,
        +startMonth - 1,
        +startDay
      );
      const endPeriodDate = new Date(
        +endYear,
        +endMonth - 1,
        +endDay
      );
      startPeriodRef.current = startPeriodDate;
      endPeriodRef.current = endPeriodDate;
      monthsDiffRef.current = monthDiff(startPeriodRef.current, endPeriodRef.current);
    }
  }, [period]);

  const periodTableHandler = () => {
    if (startPeriodRef.current && endPeriodRef.current) {
      const year = startPeriodRef.current.getFullYear();
      let dayNumber = 1;
      for (
        let i = startPeriodRef.current.getMonth();
        i < endPeriodRef.current.getMonth() + 1;
        i++
      ) {
        let monthDaysNumber = getDaysInMonth(year, i + 1);
        if (sevenDaysArr.length < 7 && sevenDaysArr.length > 0) {
          temp = sevenDaysArr.length - 1;
        }
        for (let k = 1; k < monthDaysNumber + 1; k++) {
          const weekDay = new Date(year, i, k).getDay();
          if (weekDay === 0 || weekDay === 6) {
            weekDays.current.push("we");
          } else {
            weekDays.current.push("wd");
          }
        }
        while (monthDaysNumber > 0) {
          if (sevenDaysArr.length === 7) {
            daysArr.push(sevenDaysArr);
            sevenDaysArr = [];
            temp = 0;
          }
          for (let j = temp; j < 7; j++) {
            if (j === 0 || j === 6) {
              months.push(getNameOfMonth(i));
            }
            if (sevenDaysArr.length < 7) {
              monthDaysNumber -= 1;
              sevenDaysArr.push(dayNumber);
              dayNumber += 1;
              if (monthDaysNumber === 0) {
                break;
              }
            }
          }
        }
        dayNumber = 1;
      }
      daysArr.push(sevenDaysArr);
      if (daysArr && months) {
        setElementsArr([daysArr, months]);
        setColumnNumber(daysArr.length * 7);
      }
    }
  };
  useEffect(() => {
    if (endPeriodRef.current && startPeriodRef.current && period !== "") {
      periodTableHandler();
    }
  }, [period]);

  return (
    <div className={style.tableWrap}>
      <div className={style.wrap}>
        {elementsArr &&
          elementsArr[0].map((elem: TDaysArr, i: number) => {
            i = i === 0 ? i : i + i;
            return (
              <div
                key={`${elem}-${elementsArr[1][i]}`}
                className={style.columnWrap}>
                <div className={style.top}>
                  <span className={style.topTitle}>{`${elem[0]} ${
                    elementsArr[1][i]
                  } - ${elem[elem.length - 1]} ${
                    elementsArr[1][i === (elementsArr[0].length - 1) * 2 ? i - 2 : i + 1]
                  }`}</span>
                </div>
                <div className={style.bottom}>
                  <div className={style.daysWrap}>
                    {elem.map((el, i: number) => (
                      <div
                        key={`${elem}-${el} + ${i}`}
                        className={classNames(
                          style.dayBlock,
                          weekDays.current[i] === "we"
                            ? style.dayBlockWeekend
                            : null
                        )}
                      >
                        {el}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <DurationTable
        startDate={startPeriodRef.current}
        endDate={endPeriodRef.current}
        monthDiff={monthsDiffRef.current}
        tasks={taskRef.current}
        columnNumber={columnNumber}
      ></DurationTable>
    </div>
  );
};
