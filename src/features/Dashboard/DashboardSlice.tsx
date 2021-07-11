import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

enum ACTIONS {
  FETCH_DATASET_START = "FETCH_DATASET_START",
  FETCH_DATASET_SUCCESS = "FETCH_DATASET_SUCCESS",
  FETCH_DATASET_FAILURE = "FETCH_DATASET_FAILURE",
}
export interface DataPoint {
  timestamp: string;
  amount: number;
}

export interface DashboardState {
  loading: boolean;
  error: string;
  salesTotal: number;
  subscriptionsTotal: number;
  data: DataPoint[];
}

const initialState: DashboardState = {
  loading: true,
  error: "",
  salesTotal: 0,
  subscriptionsTotal: 0,
  data: [{ timestamp: new Date().toISOString(), amount: 0 }],
};

export function datasetReducer(
  state = initialState,
  action: { type: ACTIONS; payload: DashboardState }
) {
  const {
    FETCH_DATASET_START,
    FETCH_DATASET_FAILURE,
    FETCH_DATASET_SUCCESS,
  } = ACTIONS;

  switch (action.type) {
    case FETCH_DATASET_START:
      return { ...state, loading: true };
    case FETCH_DATASET_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case FETCH_DATASET_SUCCESS:
      /*
      This case handles two different conditions:
      1. We use the array of objects coming from "/sales/" or "/subscriptions/" as our dataset
      or
      2. We use the totals coming from the "/totals/" object
       */
      const data = Array.isArray(action.payload) ? action.payload : state.data;
      /* if totals are undefined use the previous state as the default */
      const {
        salesTotal = state.salesTotal,
        subscriptionsTotal = state.subscriptionsTotal,
      } = action.payload;

      return {
        ...state,
        loading: false,
        error: "",
        salesTotal,
        subscriptionsTotal,
        data,
      };
    default:
      return state;
  }
}

/*
Action creators
*/
function fetchDatasetStart() {
  return { type: ACTIONS.FETCH_DATASET_START };
}

function fetchDatasetFailure(payload: DashboardState) {
  return { type: ACTIONS.FETCH_DATASET_FAILURE, payload };
}

function fetchDatasetSuccess(payload: DashboardState["data"]) {
  return { type: ACTIONS.FETCH_DATASET_SUCCESS, payload };
}

export function fetchDataset(endpoint: string) {
  return async function (
    dispatch: ThunkDispatch<DashboardState, void, Action>
  ) {
    dispatch(fetchDatasetStart());
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      return dispatch(fetchDatasetSuccess(json));
    } catch (error) {
      return dispatch(fetchDatasetFailure(error.message));
    }
  };
}
