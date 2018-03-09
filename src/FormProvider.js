import React, { Component } from "react";
import FormGroup from "./services/FormGroup";
import PropTypes from "prop-types";

export default class FormProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.formGroup = props.formGroup;
  }

  getChildContext() {
    return {
      formGroup: this.formGroup
    };
  }

  handleSubmit = e => {
    if (this.props.onSubmit) {
      this.props.onSubmit(e, this.formGroup);
    }
  };

  render() {
    return (
      <form
        name={this.props.name}
        acceptCharset="utf-8"
        onSubmit={this.handleSubmit}
        noValidate={this.props.noValidate}
        autoComplete={this.props.autocomplete}
      >
        {this.props.children}
      </form>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  FormProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(
    nextProps
  ) {
    if (nextProps.formGroup !== this.formGroup) {
      console.error(
        "you can not change formGroup in <FormProvider>. Because context is not reliable."
      );
    }
  };
}

FormProvider.childContextTypes = {
  formGroup: PropTypes.instanceOf(FormGroup).isRequired
};

FormProvider.propTypes = {
  autocomplete: PropTypes.bool,
  noValidate: PropTypes.bool,
  formGroup: PropTypes.instanceOf(FormGroup).isRequired,
  name: PropTypes.string,
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func
};
