import PropTypes from 'prop-types';

const GoogleSignInButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-2 border py-2 rounded-full hover:bg-gray-50"
    >
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5FqrS9OkN5XrA5_GXcN7OV-SoLIl0KPwoQ&s"
            alt="Google"
            className="h-5"
        />
        Continue with Google
    </button>
);

GoogleSignInButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default GoogleSignInButton;
