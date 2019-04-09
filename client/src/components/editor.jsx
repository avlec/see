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
        theme="monokai"
        value="HeyHeyHello:)"
        editorProps={{
          $blockScrolling: true
        }}
      />
    );
  }
}

export default Editor;
