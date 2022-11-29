import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { tasksData } from "redux/actions";
import { TTaskProps } from "types";
import classNames from "classnames";

import { Button } from "../Button/Button";

import iconArrow from "icons/arrow.svg";
import Icon_1 from "icons/item_icon_1.svg";
import Icon_2 from "icons/item_icon_2.svg";
import Icon_3 from "icons/item_icon_3.svg";
import Icon_4 from "icons/item_icon_4.svg";
import Icon_5 from "icons/item_icon_5.svg";

import style from "./Task.module.css";


export const Task: React.FC<React.PropsWithChildren<TTaskProps>> = ({
  title,
  id,
  sub,
  start,
  end,
  level,
  className,
}) => {
  const [isItemOpen, setItemOpen] = useState(true);
  const taskRef = useRef(null);
  const dispatch = useDispatch();

  const iconHandler = () => {
    switch (level) {
      case 1:
        return Icon_1;
      case 2:
        return Icon_2;
      case 3:
        return Icon_3;
      case 4:
        return Icon_4;
      default:
        return Icon_5;
    }
  };

  const itemTask = {
    id,
    title,
    level,
    start,
    end,
  };

  useEffect(() => {
    if (itemTask && itemTask.id !== 0) {
      dispatch(tasksData(itemTask));
    }
  }, [dispatch]);

  return (
    <div className={classNames(style.wrap)}>
      <div
        data-level={level}
        data-id={id}
        style={{
          paddingLeft: sub ? `${20 * level}px` : `${20 * level + 20}px`,
        }}
        ref={taskRef}
        className={classNames(style.workItem, className)}
      >
        <div className={style.leftWrap}>
          {sub ? (
            <Button
              className={isItemOpen ? style.iconUp : style.iconDown}
              btnState={isItemOpen}
              onClick={setItemOpen}
              icon={iconArrow}
            />
          ) : null}
          <span className={style.iconWrap}>
            <img src={iconHandler()} alt="Item icon" />
          </span>
          <span className={style.childrenNumber}>{sub ? sub.length : "0"}</span>
        </div>
        {title}
      </div>
      <div
        className={classNames(style.subWrap, isItemOpen ? null : style.closed)}
      >
        {sub
          ? ++level &&
            sub.map((elem) => (
              <Task
                title={elem.title}
                id={elem.id}
                level={level}
                sub={elem.sub && elem.sub}
                end={elem["period_end"]}
                start={elem["period_start"]}
                key={elem.id}
              >
                {elem.title}
              </Task>
            ))
          : null}
      </div>
    </div>
  );
};
