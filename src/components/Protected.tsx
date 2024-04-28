import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/GoogleAuthContext';
type ProtectedTypes = {
  children?: React.ReactNode;
};

const ProtectedComponent = (props: ProtectedTypes) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {props.children}
      <Outlet />
    </>
  );
};

export default ProtectedComponent;
