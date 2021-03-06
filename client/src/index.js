import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactDropzone from "react-dropzone";
import "./index.css";

import Editor from "./Components/editor";
import BottomBar from "./Components/bottombar";

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
      text: "",

      filters: ["checkLineCount", "checkFileSize", "checkContainsPassword", "runPythonLint", "checkLineLength"],

      currentFilter: "checkLineCount"
    };
    this.runFilter = this.runFilter.bind(this);
    this.onDrop = this.onDrop.bind(this);
  };

  async runFilter() {
    const route = `/runFileFilters/${this.state.current}`;
    const data = await fetch(route);
    const text = await data.text();
    console.log(text);
    this.setState({
      issueText: text,
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
      this.setState(prev => ({
        filenames: [...prev.filenames, files[0].name],
        current: files[0].name,
        text: event.target.result
      }));
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
