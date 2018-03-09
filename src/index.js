import React from "react";
import { render } from "react-dom";
import Validators from "./services/Validators";
import FormGroup from "./services/FormGroup";
import FormControl from "./services/FormControl";
import InputField from "./InputField";
import FormProvider from "./FormProvider";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

function underRangeValidator(formControl) {
  if (parseInt(formControl.value, 10) > 25) {
    formControl.errors.add("tooHigh", "your age was too high!");
    return true;
  }

  return null;
}

function numberValidation(formControl) {
  const value = parseInt(formControl.value, 10);
  if (value < 0 || value < 22000) {
    formControl.errors.add("salaryTooLow", "your salary is too low.");
    return true;
  }

  return null;
}

const userForm = new FormGroup({
  name: new FormControl({
    name: "email",
    label: "電子郵件",
    placeholder: "enter your email...",
    validations: [Validators.email, Validators.required]
  }),
  creditCard: new FormControl({
    name: "creditCard",
    label: "信用卡號碼"
  }),
  age: new FormControl({
    name: "age",
    label: "年齡",
    validations: [Validators.required, Validators.numeric, underRangeValidator]
  }),

  salary: new FormControl({
    name: "salary",
    label: "薪水",
    type: "number",
    validations: [Validators.required, Validators.numeric, numberValidation]
  })
});

const MyInput = ({ control, formGroup }) => (
  <div>
    <label>{control.label}</label>
    <input />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <div style={styles}>
        <h2>Form Validation {"\u2728"}</h2>
        <FormProvider
          formGroup={userForm}
          onSubmit={(e, formGroup) => {
            e.preventDefault();
            alert(JSON.stringify(formGroup.serialize()));
          }}
        >
          <div>
            <InputField name="name" />
            <InputField name="age" />
            <InputField name="salary" />
            <InputField name="creditCard">
              <MyInput />
            </InputField>
            <button>submit</button>
          </div>
        </FormProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
