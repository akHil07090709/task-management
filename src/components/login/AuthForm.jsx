import PropTypes from "prop-types";
import AuthToggleLink from "./AuthToggleLink";
import InputField from "../common/InputField";

const AuthForm = ({
    onSubmit,
    register,
    errors,
    isSignUp,
    handleSubmit,
    setIsSignUp,
}) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
            label="Username or Email"
            type="text"
            placeholder="Enter your email"
            register={register("email")}
            error={errors.email}
        />
        <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            register={register("password")}
            error={errors.password}
        />
        <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        >
            {isSignUp ? "Sign Up" : "Login"}
        </button>
        <AuthToggleLink isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </form>
);

AuthForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isSignUp: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setIsSignUp: PropTypes.func.isRequired,
};

export default AuthForm;
