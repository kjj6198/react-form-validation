const defaultFormat = "{{name}} {{message}}";

export const defaultMessages = {
  invalid: "is invalid",
  required: "is required.",
  taken: "has already been taken",
  numeric: "must be a number.",
  email: "must be a valid email format.",
  pattern: "must match pattern."
};

export const getMessage = (
  msgKey,
  options = {
    format: defaultFormat,
    name: "",
    message: null
  }
) => {
  const message = options.message || defaultMessages[msgKey];

  if (!message) {
    defaultFormat
      .replace(/{{name}}/, options.name)
      .replace(/{{message}}/, "is invalid");
  }

  return defaultFormat
    .replace(/{{name}}/, options.name)
    .replace(/{{message}}/, message);
};
