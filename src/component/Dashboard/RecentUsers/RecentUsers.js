import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { gettingRecentUsers } from "../../../redux/actions/userAction";
import RecentUsersList from "./RecentUsersTable/RecentUsersTable";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ModifiedTable from "../../ReusableComponents/Table/Table";

const RecentUsers = (props) => {
  const [loader, setLoader] = useState(true);
  const [response, setResponse] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);
    const res = await props.recentUsers();
    setResponse(res);
    setLoader(false);
  };

  const data = [
    { name: "" },
    { name: "Name" },
    { name: "Experience" },
    { name: "Coach Category", style: "center" },
    { name: "Mobile Number", style: "center" },
    { name: "Verification Status", style: "center" },
    { name: "Action", style: "center" },
  ];

  const renderList = props.recentUsersList.map((el, index) => {
    return (
      <RecentUsersList
        key={index}
        name={el.fullName ? el.fullName : null}
        coach_category={el.coach_category ? el.coach_category : null}
        experience={el.year_of_experience ? el.year_of_experience : null}
        mobileNumber={el.mobileNumber ? el.mobileNumber : null}
        isVerified={el.isVerified ? el.isVerified : null}
        id={el._id}
        status={el.approve_status? el.approve_status : null}
      />
    );
  });

  return (
    <>
      {loader ? (
        <ModifiedLoader />
      ) : (
        <ModifiedTable data={data} status={response}>
          {renderList}
        </ModifiedTable>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    recentUsersList: state.users.recent_users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recentUsers: () => dispatch(gettingRecentUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentUsers);
