import React, { Component } from "react";
import { Button } from "reactstrap";

class BottomBar extends Component {

  checkText = this.props.checkText;

  render() {
    return (
      <React.Fragment>this is the bottom bar!!!
        <Button color="primary" onClick={this.checkText}>Check Script</Button>{' '}
      </React.Fragment>
    );
  }
}

export default BottomBar;
