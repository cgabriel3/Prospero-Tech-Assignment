import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const initialValue = {
  users: [],
  userDetail: null,
  taxes: [],
  loggedUser: {
    access_token: localStorage.access_token,
    _id: localStorage._id,
    name: localStorage.name,
  },
};

function dataReducers(state = initialValue, action) {
  switch (action.type) {
    case "data/fetchUsers":
      return { ...state, users: action.payload };
    case "data/fetchUserDetail":
      return { ...state, userDetail: action.payload };
    case "data/clearUserDetail":
      return { ...state, karyawanDetail: null };
    case "data/fetchTaxes":
      return { ...state, taxes: action.payload };
    case "user/login":
      return { ...state, loggedUser: action.payload };
    case "user/logout":
      return { ...state, loggedUser: null };
    default:
      return state;
  }
}

const middlewares = applyMiddleware(thunk);
let store = createStore(dataReducers, middlewares);

export default store;
