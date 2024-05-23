import React from "react";
import { InputProps } from "../types";

const Input: React.FC<InputProps> = ({
  children,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex m-2 items-center">
      <label htmlFor={name} className="w-1/2">
        {children}
      </label>
      <div className="relative m-2  block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="peer w-full p-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
          placeholder={placeholder}
        />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          {children}
        </span>
      </div>
    </div>
  );
};

export default Input;
