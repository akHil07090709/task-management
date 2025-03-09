import { Navigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const PrivateRoute = ({ children }) => {
  const { user } = useUserStore();
  //   if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
