import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import SideBar from "./Components/side.bar";
import InputArea from "./Components/input.area";
import BottomBar from "./Components/bottom.bar";
import "./App.css";

class App extends Component {

  state = { text: "" };

  onTextChange = (newText) => {
    this.state.text = newText;
    //console.log(this.state.text);
  }

  checkText = async () => {
    console.log("checking text...\n");
    console.log(this.state.text);
    let route = '/runFileFilter/test/test';
    const response = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <Container-fluid>
          <Row>
            <Col sm="2" xs="2" md="2">
              <SideBar />
            </Col>
            <Col sm="10" xs="10" md="10">
              <Row>
                <Col>
                  <InputArea
                    onChange={this.onTextChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <BottomBar
                    checkText={this.checkText}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container-fluid>
      </div>
    );
  }
}

export default App;
