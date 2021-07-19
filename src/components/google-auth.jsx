import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // async function hence callback via arrow function, takes time to load
    window.gapi.load('client:auth2', () => {
      // async function for init, takes time to load, callback, returns a promise
      window.gapi.client.init({
        clientId: '1029777883888-qsln83rq98vb9v32bn3u7801p0j0njq5.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // at this point once gapi fully loaded, can check for auth
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn()
    } else {
      this.props.signOut();
    };
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="btn btn-sm btn-danger">
          <i className="bi bi-google me-2"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="btn btn-sm btn-danger">
          <i className="bi bi-google me-2"></i>
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return (
      <div className='mx-2'>
        {this.renderAuthButton()}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
