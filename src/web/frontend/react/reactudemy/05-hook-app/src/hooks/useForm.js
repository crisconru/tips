import { useState } from "react";

const useForm = (initialstate = {}) => {
  const [values, setValues] = useState(initialstate);

  const reset = () => {
    setValues(initialstate)
  }

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  // reset()
  return [values, handleInputChange, reset];
};

export default useForm;
