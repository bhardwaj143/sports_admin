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

const SportsCategoryDetail = (props) => {
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

  const saveButtonRender = () => {
    return (
      <>
        <Button
          type="submit"
          color="primary"
          onClick={() => history.push(`/update-sports-category/${id}`)}
        >
          Edit
        </Button>
        <Button type="button" color="danger" onClick={(e) => history.go(-1)}>
          Back
        </Button>
      </>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h3>Sports Category Details</h3>
        </CardHeader>
        {loader ? (
          <ModifiedLoader />
        ) : (
          <>
            <Form>
              <CardBody>
                <Row>
                  <FormGroup className="col-12 col-md-12">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={props.sports_category?.name}
                      disabled={true}
                    />
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
  return {
    sports_category: state.sportsCategory.sports_category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sportsCategoryDetail: (id) => dispatch(gettingSportsCategory(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SportsCategoryDetail);
