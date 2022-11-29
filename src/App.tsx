import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Chart } from "components/Chart/Chart";
import { Button } from "components/common/Button/Button";
import { loadData } from "redux/actions";
import { RootState } from "redux/reducer";

import iconDownload from "icons/arrow_download.svg";

import "./App.css";

function App() {
  const [btnState, setButtonState] = useState(false);
  const dispatch = useDispatch();
  const { project, period } = useSelector(
    (state: RootState) => state.dataReducer.data
  );
  const { isPending, error } = useSelector(
    (state: RootState) => state.dataReducer
  );

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const titleHandler = () => {
    if (error) {
      return "Что-то пошло не так...";
    }
    if (project && period) {
      return project + " / " + period;
    }
    return "Загрузка...";
  };

  const chartElementHandler = () => {
    if (error) {
      return <div className="app__error">Ошибка загрузки данных.</div>;
    }
    if (!error && isPending) {
      return <div className="app__loading">Идет загрузка данных...</div>;
    }
    return <Chart />;
  };
  return (
    <div className="App">
      <main>
        <div className="app__container">
          <div className="app__top-wrap">
            <h1 className="app__title">{titleHandler()}</h1>
            <Button
              className={"app__btn--export"}
              icon={iconDownload}
              btnState={btnState}
              onClick={setButtonState}
            >
              Export
            </Button>
          </div>
          {chartElementHandler()}
        </div>
      </main>
    </div>
  );
}

export default App;
