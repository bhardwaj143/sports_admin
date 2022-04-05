import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./table.css";

import {
  changingStatus,
  deletingUser,
} from "../../../redux/actions/userAction";
import { gettingAllSportsCategory, updatingSportsCategory } from "../../../redux/actions/sportsCategoryAction";
import ToggleNotification from "../../../component/ReusableComponents/Toggle Notifications/ToggleNotification";
import DeleteModal from "../../../component/ReusableComponents/CustomModal/DeleteModal/DeleteModal";
import ModalSpinner from "../../../component/ReusableComponents/Loader/ModalSpinner/ModalSpinner";
import SearchBar from "../../../component/ReusableComponents/SearchBar/SearchBar";
import ModifiedLoader from "../../../component/ReusableComponents/Loader/loader";
import ModifiedTable from "../../../component/ReusableComponents/Table/Table";
import Paging from "../../../component/ReusableComponents/Pagination/Paging";
import TableAction from "../../../component/ReusableComponents/Actions/TableAction";

const SportsCategory = (props) => {
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
      window.location.href = "/sports-category";
    }
    const res = await props.getAllSportsCategroy(currentPage, null);
    setErrorModal(res);
    setLoading(false);
  };

  const searchName = async (pageNumber = currentPage, name) => {
    setNameSearch(name);
    setCurrentPage(pageNumber);
    setLoading(true);
    const res = await props.getAllSportsCategroy(pageNumber, name);
    setErrorModal(res);
    setLoading(false);
  };

  const searchPage = async (number) => {
    setLoading(true);
    const res = await props.getAllSportsCategroy(number, nameSearch);
    setErrorModal(res);
    setLoading(false);
  };

  const sportsCategoryDelete = async () => {
    modalOpenHandler();
    setLoader(true);
    let sportsCategoryProps = {
      isDeleted: true
    }
    const res = await props.deleteSportsCategory(deleteId, sportsCategoryProps);
    if (res === 200) {
      ToggleNotification("DeleteSportsCategorySuccess");
      setLoader(false);
      setTimeout(() => {
        window.location.href = "/sports-category";
      }, 1000);
    } else {
      setLoader(false);
      ToggleNotification("ServerError");
    }
  };

  const modalOpenHandler = (id) => {
    setModalOpen(!modalOpen);
    setDeleteId(id);
  };

  const data = [
    { name: "S. No" },
    { name: "Name" },
    { name: "Action", style: "center" },
  ];

  const tableData = [{ name: "view" }, { name: "update" }, { name: "delete" }];

  return (
    <>
      <DeleteModal
        status={modalOpen}
        name="Sports Category"
        deleteHandler={sportsCategoryDelete}
        closeModal={modalOpenHandler}
      />
      {loader ? <ModalSpinner data={loader} /> : null}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Sports Category Data</Card.Title>
              <Button
                type="button"
                color="primary"
                className="float-right"
                onClick={(e) => history.push("/add-sports-category")}
              >
                Add
              </Button>
              <SearchBar type="user" name={searchName} status={errorModal} />
            </Card.Header>
            <Card.Body>
              {loading ? (
                <ModifiedLoader />
              ) : (
                <ModifiedTable status={errorModal} data={data}>
                  {props.sportsCategory &&
                    props.sportsCategory.map((item, index) => {
                      return (
                        <tr
                          key={item.id}
                          // onClick={(e) => history.push(`/user/${item.id}`)}
                        >
                          <td>{currentPage * 10 - 10 + (index + 1)}</td>
                          <td>{item.name}</td>
                          <td>
                            <TableAction
                              data={tableData}
                              updateURL={`/update-sports-category/${item._id}`}
                              viewURL={`/sports-category/${item._id}`}
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    sportsCategory: state.sportsCategory.sports_categories,
    totalPage: state.sportsCategory.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSportsCategroy: (page, search) => dispatch(gettingAllSportsCategory(page, search)),
    deleteSportsCategory: (id, data) => dispatch(updatingSportsCategory(id, data)),
    changeStatus: (id, status) => dispatch(changingStatus(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SportsCategory);
