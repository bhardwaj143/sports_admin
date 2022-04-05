import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardHeader } from "reactstrap";
import { gettingUser } from "../../../redux/actions/userAction";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ShowUser from "../showUser/ShowUser";
import ServerError from "../../ReusableComponents/ErrorPage/ServerError/ServerError";
import NoDataError from "../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
import useQuery from "../../ReusableComponents/customHooks/queryHook";
import { useParams } from "react-router-dom";

const User = (props) => {
  const { id } = useParams();
  const query = useQuery();
  // const id = query.get("id") || "";
  const [pageLoader, setPageLoader] = useState(true);
  const [errorCode, setErrorCode] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setPageLoader(true);
    const res = await props.getUser(id);
    if (res === 404) {
      setErrorCode(res);
    } else if (res === 500) {
      setErrorCode(res);
    }
    setPageLoader(false);
  };

  console.log(props.user);

  return (
    <>
      <Card>
        <CardHeader>
          <h3>Coach Details</h3>
        </CardHeader>
        {pageLoader ? (
          <ModifiedLoader />
        ) : errorCode === 500 ? (
          <ServerError />
        ) : errorCode === 404 ? (
          <NoDataError />
        ) : (
          <ShowUser
            fName={props.user?.firstName ? props.user.firstName : null}
            lName={props.user?.lastName ? props.user.lastName : null}
            email={props.user?.email ? props.user.email : null}
            mobile={props.user?.mobileNumber ? props.user.mobileNumber : null}
            alt_mobile={props.user?.alternative_mobile ? props.user.alternative_mobile : null}
            strength={props.user?.Description_Strengths ? props.user.Description_Strengths : null}
            coach_category={props.user?.coach_category ? props.user.coach_category : null}
            status={props.user?.mobileNumber ? props.user.mobileNumber : null}
            experience={props.user?.year_of_experience ? props.user.year_of_experience : null}
            id={id}
            address={props.user?.coachLocation[0]?.completeAddress ? props.user?.coachLocation[0]?.completeAddress : null}
            vaccine = {props.user?.Upload_vaccination_certificate ? props.user?.Upload_vaccination_certificate : null}
            upload_certificates={props.user?.upload_certificates ? props.user?.upload_certificates : null}
            approve_status={props.user?.approve_status ? props.user?.approve_status : null}
            approve_note={props.user?.approve_note ? props.user?.approve_note : null}
          />
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (data) => dispatch(gettingUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
