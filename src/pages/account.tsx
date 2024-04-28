import React from 'react';
import { useAuth } from '../context/GoogleAuthContext';
// import Layout from '../components/Layout';
import AppLayout from '../components/app-layout';

const Account = () => {
  const { logOut, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <div className="w-[300px] m-auto">
        <h1 className="text-center text-2xl font-bold pt-12">Account</h1>
        <div>
          <p>Welcome, {user?.displayName}</p>
        </div>
        <button onClick={handleSignOut} className="border py-2 px-5 mt-10">
          Logout
        </button>
      </div>
    </AppLayout>
  );
};

export default Account;
