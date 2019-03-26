import React, { Component } from "react";
import { Button } from "reactstrap";

class BottomBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>this is the bottom bar!!!
        <Button color="primary">Check Script</Button>{' '}
      </React.Fragment>
    );
  }
}

export default BottomBar;
