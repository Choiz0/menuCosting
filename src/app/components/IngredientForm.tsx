"use client";

import { Ingredient } from "../types";

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
  label: string;
  value: string | number;
  type: string;
  name: string;
  placeholder: string;
  index: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => void;
  readOnly?: boolean;
}> = ({
  label,
  value,
  type,
  name,
  placeholder,
  index,
  handleChange,
  readOnly,
  ...props
}) => {
  return (
    <div className="md:px-4 md:py-2 mb-4 md:mb-0">
      <label className="block text-gray-700 text-sm font-bold mb-2 md:hidden">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        min="0"
        onChange={(e) => handleChange(e, index)}
        className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        readOnly={readOnly}
        {...props}
      />
    </div>
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
    <div className="md:flex md:items-center md:space-x-4">
      <TdInput
        label="Name"
        value={ingredient.name}
        type="text"
        name="name"
        placeholder="Name"
        index={index}
        handleChange={handleIngredientChange}
      />
      <div className="flex space-x-2 items-end">
        <TdInput
          label="Qty Purchased"
          value={ingredient.quantityPurchased}
          type="number"
          name="quantityPurchased"
          placeholder="Qty Purchased"
          index={index}
          handleChange={handleIngredientChange}
        />
        <TdInput
          label="Purchase Cost"
          value={ingredient.purchaseCost}
          type="number"
          name="purchaseCost"
          placeholder="Purchase Cost"
          index={index}
          handleChange={handleIngredientChange}
        />
        <TdInput
          label="Unit Price"
          value={ingredient.unitPrice}
          type="number"
          name="unitPrice"
          placeholder="Unit Price"
          index={index}
          handleChange={handleIngredientChange}
          readOnly
        />
      </div>
      <div className="flex space-x-2">
        <TdInput
          label="Qty Used"
          value={ingredient.quantityUsed}
          type="number"
          name="quantityUsed"
          placeholder="Qty Used"
          index={index}
          handleChange={handleIngredientChange}
        />
        <TdInput
          label="Used Cost"
          value={ingredient.usedCost}
          type="number"
          name="usedCost"
          placeholder="Used Cost"
          index={index}
          handleChange={handleIngredientChange}
          readOnly
        />
      </div>
      <TdInput
        label="Notes"
        value={ingredient.ingredientNotes}
        type="text"
        name="ingredientNotes"
        placeholder="Notes"
        index={index}
        handleChange={handleIngredientChange}
      />
      <div className="md:px-4 py-2 mt-4 md:mt-0 ">
        <button
          type="button"
          onClick={() => handleDeleteIngredient(index)}
          className="mt-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default IngredientForm;
