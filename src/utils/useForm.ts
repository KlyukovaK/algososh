import React, { useState } from "react";

export function useForm(inputValues: { [name: string]: string }) {
  const [values, setValues] = useState(inputValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
