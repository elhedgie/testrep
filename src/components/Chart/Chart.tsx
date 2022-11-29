import React from "react";

import { Task } from "components/common/Task/Task";
import { ChartTable } from "components/common/ChartTable/ChartTable";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";

import style from "./Chart.module.css";

export const Chart: React.FC = () => {
  const { chart } = useSelector((state: RootState) => state.dataReducer.data);
  const dataObject = chart && chart;

  return (
    <div className={style.chartWrap}>
      <div className={style.chartSide}>
        <div className={style.chartSideTitle}>
          <span>Work item</span>
        </div>
        <div className={style.chartSideContent}>
          {Array.isArray(dataObject) ? (
            dataObject.map((elem) => (
              <Task
                title={elem.title}
                id={elem.id}
                level={1}
                sub={elem.sub ? elem.sub : null}
                end={elem["period_end"]}
                start={elem["period_start"]}
                key={elem.id}
              >
                {elem.title}
              </Task>
            ))
          ) : (
            <Task
              title={dataObject.title}
              id={dataObject.id}
              level={1}
              sub={dataObject.sub && dataObject.sub}
              end={dataObject["period_end"]}
              start={dataObject["period_start"]}
              key={dataObject.id}
            >
              {dataObject.title}
            </Task>
          )}
        </div>
      </div>
      <div className={style.chartContent}>
        <ChartTable />
      </div>
    </div>
  );
};
