import * as actionTypes from "../actions/sportsCategoryAction";

const initialState = {
  sports_categories: [],
  sports_category: "",
  pages: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGORY_SPORTS: {
      return {
        ...state,
        sports_categories: action.data.data,
        pages: action.data.meta.total_pages,
      };
    }
    case actionTypes.GET_SPORTS_CATEGORY: {
      console.log(action);
      return {
        ...state,
        sports_category: action.data,
      };
    }
    case actionTypes.DELETE_USER: {
      const updatedArray = state.users.filter((el) => el.id !== action.data);
      return {
        ...state,
        users: updatedArray,
      };
    }
  }
  return state;
};

export default reducer;
