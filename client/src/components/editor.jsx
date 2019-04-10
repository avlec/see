import React, { Component } from "react";
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

class Editor extends Component {
  render() {
    return (
      <AceEditor
        name="editor"
        mode="python"
        width="100%"
        value={this.props.textVal}
        onChange={this.props.onChange}
        theme="monokai"
        editorProps={{
          $blockScrolling: true
        }}
      />
    );
  }
}

export default Editor;
