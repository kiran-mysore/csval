const requiredFields = require("./validators/requiredFields");
const types = require("./validators/types");

const validate = async (parsed, passedRules) => {
  const rules = Object.assign({}, passedRules);
  const validators = [requiredFields, types];
  const errors = [];

  validators.forEach(validator => {
    try {
      validator(parsed, rules);
    } catch (err) {
      errors.push(err);
    }
  });

  if (errors.length > 0) {
    const errorText = errors.reduce((acc, cur, i) => {
      if (i !== 0) acc += "\n";
      acc += cur.message;
      return acc;
    }, "");

    throw new Error(errorText);
  }

  return true;
};

module.exports = validate;
