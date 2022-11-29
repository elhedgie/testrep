import React from "react";
import classNames from "classnames";

import style from "./Button.module.css";
import { TButtonProps } from "types";

export const Button: React.FC<React.PropsWithChildren<TButtonProps>> = ({
  children,
  onClick,
  icon,
  btnState,
  className,
}) => {
  const handleBtnClick = () => {
    onClick(!btnState);
  };

  return (
    <button
      onClick={handleBtnClick}
      type="button"
      className={classNames(style.btn, className)}
    >
      <span className={style.iconWrap}>
        <img className={classNames(style.icon)} src={icon} alt="Task icon" />
      </span>
      {children}
    </button>
  );
};
