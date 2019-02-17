module.exports = class Container {
  constructor() {
    this.factories = {};
    this.dependencies = {};
  }

  registerValue(name, value) {
    this.dependencies[name] = value;
  }

  register(name, value) {
    this.factories[name] = value;
  }

  get(name) {
    if (!this.dependencies[name]) {
      const factory = this.factories[name];
      this.dependencies[name] = factory && factory(this);
      if (!this.dependencies[name]) {
        throw new Error(`Cannot find module: ${name}`);
      }
    }

    return this.dependencies[name];
  }
};
