import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import { Container, Row, Col } from "reactstrap";
import SideBar from "./Components/side.bar";
import InputArea from "./Components/input.area";
import BottomBar from "./Components/bottom.bar";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "test"
    }
  }

  onTextChange = (newText) => {
    this.setState({ text: newText });
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

  onDrop = async (files) => {
    let route = '/uploadFiles';
    console.log(files[0]);
    var data = new FormData();
    data.append('files', files[0]);

    const response = await fetch(route, {
      method: "POST",
      body: data,
    });
    console.log(response);

    var reader = new FileReader();
    reader.onload = function (event) {
      console.log(this.state.text);
      this.setState({ text: event.target.result });
      console.log(this.state.text);
    }.bind(this);

    reader.readAsText(files[0]);
  }

  render() {
    return (
      <div className="App" >
        <Container-fluid>
          <Row>
            <Col sm="2" xs="2" md="2">
              <SideBar
                onDrop={this.onDrop}
              />
            </Col>
            <Col sm="10" xs="10" md="10">
              <Row>
                <Col>
                  <InputArea
                    onChange={this.onTextChange}
                    textVal={this.state.text}
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
      </div >
    );
  }
}

export default App;
