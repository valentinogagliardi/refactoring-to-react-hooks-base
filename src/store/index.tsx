import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { datasetReducer as dataset } from "../features/Dashboard/DashboardSlice";
import thunk from "redux-thunk";
const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  dataset,
});

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;
