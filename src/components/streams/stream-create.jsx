import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderInput = ({ input, label, meta }) => {
    return (
      <div className="">
        <label className='form-label my-3'>{label}</label>
        <input className='form-control mb-1' {...input} />
        {this.renderError(meta)}
      </div>
    );
      // <input
      //   onChange={formProps.input.onChange}
      //   value={formProps.input.value}
      // />
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="alert alert-danger" role="alert">
          <p className="text-muted my-0">{error}</p>
        </div>
      );
    }
  }

  // calls action creater of create stream to api server
  onSubmit = formValues => {
    // returns an object of the form values we need
    // event.preventDefault(); handled by redux form
    this.props.createStream(formValues);
  }

  render() {
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h3 className="mb-3 text-center">Create a Stream</h3>
          <form className="p-4 shadow-sm" onSubmit={this.props.handleSubmit(this.onSubmit)} >
            <Field name="title" component={this.renderInput} label='Enter Title' />
            <Field name="description" component={this.renderInput} label='Enter Description' />
            <button className="btn btn-outline-success mt-3">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title.'
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description.'
  }

  return errors;
};

const formWrapped =  reduxForm({
  form: 'Stream Create',
  validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
