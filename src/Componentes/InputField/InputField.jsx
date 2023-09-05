import React from 'react';
import './InputField.css';

function InputField({ id, labelText, type, placeholder, value, onChange }) {
  return (
    <div className="input-container">
      <label className='label' htmlFor={id}>{labelText}</label>
      <input
        className="styled-input"
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      </div>
  );
}

export default InputField;
