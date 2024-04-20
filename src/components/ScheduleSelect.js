// InputField.js
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const ScheduleSelect = ({ label, name, value, handleChange, style, options }) => (
  <>
    <label>{label}</label>
    <Select
      name={name}
      value={value}
      onChange={handleChange}
      style={style}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.id || option}>
          {option.name || option}
        </MenuItem>
      ))}
    </Select>
  </>
);

export default ScheduleSelect;