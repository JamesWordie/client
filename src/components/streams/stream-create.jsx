import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './stream-form';

class StreamCreate extends React.Component {
  // calls action creater of create stream to api server
  onSubmit = formValues => {
    this.props.createStream(formValues);
  }

  render() {
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h3 className="mb-3 text-center">Create a Stream</h3>
          <StreamForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
