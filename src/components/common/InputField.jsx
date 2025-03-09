import PropTypes from 'prop-types';

const InputField = ({ label, type, placeholder, register, error }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium">{label}</label>}
        <input
            type={type}
            className="w-full border-b border-gray-300 outline-none py-2"
            placeholder={placeholder}
            {...register}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
);

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    register: PropTypes.object.isRequired,
    error: PropTypes.object,
};

InputField.defaultProps = {
    placeholder: '',
    error: null,
};

export default InputField;
