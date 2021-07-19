import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // async function hence callback via arrow function, takes time to load
    window.gapi.load('client:auth2', () => {
      // async function for init, takes time to load, callback, returns a promise
      window.gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email'
      }).then(() => {
        // at this point once gapi fully loaded, can check for auth
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // handles the user signing in and out via the action controller, pass id for later use for authorisation
  onAuthChange = (isSignedIn) => {
    const id = this.auth.currentUser.get().getId();
    if (isSignedIn) {
      this.props.signIn(id)
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

  // function to render the correct text within the button for signing in or out
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
