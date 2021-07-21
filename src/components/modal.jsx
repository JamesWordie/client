import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const Modal = props => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 'auto',
    width: 'fit-content',
    height: 'fit-content',
    position: 'relative'
  };

  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={() => history.push('/')}>
      <div className="ui standard modal visible active" style={style} onClick={(event) => event.stopPropagation()}>
        <div className="header">Delete Stream</div>
        <div className="content">
          Are you sure you want to delete?
        </div>
        <div className="actions">
          <button className="ui button">Cancel</button>
          <button className="ui primary button">Delete</button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default Modal;

// bootstrap version
    // <div className="modal show" id="staticBackdrop" data-shown-bs-modal='true' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    //   <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title">Hello</h5>
    //       </div>
    //       <div className="modal-body">
    //         <p>Hello</p>
    //       </div>
    //       <div className="modal-footer">
    //         <button className="btn btn-outline-primary">Yes</button>
    //         <button className="btn btn-outline-danger">No</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>,
