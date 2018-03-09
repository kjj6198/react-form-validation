import React, { Component } from "react";
import FormGroup from "./services/FormGroup";
import FormControl from "./services/FormControl";
import PropTypes from "prop-types";

// because context change may not trigger update,
// so we should trigger update by setState.
const dummyState = {};

export default class InputField extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};

    this.control = context.formGroup.controls[props.name];
  }

  getChildContext() {
    const { name } = this.props;
    return {
      control: this.context.formGroup[name]
    };
  }

  componentDidMount() {
    this.subscription = this.control.onUpdate$.subscribe(this.onControlUpdate);
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onControlUpdate = nextControl => {
    this.control = nextControl;
    this.setState(dummyState);
  };

  updateControlValue = e => {
    const { control } = this;
    control.value = e.target.value;
  };

  handleInputBlur = () => {
    const { control } = this;
    control.validate();
    this.control = control;
    this.setState(dummyState);
  };

  renderErrorMessage() {
    const control = this.control;
    if (control.errors.count > 0) {
      return (
        <p style={{ color: "#fe6565" }}>
          {control.errors.toFullMessages().join("\n")}
        </p>
      );
    }

    return null;
  }

  renderDefaultInput() {
    const { label, type, inputHTML } = this.props;
    const { control } = this;

    return (
      <div>
        <aside>
          <label htmlFor={control.name}>
            {label || control.label || control.name}
          </label>
        </aside>
        <input
          id={control.name}
          placeholder={control.placeholder}
          type={type || control.type || "text"}
          onChange={this.updateControlValue}
          onBlur={this.handleInputBlur}
          value={this.control.value || ""}
          {...inputHTML}
        />
        {this.renderErrorMessage()}
      </div>
    );
  }

  render() {
    const { children } = this.props;
    const { control } = this;

    return children
      ? React.cloneElement(children, {
          control,
          formGroup: this.context.formGroup
        })
      : this.renderDefaultInput();
  }
}

InputField.propTypes = {
  children: PropTypes.element,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  inputHTML: PropTypes.shape({})
};

InputField.childContextTypes = {
  control: PropTypes.instanceOf(FormControl)
};

InputField.contextTypes = {
  formGroup: PropTypes.instanceOf(FormGroup)
};
