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
        <Container>
          <Row>
            <Col>
              <SideBar />
            </Col>
            <Col>
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
        </Container>
      </div>
    );
  }
}

export default App;
