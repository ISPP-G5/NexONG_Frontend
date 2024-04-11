// SelectInput.js
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ScheduleSelectInput = ({ label, name, value, options, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: '70%' }} 
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ScheduleSelectInput;
