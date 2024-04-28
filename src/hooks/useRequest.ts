// import { useEffect, useState } from 'react';
// import requestHandler from '../lib/custom-handler';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/GoogleAuthContext';

// export default function useRequest() {
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//   const { user } = useAuth();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const requestIntercept = requestHandler.interceptors.request.use(
//       async (config) => {
//         const requiresAuth = config.headers['Authorization'] !== 'no-auth';
//         if (requiresAuth) {
//           if (authToken) {
//             config.headers.Authorization = `Bearer ${authToken}`;
//           }
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       },
//     );

//     const responseIntercept = requestHandler.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if ([403, 401].includes(error?.response?.status)) {
//           localStorage.removeItem('authToken');
//           localStorage.removeItem('admin');
//           navigate('/');
//         }
//         return Promise.reject(error);
//       },
//     );

//     return () => {
//       requestHandler.interceptors.request.eject(requestIntercept);
//       requestHandler.interceptors.response.eject(responseIntercept);
//     };
//   }, []);

//   return requestHandler;
// }

export {};
