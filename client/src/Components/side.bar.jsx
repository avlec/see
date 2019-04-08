import React, { Component } from "react";
import ReactDropzone from "react-dropzone";

class SideBar extends Component {

  constructor(props, context) {
    super(props, context);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop = this.props.onDrop;

  render() {
    return (
      <ReactDropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </ReactDropzone>
    );
  }

}

export default SideBar;