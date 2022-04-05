import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.name(1, searchTerm);
  };

  return (
    <>
      {props.status !== 500 ? (
        <Form onSubmit={onSubmitHandler}>
          <FormGroup className="searchbar">
            <Input
              type="text"
              placeholder = { props && props.placeholder? props.placeholder : "Search By Name" }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" color="primary">
              Search
            </Button>
          </FormGroup>
        </Form>
      ) : null}
    </>
  );
};

export default SearchBar;
