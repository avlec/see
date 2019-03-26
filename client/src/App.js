import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import SideBar from "./Components/side.bar";
import InputArea from "./Components/input.area";
import BottomBar from "./Components/bottom.bar";
import "./App.css";

class App extends Component {
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
                  <InputArea />
                </Col>
              </Row>
              <Row>
                <Col>
                  <BottomBar />
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
