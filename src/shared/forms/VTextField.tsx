import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TVTextFieldProps = TextFieldProps & {
  name: string;
};
export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [value, setValue] = React.useState(defaultValue || '');

  React.useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, value) => setValue(value),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      value={value}
      onChange={(e) => {setValue(e.target.value); rest.onChange?.(e)}}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}

      onKeyDown={() => error ? clearError() : undefined}
    />
  );
};
