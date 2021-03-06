import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  // only called if component gets rendered
  componentDidUpdate() {
    this.buildPlayer();
  }

  // function to build video player
  buildPlayer() {
    // if no stream or if player already om screen
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  componentWillUnmount() {
    // stop the stream and unmount the component, stops it trying to download the video
    this.player.destroy();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream;

    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <video
            ref={this.videoRef}
            style={{ width: '100%' }}
            controls
          />
          <h1 className="mb-3 text-left">{title}</h1>
          <h5 className="mb-3 text-left">{description}</h5>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
