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
import { Row } from "react-bootstrap";
import { gettingSportsCategory, updatingSportsCategory } from "../../../redux/actions/sportsCategoryAction";
import ModifiedLoader from "../../../component/ReusableComponents/Loader/loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToggleNotification from "../../../component/ReusableComponents/Toggle Notifications/ToggleNotification";

const UpdateSportsCategory = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [sportsCategory, setSportsCategory] = useState({
    name: ''
  });

  useEffect(() => {
    getData();
  }, []);
  
  useEffect(() => {
    setSportsCategory({ ...sportsCategory, name: props.sports_category?.name });
  }, [props.sports_category]);

  const getData = async () => {
    setLoader(true);
    await props.sportsCategoryDetail(id);
    setLoader(false);
  };

  const submitHandler = async (values) => {
    console.log('in');
    let res = await props.sportsCategoryUpdate(id, values);
    console.log(res.response);
    if (res?.response?.status == 400) {
      ToggleNotification('Error', 'Sports Category not updated');
    }
    else {
      ToggleNotification('SportsCategoryUpdateSuccess');
      history.push('/sports-category');
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: sportsCategory,
    onSubmit: submitHandler,
    validationSchema: validationSchema,
    validateOnMount: true,
    enableReinitialize: true
  });

  const saveButtonRender = () => {
    return (
      <>
        <Button
          type="submit"
          color="primary"
        >
          Save Changes
        </Button>
        <Button type="button" color="danger" onClick={(e) => history.go(-1)}>
          Cancel
        </Button>
      </>
    );
  };
  console.log(formik);

  return (
    <>
      <Card>
        <CardHeader>
          <h3>Update Sports Category</h3>
        </CardHeader>
        {loader ? (
          <ModifiedLoader />
        ) : (
          <>
            <Form onSubmit={formik.handleSubmit}>
              <CardBody>
                <Row>
                  <FormGroup className="col-12 col-md-12">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={props.sports_category?.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="error">{formik.errors.name}</div>
                    ) : null}
                  </FormGroup>
                </Row>
              </CardBody>
              <CardFooter>{saveButtonRender()}</CardFooter>
            </Form>
          </>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    sports_category: state.sportsCategory.sports_category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sportsCategoryDetail: (id) => dispatch(gettingSportsCategory(id)),
    sportsCategoryUpdate: (id, data) => dispatch(updatingSportsCategory(id, data)),
    // changeStatus: (id, status) => dispatch(changingStatus(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSportsCategory);
