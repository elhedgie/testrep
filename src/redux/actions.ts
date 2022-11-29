import { TData, TTask } from "types";

export const LOAD_DATA = "LOAD_DATA";
export const DATA_PENDING = "DATA_PENDING";
export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";
export const LOAD_DATA_FAILURE = "LOAD_DATA_FAILURE";
export const ADD_TASK = "ADD_TASK";

export const loadData = () => ({
  type: LOAD_DATA,
});

export const pendingData = (isPending: boolean) => ({
  type: DATA_PENDING,
  payload: {
    isPending,
  },
});

export const loadDataSuccess = (data: TData) => ({
  type: LOAD_DATA_SUCCESS,
  payload: {
    data,
  },
});

export const loadDataFailure = (error: boolean) => ({
  type: LOAD_DATA_FAILURE,
  payload: {
    error,
  },
});

export const tasksData = (task: TTask) => ({
  type: ADD_TASK,
  payload: {
    task,
  },
});
