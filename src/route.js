import React from "react";

// const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() =>
  import("./component/Authentication/SignIn/SignIn1")
);
const ForgotPassword = React.lazy(() =>
  import("./component/Authentication/ForgotPassword/forgotPassword")
);

const route = [
  // { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
  { path: "/auth/signin", exact: true, name: "Signin", component: Signin1 },
  {
    path: "/auth/forgot-password",
    exact: true,
    name: "Forgot Password",
    component: ForgotPassword,
  },
];

export default route;
