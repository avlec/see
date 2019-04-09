import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactDropzone from "react-dropzone";
import "./index.css";

import Editor from "./components/editor";
import BottomBar from "./components/bottombar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Current file name
      current: "",
      // Text for bottom bar
      issueText: "",
      // Sidebar items
      filenames: [],
      // Content of the editor
      text: ""
    };
    this.runFilter = this.runFilter.bind(this);
    this.onDrop = this.onDrop.bind(this);
  };

  async runFilter() {
    const route = `/runFileFilter/${this.state.current}/someFilter`;
    const data = await fetch(route);
    const text = data.json();
    this.setState({
      issueText: JSON.stringify(text, null, 2),
    });
  }

  async onDrop(files) {
    let route = '/uploadFiles';
    const data = new FormData();
    data.append('files', files[0]);

    const response = await fetch(route, {
      method: "POST",
      body: data,
    });
    console.log(response);

    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(this.state.text);
      this.setState({ text: event.target.result });
      console.log(this.state.text);
    };

    reader.readAsText(files[0]);
  }

  render() {
    const { current } = this.state;
    return (
      <div className='wrapper'>
        <header>
          <strong>SEE</strong>
          <em>Simplified Execution Environment</em>
          {current &&
            <h2 style={{ float: 'right', margin: 0 }}>
              {current}
            </h2>
          }
        </header>
        <section id='sidebar'>
          <ReactDropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload your files here</p>
                {this.state.filenames.length > 0
                  ? <ul>{this.state.filenames.map(name =>
                      <li>${name}</li>
                    )}</ul>
                  : "No files"
                }
              </div>
            </section>
          )}
          </ReactDropzone>
        </section>
        <main>
          <Editor
            onChange={(newText) => this.setState({ text: newText || "" })}
            textVal={this.state.text}
          />
          <BottomBar
            onClickFunction={this.runFilter}
            text={this.state.issueText}
          />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
