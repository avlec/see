import React, { Component } from "react";
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';


class InputArea extends Component {

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  onChange = this.props.onChange;

  render() {
    return (
      <React.Fragment>
        <AceEditor
          mode="python"
          width="100%"
          theme="monokai"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
            $blockScrolling: true
          }}
        />
      </React.Fragment>
    );
  }
}

export default InputArea;
