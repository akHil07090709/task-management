const AuthToggleLink = ({ isSignUp, setIsSignUp }) => (
  <p className="text-sm text-center mt-4">
    {isSignUp ? "Already have an account?" : "Don’t have an account?"} &nbsp;
    <a
      href="#"
      onClick={() => setIsSignUp(!isSignUp)}
      className="text-orange-500 hover:underline"
    >
      {isSignUp ? "Login" : "Create an account"}
    </a>
  </p>
);

export default AuthToggleLink;