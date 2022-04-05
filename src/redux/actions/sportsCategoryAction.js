import axios from "../../instance";
import * as url from "../../constants/urlConstants";

export const ADD_CATEGORY_SPORTS = "ADD_CATEGORY_SPORTS";
export const GET_ALL_CATEGORY_SPORTS = "GET_ALL_CATEGORY_SPORTS";
export const GET_SPORTS_CATEGORY = "GET_SPORTS_CATEGORY";
export const DELETE_USER = "DELETE_USER";

export const addingSportsCateory = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(url.addingSportsCateory, data);
      return 200;
    } catch (error) {
      return error;
    }
  };
};

export const getSportsCategory= (data) => {
  return {
    type: GET_SPORTS_CATEGORY,
    data: data,
  };
};

export const gettingSportsCategory = (data) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingSportsCategory(data));
    console.log(res);
    if (res && res.status && res.status === 200) {
      dispatch(getSportsCategory(res.data.data));
    } else if (res && res.error === true && res.message === "No user id") {
      return 404;
    } else {
      return 500;
    }
  };
};

export const getAllSportsCategory = (data) => {
  console.log(data);
  return {
    type: GET_ALL_CATEGORY_SPORTS,
    data: data,
  };
};

export const gettingAllSportsCategory = (page, search) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingAllSportsCategory(page, search));
    console.log(res.data);
    if (res.error === true) {
      return res;
    } else if (res && res.status && res.status === 500) {
      return 500;
    } else if (
      res.data &&
      res.data.data &&
      res.data.data.length === 0
    ) {
      dispatch(getAllSportsCategory(res.data));
      return 404;
    } else {
      dispatch(getAllSportsCategory(res.data));
      return 200;
    }
  };
};

export const updatingSportsCategory = (id, data) => {
  return async (dispatch) => {
    try {
      await axios.patch(url.updatingSportsCategory(id), data);
      return 200;
    } catch (error) {
      return error;
    }
  };
};

export const changingStatus = (id, status) => {
  return async (dispatch) => {
    const res = await axios.put(url.changingStatus(id), status);
    if (res && res.status === 200) {
      return 200;
    } else if (res && res.status === 500) {
      return 500;
    }
  };
};
