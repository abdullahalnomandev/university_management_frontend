"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

interface ISelectFieldProps {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  label?: string;
  defaultValue?: SelectOptions;
  placeholder?: string;
  handleChange?: (el: string) => void
}

const FormSelectField = ({
  options,
  name,
  label,
  value,
  defaultValue,
  size,
  placeholder,
  handleChange
}: ISelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : ""}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={handleChange ? handleChange : onChange}
            options={options}
            value={value}
            style={{ width: "100%" }}
            size={size}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
