import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const RequireAuth = () => {
  const { id, role } = useAuth();

  const location = useLocation();

  return id ? <Outlet /> : <Navigate to='/' state={{ from: location }} />;
};

export default RequireAuth;