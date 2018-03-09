import isObject from "lodash/isObject";
import { getMessage } from "./messages";

export default class Errors {
  constructor(formControl) {
    this.formControl = formControl;
    this.$$errors = new Map();
  }

  get errors() {
    return this.$$errors;
  }

  get count() {
    return this.$$errors.size;
  }

  get size() {
    return this.$$errors.size;
  }

  get(name) {
    return this.$$errors.get(name);
  }

  reset() {
    this.$$errors = new Map();
    return this;
  }

  isAdded(name) {
    return this.$$errors.has(name);
  }

  add(name, message) {
    if (arguments.length === 1) {
      const key = Object.keys(name)[0];
      const messageString = this.generateMessage(name, message);
      if (messageString) {
        return this.$$errors.set(key, messageString);
      }

      return false;
    }

    if (this.$$errors.has(name)) {
      return false;
    }

    return this.$$errors.set(name, message);
  }

  toFullMessages() {
    return Array.from(this.errors.values()).filter(val => Boolean(val));
  }

  generateMessage(name, message) {
    const fieldName = this.formControl.name;
    if (isObject(name)) {
      const key = Object.keys(name)[0];
      if (name[key]) {
        return getMessage(key, { name: fieldName });
      }
    }

    return message;
  }
}
