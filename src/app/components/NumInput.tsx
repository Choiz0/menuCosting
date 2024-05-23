import React from "react";
import { NumInputProps } from "../types";

const NumInput: React.FC<NumInputProps> = ({
  children,
  name,
  value,
  onChange,
  placeholder,
  classNameAdd = "",
  mesure = "$",
}) => {
  const handleIncrement = () => {
    const event = {
      target: { name, value: Number(value) + 1 },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleDecrement = () => {
    if (value > 0) {
      const event = {
        target: { name, value: Number(value) - 1 },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="flex space-x-2 items-center m-2">
      <label htmlFor={name} className={`w-1/2 ${classNameAdd}`}>
        {children}
      </label>
      <div className="flex items-center rounded border border-gray-200">
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
          onClick={handleDecrement}
        >
          &minus;
        </button>
        <input
          type="number"
          id={name}
          min="0"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 "
          onClick={handleIncrement}
        >
          +
        </button>
      </div>{" "}
      <span className="text-gray-500">{mesure}</span>
    </div>
  );
};

export default NumInput;
