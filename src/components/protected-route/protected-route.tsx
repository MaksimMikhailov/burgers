import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface IProtectedRoute {
  onlyUnAuth?: boolean;
}
export const ProtectedRoute = ({ onlyUnAuth }: IProtectedRoute) => {
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth && !onlyUnAuth) {
    return <Navigate to='/login' replace />;
  }
  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};
