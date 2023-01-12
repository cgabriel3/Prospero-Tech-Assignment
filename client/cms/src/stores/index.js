import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const initialValue = {
  users: [],
  userDetail: null,
  taxes: [],
  taxDetail: null,
  loggedUser: {
    access_token: localStorage.access_token,
    _id: localStorage._id,
    name: localStorage.name,
    role: localStorage.role,
  },
};

function dataReducers(state = initialValue, action) {
  switch (action.type) {
    case "data/fetchUsers":
      return { ...state, users: action.payload };
    case "data/fetchUserDetail":
      return { ...state, userDetail: action.payload };
    case "data/clearUserDetail":
      return { ...state, userDetail: null };
    case "data/fetchTaxes":
      return { ...state, taxes: action.payload };
    case "data/fetchTaxDetail":
      return { ...state, taxDetail: action.payload };
    case "data/clearTaxDetail":
      return { ...state, taxDetail: null };
    case "user/login":
      return { ...state, loggedUser: action.payload };
    case "user/logout":
      return initialValue;
    default:
      return state;
  }
}

const middlewares = applyMiddleware(thunk);
let store = createStore(dataReducers, middlewares);

export default store;
