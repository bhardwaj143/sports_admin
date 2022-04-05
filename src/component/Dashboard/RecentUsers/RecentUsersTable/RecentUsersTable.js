import React from "react";
import One from "./img/profile.png";
import TableAction from "../../../ReusableComponents/Actions/TableAction";
import ToggleButton from "../../../ReusableComponents/ToggleButton/ToggleButton";
import { connect } from "react-redux";
import { changingStatus } from "../../../../redux/actions/userAction";

const RecentUsersList = (props) => {
  const tableAction = [{ name: 'view' }, { name: "update" }];

  const toggleButtonHandler = async (id, status) => {
    const res = await props.changeStatus(id, !status);
    return res;
  };

  console.log(props);
  return (
    <>
      <tr className="unread">
        <td>
          <img
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
            src={One}
            alt="activity-user"
          />
        </td>
        <td>
          <h6 className="mb-1">{props.name}</h6>
        </td>
        <td>
          <h6 className="mb-1">{props.experience}</h6>
        </td>
        <td style={{ textAlign: "center" }}>
          <h6 className="mb-1">{props.coach_category}</h6>
        </td>
        <td style={{ textAlign: "center" }}>
          <h6 className="mb-1">{props.mobileNumber}</h6>
        </td>
        <td style={{ textAlign: "center" }}>
          <h6 className="mb-1">
            {
              props.status
            }
            {/* <ToggleButton
              name="user"
              changeToggle={() =>
                toggleButtonHandler(props.id, props.isVerified)
              }
              id={props.id}
              status={props.isVerified ? props.isVerified : null}
            /> */}
          </h6>
        </td>
        <td>
          <TableAction
            data={tableAction}
            updateURL={`/update-coach/${props.id}`}
            viewURL={`/coach/${props.id}`}
          />
        </td>
      </tr>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: (id, status) => dispatch(changingStatus(id, status)),
  };
};

export default connect(null, mapDispatchToProps)(RecentUsersList);
