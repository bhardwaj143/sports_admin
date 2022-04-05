import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Form,
  FormGroup,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import { addingSportsCateory } from "../../../redux/actions/sportsCategoryAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToggleNotification from "../../../component/ReusableComponents/Toggle Notifications/ToggleNotification";

const AddSportsCategory = (props) => {
  const history = useHistory();
  const [loader] = useState(false);
  const [sportsCategory] = useState({
    name: ''
  });

  const submitHandler = async (values) => {
    let res = await props.addSportsCategory(values);
    console.log(res.response);
    if (res?.response?.status == 400) {
      ToggleNotification('Error', 'Sports Category not added');
    }
    else {
      ToggleNotification('SportsCategoryAddSuccess');
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
  });

  return (
    <>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <h3>Add Sports Category</h3>
        </CardHeader>
        <Form onSubmit={formik.handleSubmit}>
          <CardBody>
            <FormGroup>
              <Input
                type="text"
                placeholder="Name"
                disabled={loader}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary" disabled={loader}>
              {loader ? <Spinner /> : "Add"}
            </Button>
            {!loader && (
              <Button
                type="button"
                color="danger"
                onClick={(e) => history.go(-1)}
              >
                Back
              </Button>
            )}
          </CardFooter>
        </Form>
      </Card>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSportsCategory: (data) => dispatch(addingSportsCateory(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddSportsCategory);
