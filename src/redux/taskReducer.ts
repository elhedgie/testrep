import { handleActions } from "redux-actions";
import { ADD_TASK } from "./actions";
import { TTask } from "types";

export type TaskReducerState = {
  task: TTask[];
};

const initialState: TaskReducerState = {
  task: [],
};

export const taskReducer = handleActions<TaskReducerState>(
  {
    [ADD_TASK]: (state, { payload }) => {
      const tasks: TTask[] = [...state.task, payload.task] as TTask[];
      return {
        ...state,
        task: tasks,
      };
    },
  },
  initialState
);
