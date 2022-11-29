import { handleActions } from "redux-actions";
import { DATA_PENDING, LOAD_DATA_FAILURE, LOAD_DATA_SUCCESS } from "./actions";
import { TData } from "types";

export type DataReducerState = {
  data: TData;
  isPending: boolean;
  error: boolean;
};

const initialState: DataReducerState = {
  data: {
    project: "",
    period: "",
    chart: {
      id: 0,
      title: "",
      period_start: "",
      period_end: "",
    },
  },
  isPending: false,
  error: false,
};

export const dataReducer = handleActions<DataReducerState>(
  {
    [DATA_PENDING]: (state, { payload }) => ({
      ...state,
      isPending: payload.isPending,
    }),
    [LOAD_DATA_SUCCESS]: (state, { payload }) => ({
      ...state,
      data: payload.data,
    }),
    [LOAD_DATA_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload.error,
    }),
  },
  initialState
);
