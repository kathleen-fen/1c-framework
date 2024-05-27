const validationFunctions = [
  { type: "function", func: isNameError, value: name },
  { type: "function", func: isAgeError, value: age },
  { type: "function", func: isPhoneError, value: phone },
  { type: "value", value: indexError },
  // add more validation functions or values as needed
];

const getFirstErrorMessage = () => {
  for (let i = 0; i < validationFunctions.length; i++) {
    let error;
    if (validationFunctions[i].type === "function") {
      error = validationFunctions[i].func(validationFunctions[i].value);
    } else if (validationFunctions[i].type === "value") {
      error = validationFunctions[i].value;
    }
    if (error) {
      return error;
    }
  }
  return "";
};

const enableSubmitButton = () => !getFirstErrorMessage();
