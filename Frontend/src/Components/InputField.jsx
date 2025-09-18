import React from "react";

const InputField = ({type,placeholder,name,address,handleChange}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={address}
        onChange={handleChange}
        className="w-full border border-custom rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-color transition-all duration-300 bg-primary text-primary placeholder:text-muted"
        required
      />
    </div>
  );
};

export default InputField;
