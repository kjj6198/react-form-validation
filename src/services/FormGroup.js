const identity = value => value;
export default class FormGroup {
  constructor(
    controls,
    adapter = {
      input: identity,
      output: identity
    }
  ) {
    this.controls = controls;
    this.adapter = adapter;
  }

  get isValid() {
    const { controls } = this;
    return Object.keys(controls).every(key => controls[key].isValid);
  }

  set(name, value) {
    if (this.controls[name]) {
      this.controls[name].value = value;
    }
  }

  get(name) {
    if (this.controls[name]) {
      return this.controls[name].value;
    }

    return undefined;
  }

  add(name, control) {
    Object.assign(this.controls, {
      [name]: control
    });
  }

  subscribeFor(name, callback) {
    if (typeof name === "string") {
      this.doSubscribe(name, callback);
    }
  }

  doSubscribe(name, callback) {
    const control = this.throwIfNotExist(name);
    control.onUpdate$.subscribe(callback);
  }

  getMessageFor(name) {
    const control = this.throwIfNotExist(name);
    return control.errors.toFullMessages();
  }

  getAllMessages() {
    return Object.keys(this.controls)
      .map(key => this.controls[key].errors.toFullMessages())
      .filter(messages => messages.length !== 0);
  }

  validate() {
    Object.keys(this.controls).forEach(control =>
      this.controls[control].validate()
    );
  }

  serialize() {
    const result = Object.keys(this.controls)
      .map(key => ({ [key]: this.controls[key].value }))
      .reduce((acc, current) => Object.assign(acc, current), {});

    return this.adapter.output(result);
  }

  toJSON() {
    try {
      return JSON.stringify(this.serialize());
    } catch (e) {
      throw new Error("there is an error during serailize JSON in FormGroup.");
    }
  }

  throwIfNotExist(name) {
    if (!this.controls[name]) {
      throw new Error(
        `can not get control for key\`${name}\`. Did you misspell it?`
      );
    }

    return this.controls[name];
  }
}
