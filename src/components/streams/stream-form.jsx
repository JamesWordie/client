// import React from 'react';
// import { Field, reduxForm } from 'redux-form';

// class StreamForm extends React.Component {
//   renderInput = ({ input, label, meta }) => {
//     return (
//       <div className="">
//         <label className='form-label my-3'>{label}</label>
//         <input className='form-control mb-1' {...input} />
//         {this.renderError(meta)}
//       </div>
//     );
//       // <input
//       //   onChange={formProps.input.onChange}
//       //   value={formProps.input.value}
//       // />
//   }

//   renderError({ error, touched }) {
//     if (touched && error) {
//       return (
//         <div className="alert alert-danger" role="alert">
//           <p className="text-muted my-0">{error}</p>
//         </div>
//       );
//     }
//   }

//   // calls action creater of create stream to api server
//   onSubmit = formValues => {
//     // returns an object of the form values we need
//     // event.preventDefault(); handled by redux form
//     this.props.onSubmit(formValues);
//   }

//   render() {
//     return (
//       <form className="p-4 shadow-sm" onSubmit={this.props.handleSubmit(this.onSubmit)} >
//         <Field name="title" component={this.renderInput} label='Enter Title' />
//         <Field name="description" component={this.renderInput} label='Enter Description' />
//         <button className="btn btn-outline-success mt-3">Submit</button>
//       </form>
//     );
//   }
// }

// const validate = (formValues) => {
//   const errors = {};
//   if (!formValues.title) {
//     errors.title = 'You must enter a title.'
//   }

//   if (!formValues.description) {
//     errors.description = 'You must enter a description.'
//   }

//   return errors;
// };

// export default reduxForm({
//   form: 'Stream Form',
//   validate
// })(StreamForm);

import React from "react";
import { Form, Field } from "react-final-form";

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => {
        const errors = {};

        if (!formValues.title) {
          errors.title = "You must enter a title";
        }

        if (!formValues.description) {
          errors.description = "You must enter a description";
        }

        return errors;
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form error">
          <Field name="title" component={renderInput} label="Enter Title" />
          <Field
            name="description"
            component={renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      )}
    />
  );
};

export default StreamForm;
