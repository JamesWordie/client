import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <li className="list-group-item d-flex align-items-start my-2" key={stream.id} >
          <i className="bi bi-camera-video align-self-center me-2"></i>
          <div className="ms-2 me-auto">
            <div className="fw-bold">{stream.title}</div>
            {stream.description}
          </div>
        </li>
      );
    })
  }

  render() {
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <h3 className="mb-3 text-center">Streams List</h3>
          <ul className="list-group shadow-sm p-3">
            {this.renderList()}
          </ul>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  // takes the values from the object and returns an array of the streams
  return { streams: Object.values(state.streams) };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
