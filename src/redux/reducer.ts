import { combineReducers } from "redux";
import { dataReducer, DataReducerState } from "./dataReducer";
import { taskReducer, TaskReducerState } from "./taskReducer";

export type RootState = {
  dataReducer: DataReducerState;
  taskReducer: TaskReducerState;
};

export const rootReducer = combineReducers({
  dataReducer,
  taskReducer,
});
