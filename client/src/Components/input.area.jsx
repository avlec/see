import React, { Component } from "react";
import { Row, Col, Label, Input, Form, FormGroup } from "reactstrap";

class InputArea extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
            />
          </FormGroup>
        </Form>
      </React.Fragment>
    );
  }
}

export default InputArea;
