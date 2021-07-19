import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

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
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
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

export default GoogleAuth;
