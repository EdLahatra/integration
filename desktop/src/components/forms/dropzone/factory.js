import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

export default class DropzoneComponent extends React.Component {
  constructor(props) {
    super(props);

    this.addFile = this.addFile.bind(this);
  }

  addFile = (acceptedFiles)  => {
    console.log(acceptedFiles.length);
  }

  render() {
    return (
      <Dropzone onDrop={() => this.addFile} className="add-file">
        Add File
      </Dropzone>
    );
  }
}

DropzoneComponent.propTypes = {
  addFile: PropTypes.func,
};
