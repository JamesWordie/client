import React from 'react';
import Modal from '../modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      // can use React.Fragment which is equal to <> with closing tag
      <>
        <button onClick={() => this.props.deleteStream(id)} className="ui negative button">Delete</button>
        <Link to='/' className="ui primary button">Cancel</Link>
      </>
    )
  }

  // function to display the content to the modal, incase of loading display text else title
  rednerContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?"
    }

    return `Are you sure you want to delete the stream: ${this.props.stream.title}?`
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.rednerContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
