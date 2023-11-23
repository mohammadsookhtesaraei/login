export const validate = (data,type) => {
  const errors = {};
  const regexEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const regexPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


  // email

  if (!data.email) {
    errors.email = "please enter your email";
  } else if (!regexEmail.test(data.email)) {
    errors.email = "Invalid email";
  } else {
    delete errors.email;
  }

  // password

  if (!data.password) {
    errors.password = "please enter your password";
  } else if (!regexPassword.test(data.password)) {
    errors.password = "your password must be 8 character and(#Ab)";
  } else {
    delete errors.password;
  }




  if(type === "singUp"){


    // name

    if (!data.name.trim()) {
      errors.name = "please enter your name";
    } else {
      delete errors.name;
    }
  

  // confirmPassword

  if (!data.confirmPassword) {
    errors.confirmPassword = "please enter confirmPassword";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "do not match";
  } else {
    delete errors.confirmPassword;
  }

  // checkBox

  if (data.check) {
    delete errors.check;
  } else {
    errors.check = "please accept";
  }
  }

  return errors;
};
