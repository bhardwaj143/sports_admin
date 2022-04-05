////////////////////////////////Constants///////////////////////////////////////////////////

export const loggingUser = "/admin/login";
export const forgetPasswordEmail = "/admin/forgot-password";
export const forgetPasswordOtp = "/admin/verify-otp";
export const resetForgetPassword = "/admin/reset-password";
export const changingPassword = "/admin_change_password";
export const addingUser = "/register";
export const gettingRecentUsers = "/admin/coachUsersList";
export const addingSportsCateory = "/admin/sports-category";

/////////////////////////////////Functions///////////////////////////////////////////////////

export const gettingAllUser = (page = 1, search = null) => {
  if (search !== null) {
    return `/admin/coachUsersList?page=${page * 1}&search=${search}`;
  } else {
    return `/admin/coachUsersList?page=${page}`;
  }
};

export const gettingAllSportsCategory = (page = 1, search = null, limit=10) => {
  if (search !== null) {
    return `admin/sports-category?page=${page * 1}&limit=${limit}&search=${search}`;
  } else {
    return `admin/sports-category?page=${page}&limit=${limit}`;
  }
};

export const gettingUser = (data) => {
  return `/admin/coachUsersList/${data}`;
};

export const gettingSportsCategory = (data) => {
  return `/admin/sports-category/${data}`;
};

export const changingStatus = (data) => {
  return `/admin/updateCoachStatus/${data}`;
};

export const updatingUser = (id) => {
  return `/updateuser/${id}`;
};

export const updatingSportsCategory = (id) => {
  return `/admin/sports-category/${id}`;
};

export const deletingUser = (id) => {
  return `/user/delete/${id}`;
};
