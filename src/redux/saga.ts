import { all } from "redux-saga/effects";
import { call, put } from "typed-redux-saga";
import { takeEvery } from "redux-saga/effects";
import { API } from "api/api";
import {
  loadDataFailure,
  loadDataSuccess,
  LOAD_DATA,
  pendingData,
} from "./actions";
import { TData } from "types";

function* dataSaga(): Generator {
  try {
    yield put(pendingData(true));
    const data = yield* call(API.getData);
    if (data) {
      yield put(loadDataSuccess(data as TData));
    } else {
      yield put(loadDataFailure(true));
    }
  } catch (e) {
    yield put(loadDataFailure(true));
  } finally {
    yield put(pendingData(false));
  }
}

function* loadDataSaga() {
  yield takeEvery(LOAD_DATA, dataSaga);
}

export default function* rootSaga(): Generator {
  yield all([loadDataSaga()]);
}
