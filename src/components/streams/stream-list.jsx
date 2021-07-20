import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  // if current user is the creater of the stream they can edit or delete
  renderAdminButtons(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="btn-group align-self-center">
          <button className="btn btn-outline-info">Edit</button>
          <button className="btn btn-outline-danger">Delete</button>
        </div>
      );
    }
  }

  // fucntion to display the streams, mapping over each one
  renderList() {
    return this.props.streams.map(stream => {
      return (
        <li className="list-group-item d-flex align-items-start my-2" key={stream.id} >
          <i className="bi bi-camera-video align-self-center me-2"></i>
          <div className="ms-2 me-auto">
            <div className="fw-bold">{stream.title}</div>
            {stream.description}
          </div>
          {this.renderAdminButtons(stream)}
        </li>
      );
    })
  }

  // if user is signed in, they can naviagte to create a stream
  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div className="d-flex justify-content-end">
          <Link to="/streams/new" className="btn btn-outline-success my-5">Create A Stream</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <h3 className="mb-3 text-center">Streams List</h3>
          <ul className="list-group shadow-sm p-3">
            {this.renderList()}
          </ul>
          {this.renderCreateButton()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  // takes the values from the object and returns an array of the streams
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
