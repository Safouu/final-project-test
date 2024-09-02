import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isUser = localStorage.getItem('isAdmin') === 'false';

  // if (!isAdmin) {
  //   return <Navigate to="/" replace />;  
  // }

  // if (!isUser) {
  //   return <Navigate to="/" replace />;
  // }

  if (!isAdmin && !isUser) {
    return <Navigate to="/" replace />;
  }
  

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
