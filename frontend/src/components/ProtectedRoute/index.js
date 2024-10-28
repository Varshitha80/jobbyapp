import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const jwttoken = Cookies.get('jwt_token');
  return jwttoken ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
