const isValidEmail = (email: string | undefined | null): boolean => {
  if (email) {
    const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validate.test(email);
  } else {
    return false;
  }
};

export default isValidEmail;
