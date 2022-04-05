import React, { useState } from "react";
import {
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deletingUser } from "../../../redux/actions/userAction";
import ModalSpinner from "../../ReusableComponents/Loader/ModalSpinner/ModalSpinner";
import DeleteModal from "../../ReusableComponents/CustomModal/DeleteModal/DeleteModal";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import { Image } from "react-bootstrap";
import fileDownload from 'js-file-download';
import axios from "axios";

const ShowUser = (props) => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const userDelete = async () => {
    setLoader(true);
    const res = await props.deleteUser(props.id);
    if (res === 200) {
      // window.location.href = "/users/1";
      ToggleNotification("DeleteUserSuccess");
      history.push("/users/1");
    } else {
      ToggleNotification("DeleteUserFail");
      setLoader(false);
    }
  };

  const ModalOpenHandler = () => {
    setModalOpen(!modalOpen);
  };

  const updateButtonRender = () => {
    return (
      <>
        <Button
          type="button"
          color="primary"
          onClick={(e) => history.push(`/update-coach/${props.id}`)}
        >
          Update
        </Button>
        <Button
          type="button"
          color="danger"
          onClick={(e) => history.push("/coach")}
        >
          Back
        </Button>
        {/* <Button
          type="button"
          color="danger"
          className="float-right"
          onClick={(e) => setModalOpen(true)}
        >
          Delete
        </Button> */}
      </>
    );
  };

  const handleClick = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename);
      })
  };

  return (
    <>
      <DeleteModal
        status={modalOpen}
        name="user"
        deleteHandler={userDelete}
        closeModal={ModalOpenHandler}
      />
      {loader ? <ModalSpinner data={loader} /> : null}
      <Form>
        <CardBody>
          <Row>
            <FormGroup className="col-6 col-md-6">
              <Label>First Name</Label>
              <Input
                type="text"
                disabled={true}
                value={props.fName}
              />
            </FormGroup>
            <FormGroup className="col-6 col-md-6">
              <Label>Last Name</Label>
              <Input
                type="text"
                disabled={true}
                value={props.lName}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-6 col-md-6">
              <Label>Email</Label>
              <Input
                type="text"
                disabled={true}
                value={props.email}
              />
            </FormGroup>
            <FormGroup className="col-6 col-md-6">
              <Label>Mobile</Label>
              <Input
                type="text"
                disabled={true}
                value={props.mobile}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-6 col-md-6">
              <Label>Alternate Mobile Number</Label>
              <Input
                type="text"
                disabled={true}
                value={props.alt_mobile}
              />
            </FormGroup>
            <FormGroup className="col-6 col-md-6">
              <Label>Strength</Label>
              <Input
                type="text"
                disabled={true}
                value={props.strength}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-6 col-md-6">
              <Label>Coach Category</Label>
              <Input
                type="text"
                disabled={true}
                value={props.coach_category}
              />
            </FormGroup>
            <FormGroup className="col-6 col-md-6">
              <Label>Experience</Label>
              <Input
                type="text"
                disabled={true}
                value={props.experience}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-6 col-md-6">
              <Label>Status</Label>
              <Input
                type="text"
                disabled={true}
                value={props?.approve_status}
              />
            </FormGroup>
            <FormGroup className="col-6 col-md-6">
              {
                (props.approve_status === 'HOLD' || props.approve_status === 'REJECTED') && <>
                  <Label>Note</Label>
                  <Input
                    type="text"
                    disabled={true}
                    value={props?.approve_note}
                  />
                </>
              }
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-12 col-md-12">
              <Label>Address</Label>
              <Input
                type="textarea"
                row="2"
                disabled={true}
                value={props.address}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-3 col-md-3">
              <Label> Covid Cerificate </Label>
              <Image src={`http://localhost:3001/${props.vaccine}`} alt="Covid Certificate" className="img" />
              <Button className="btn btn-success mt-2" onClick={() => handleClick(`http://localhost:3001/${props.vaccine}`, 'sample.jpg')}>Download</Button>
            </FormGroup>
            <FormGroup className="col-9 col-md-9">
              <Label> Certificates </Label> <br />

              <div class="row">
                {
                  props?.upload_certificates?.length > 0 && props.upload_certificates.map(item => {
                    return (
                      <div class="col-4">
                        <div class="card">
                          <Image src={`http://localhost:3001/${item}`} style={{ width: '100%' }} alt="Certificates" className="img" />
                          <div class="card-body">
                            <a href="#" class="btn btn-success">Download</a>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </FormGroup>
          </Row>
        </CardBody>
        <CardFooter>{updateButtonRender()}</CardFooter>
      </Form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deletingUser(id)),
  };
};

export default connect(null, mapDispatchToProps)(ShowUser);
