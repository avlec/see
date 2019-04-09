import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Editor from "./components/editor";
import BottomBar from "./components/bottombar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "",
      issueText: "",
      filenames: []
    };
    this.runFilter = this.runFilter.bind(this);
  };

  async runFilter() {
    const route = `/runFileFilter/${this.state.current}/someFilter`;
    const data = await fetch(route);
    const text = data.json();
    this.setState({
      issueText: JSON.stringify(text, null, 2),
    });
  };

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
          Upload your files here
          <br/>
          {this.state.filenames.length > 0
            ? <ul>{this.state.filenames.map(name => <li>${name}</li>)}</ul>
            : "No files"
          }
        </section>
        <main>
          <Editor/>
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
