import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updatingUser, gettingUser, changingStatus } from "../../../redux/actions/userAction";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import { Image, Row } from "react-bootstrap";
import fileDownload from 'js-file-download';
import axios from "axios";
import Select from 'react-select';
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import * as functions from "../../../functions/function";

const UpdateUser = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [status, setStatus] = useState({
    approve_status: '',
    approve_note: ''
  });
  const [approveStatusError, setApproveStatusError] = useState('');
  const [approveNoteError, setApproveNoteError] = useState('');

  const options = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'HOLD', label: 'Hold' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' }
  ]

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setStatus({ ...status, 
      approve_status: props?.user?.approve_status,
      approve_note: props?.user.approve_note
    });
  }, [props.user]);

  const getData = async () => {
    setLoader(true);
    await props.userDetail(id);
    setLoader(false);
  };


  const saveButtonRender = () => {
    return (
      <>
        <Button
          type="button"
          color="primary"
          onClick={(e) => updateUserFunction()}
        >
          Save Changes
        </Button>
        <Button type="button" color="danger" onClick={(e) => history.go(-1)}>
          Cancel
        </Button>
      </>
    );
  };

  const validation = () => {
    setApproveStatusError("");
    setApproveNoteError("");
    let error = false;
    const statusValidation = functions.textValidation(
      status.approve_status,
      "Status"
    );
    if (statusValidation) {
      error = true;
      setApproveStatusError(statusValidation);
    }
    const noteValidation = functions.textValidation(status.approve_note, "Note");
    if (noteValidation && status.approve_status === 'HOLD') {
      error = true;
      setApproveNoteError(noteValidation);
    }
    return error;
  };

  const updateUserFunction = async () => {
    const validate = validation();
    let statusprops = {
      approve_status: status.approve_status
    };
    if (status.statuspropsapprove_status === 'PENDING') statusprops['approve_note'] = status.approve_note;
    if (!validate) {
      try {
        let response = await props.changeStatus(id, statusprops);
        ToggleNotification('StatusChangeSuccess');
        history.push(`/coach/${id}`)
      } catch (error) {
        ToggleNotification('Error', 'Status not updated');
      }
    };
  };

  const handleClick = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename);
      })
  };

  const statusHandler = async (value) => {
    setStatus({ ...status, approve_status: value.value })
  };
  console.log(status);

  return (
    <>
      <Card>
        <CardHeader>
          <h3>Update Coach</h3>
        </CardHeader>
        {loader ? (
          <ModifiedLoader />
        ) : (
          <>
            <Form>
              <CardBody>
                <Row>
                  <FormGroup className="col-6 col-md-6">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      disabled={true}
                      value={props.user?.firstName}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      disabled={true}
                      value={props.user?.lastName}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Email</Label>
                    <Input
                      type="text"
                      disabled={true}
                      value={props.user?.email}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Mobile</Label>
                    <Input
                      type="text"
                      disabled={true}
                      value={props.user?.mobileNumber}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Alternate Mobile Number</Label>
                    <Input
                      type="text"
                      disabled={true}
                      value={props.user?.alternative_mobile}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Strength</Label>
                    <Input
                      type="text"
                      disabled={true}
                      value={props.user?.Description_Strengths}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Coach Category</Label>
                    <Input
                      type="text"
                      disabled={true}
                      value={props.user?.coach_category}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Experience</Label>
                    <Input
                      type="text"
                      disabled={true}
                      value={props.user?.year_of_experience}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Status</Label>
                    <Select
                      options={options}
                      defaultValue={{ value: props?.user?.approve_status, label: props?.user?.approve_status && props?.user?.approve_status?.charAt(0).toUpperCase() + props?.user?.approve_status.slice(1).toLowerCase() }}
                      onChange={(e) => statusHandler(e)}
                    />
                  </FormGroup>
                  <FormGroup className="col-6 col-md-6">
                    {
                      (status.approve_status === 'HOLD' || status.approve_status === 'REJECTED') && <>
                        <Label>Note</Label>
                        <Input
                          type="text"
                          defaultValue={props.user?.approve_note}
                          onChange={(e) => setStatus({ ...status, approve_note: e.target.value })}
                        />
                        {
                          approveNoteError && <div className='error'>
                            {approveNoteError}
                          </div>
                        }
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
                      value={props.user?.coachLocation[0]?.completeAddress}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-3 col-md-3">
                    <Label> Covid Cerificate </Label>
                    <Image src={`http://localhost:3001/${props.user?.Upload_vaccination_certificate}`} alt="Covid Certificate" className="img" />
                    <Button className="btn btn-success mt-2" onClick={() => handleClick(`http://localhost:3001/${props.vaccine}`, 'sample.jpg')}>Download</Button>
                  </FormGroup>
                  <FormGroup className="col-9 col-md-9">
                    <Label> Certificates </Label> <br />

                    <div class="row">
                      {
                        props?.user?.upload_certificates?.length > 0 && props.user?.upload_certificates.map(item => {
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
            </Form>
            <CardFooter>{saveButtonRender()}</CardFooter>
          </>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetail: (id) => dispatch(gettingUser(id)),
    userUpdate: (id, data) => dispatch(updatingUser(id, data)),
    changeStatus: (id, status) => dispatch(changingStatus(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
