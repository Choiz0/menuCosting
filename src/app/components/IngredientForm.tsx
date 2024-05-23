"use client";

import { Ingredient } from "../types";

const measurements = ["kg", "g", "liters", "ml", "units"];

interface IngredientFormProps {
  ingredient: Ingredient;
  index: number;
  handleIngredientChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => void;
  handleDeleteIngredient: (index: number) => void;
  isUpdate?: boolean;
}

const TdInput: React.FC<{
  value: string | number;
  type: string;
  name: string;
  placeholder: string;
  index: number;
  isUpdate?: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => void;
}> = ({ value, type, name, placeholder, index, handleChange }) => {
  return (
    <td className="md:px-4 md:py-2">
      <input
        type={type}
        name={name}
        value={value}
        min="0"
        onChange={(e) => handleChange(e, index)}
        className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
      />
    </td>
  );
};

const IngredientForm: React.FC<IngredientFormProps> = ({
  ingredient,
  index,
  handleIngredientChange,
  handleDeleteIngredient,
  isUpdate,
}) => {
  return (
    <>
      <TdInput
        value={ingredient.name}
        type="text"
        name="name"
        placeholder="Name"
        index={index}
        handleChange={handleIngredientChange}
      />
      <TdInput
        value={ingredient.quantityPurchased}
        type="number"
        name="quantityPurchased"
        placeholder="Quantity Purchased"
        index={index}
        handleChange={handleIngredientChange}
      />
      <td className="md:px-4 py-2 px-1">
        <select
          name="measurement"
          value={ingredient.measurement}
          onChange={(e) => handleIngredientChange(e, index)}
          className="mt-1 border block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {measurements.map((measurement) => (
            <option key={measurement} value={measurement}>
              {measurement}
            </option>
          ))}
        </select>
      </td>
      <TdInput
        value={ingredient.totalCost}
        type="number"
        name="totalCost"
        placeholder="Total Cost $"
        index={index}
        handleChange={handleIngredientChange}
      />
      <TdInput
        value={ingredient.unitPrice}
        type="number"
        name="unitPrice"
        placeholder="Unit Price"
        index={index}
        handleChange={handleIngredientChange}
      />
      <TdInput
        value={ingredient.quantityUsed}
        type="number"
        name="quantityUsed"
        placeholder="Quantity Used"
        index={index}
        handleChange={handleIngredientChange}
      />
      <td className="md:px-4 py-2">
        <select
          name="quantityUsedMeasurement"
          value={ingredient.quantityUsedMeasurement}
          onChange={(e) => handleIngredientChange(e, index)}
          className="mt-1 border block w-full pl-3 md:pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {measurements.map((measurement) => (
            <option key={measurement} value={measurement}>
              {measurement}
            </option>
          ))}
        </select>
      </td>
      <td className="md:px-4 py-2">
        <textarea
          name="ingredientNotes"
          value={ingredient.ingredientNotes}
          onChange={(e) => handleIngredientChange(e, index)}
          className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Ingredient Notes"
        />
      </td>
      <td className="px-4 py-2">
        <button
          type="button"
          onClick={() => handleDeleteIngredient(index)}
          className="mt-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </td>
    </>
  );
};

export default IngredientForm;
