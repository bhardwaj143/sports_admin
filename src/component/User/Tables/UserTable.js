import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import ModifiedTable from "../../ReusableComponents/Table/Table";
import Paging from "../../ReusableComponents/Pagination/Paging";
import { connect } from "react-redux";
import SearchBar from "../../ReusableComponents/SearchBar/SearchBar";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ToggleButton from "../../ReusableComponents/ToggleButton/ToggleButton";
import TableAction from "../../ReusableComponents/Actions/TableAction";
import DeleteModal from "../../ReusableComponents/CustomModal/DeleteModal/DeleteModal";
import ModalSpinner from "../../ReusableComponents/Loader/ModalSpinner/ModalSpinner";
import "./table.css";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";

import {
  changingStatus,
  deletingUser,
  gettingAllUser,
} from "../../../redux/actions/userAction";

const User = (props) => {
  const history = useHistory();
  const { search } = useParams();
  const [nameSearch, setNameSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    if (search) {
      window.location.href = "/users";
    }
    const res = await props.getAllUser(currentPage, null);
    setErrorModal(res);
    setLoading(false);
  };

  const searchName = async (pageNumber = currentPage, name) => {
    setNameSearch(name);
    setLoading(true);
    const res = await props.getAllUser(pageNumber, name);
    setErrorModal(res);
    setLoading(false);
  };

  const searchPage = async (number) => {
    setCurrentPage(number);
    setLoading(true);
    const res = await props.getAllUser(number, nameSearch);
    setErrorModal(res);
    setLoading(false);
  };

  const userDelete = async () => {
    modalOpenHandler();
    setLoader(true);
    const res = await props.deleteUser(deleteId);
    if (res === 200) {
      ToggleNotification("DeleteUserSuccess");
      setLoader(false);
      setTimeout(() => {
        window.location.href = "/users";
      }, 1000);
      // history.push("/users/1");
    } else {
      setLoader(false);
      ToggleNotification("ServerError");
    }
  };

  const modalOpenHandler = (id) => {
    setModalOpen(!modalOpen);
    setDeleteId(id);
  };

  const updatedDate = (data) => {
    if (data) {
      const str = data.split("T");
      const time = str[1].split(".");
      return time[0] + " " + str[0];
    } else {
      return null;
    }
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

  const tableData = [{ name: "view" }, { name: "update" }];

  const toggleButtonHandler = async (id, status) => {
    const res = await props.changeStatus(id, !status);
    return res;
  };

  console.log(props.userList);
  return (
    <>
      {/* <LogCheck status={errorModal}> */}
      <DeleteModal
        status={modalOpen}
        name="user"
        deleteHandler={userDelete}
        closeModal={modalOpenHandler}
      />
      {loader ? <ModalSpinner data={loader} /> : null}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Coach Data</Card.Title>
              {/* <Button
                type="button"
                color="primary"
                className="float-right"
                onClick={(e) => history.push("/add-user")}
              >
                Add
              </Button> */}
              <SearchBar type="user" name={searchName} status={errorModal} />
            </Card.Header>
            <Card.Body>
              {loading ? (
                <ModifiedLoader />
              ) : (
                <ModifiedTable status={errorModal} data={data}>
                  {props.userList &&
                    props.userList.map((item, index) => {
                      return (
                        <tr
                          key={item.id}
                          // onClick={(e) => history.push(`/user/${item.id}`)}
                        >
                          <td>{currentPage * 10 - 10 + (index + 1)}</td>
                          <td>{item.fullName}</td>
                          <td >{item.year_of_experience}</td>
                          <td className="text-center">{item.coach_category}</td>
                          <td className="text-center">{item.mobileNumber}</td>
                          <td className="text-center">
                            {/* <ToggleButton
                              name="user"
                              changeToggle={() =>
                                toggleButtonHandler(item._id, item.isVerified)
                              }
                              id={item._id}
                              status={item.isVerified ? item.isVerified : null}
                            /> */}
                            {item.approve_status}
                          </td>
                          <td>
                            <TableAction
                              data={tableData}
                              updateURL={`/update-coach/${item._id}`}
                              viewURL={`/coach/${item._id}`}
                              deleteHandler={() => modalOpenHandler(item._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </ModifiedTable>
              )}
              <Paging
                status={errorModal}
                page={currentPage}
                type="user"
                searchPage={searchPage}
                totalCount={props.totalPage ? props.totalPage : null}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* </LogCheck> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.users,
    totalPage: state.users.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: (page, search) => dispatch(gettingAllUser(page, search)),
    deleteUser: (id) => dispatch(deletingUser(id)),
    changeStatus: (id, status) => dispatch(changingStatus(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
