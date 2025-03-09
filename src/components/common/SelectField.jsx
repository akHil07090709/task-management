import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ value, onChange, options }) => (
    <select
        className="w-full p-2 border rounded mb-2"
        value={value}
        onChange={onChange}
    >
        {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

SelectField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SelectField;
