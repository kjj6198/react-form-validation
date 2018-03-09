import { isFunction } from "lodash";
import { Subject } from "rxjs";
import Errors from "./Errors";

export default class FormControl {
  isDirty = false;
  isTouched = false;
  isValid = false;
  onUpdate$ = new Subject();

  constructor({
    name,
    defaultValue,
    validations,
    label = null,
    type = null,
    placeholder = null
  }) {
    this.$$value = defaultValue || null;
    this.label = label;
    this.placeholder = placeholder;
    this.type = type;
    this.name = name;
    this.validations = validations || [];
    this.errors = new Errors(this);
    this.onUpdate$.subscribe(this.validate.bind(this));
    this.validate = this.validate.bind(this);
  }

  get value() {
    return this.$$value;
  }

  set value(nextVal) {
    if (this.value === nextVal) {
      // don't emit any change if nextVal is equal to current value.
      return this.value;
    }
    this.$$value = nextVal;
    this.onUpdate$.next(this);
  }

  reset() {
    this.value = null;
    this.validations = [];
  }

  validate() {
    // run each validator and add error here.
    this.errors = this.errors.reset();
    this.validations.forEach(validation => {
      if (!isFunction(validation)) {
        throw new TypeError("validation should be a function.");
      }

      const result = validation(this);

      if (result) {
        this.isValid = false;
        this.errors.add(result);
      }
    });

    if (this.errors.count === 0) {
      this.isValid = true;
    }
  }
}
