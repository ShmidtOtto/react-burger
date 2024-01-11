import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export interface IProtected {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

const Protected: React.FC<IProtected> = ({ onlyUnAuth = false, component }): JSX.Element | null => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }}/>;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: React.FC<{ component: JSX.Element }> = ({ component }): JSX.Element => (
  <Protected onlyUnAuth={true} component={component} />
);
