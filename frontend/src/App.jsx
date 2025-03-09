import React, { useEffect } from 'react'
import FloatingShape from './Components/FloatingShape';
import {Routes, Route, Navigate} from "react-router-dom"
import SingUpPage from './Pages/SingUpPage';
import LoginPage from './Pages/LoginPage';
import EmailVerificationPage from './Pages/EmailVerificationPage';
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import { useAuthStore } from './Store/authStore';
import DashboardPage from './Pages/DashboardPage';
import LoadingSpinner from './Components/LoadingSpinner';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};


function App() {
  
 const {isCheckingAuth,  checkAuth} =  useAuthStore();

   // useEffect
   useEffect(() =>{
    checkAuth();
   }, [checkAuth]);

   if(isCheckingAuth) return <LoadingSpinner/>;
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 flex items-center relative overflow-hidden'>

   <FloatingShape  color='bg-green-500' size="w-64 h-64" top="-5%" left="10%" delay={0}/>
   <FloatingShape color='bg-emerald-500' size="w-48 h-48" top="70%" left="80%" delay={5}/>
   <FloatingShape color='bg-line-500' size="w-32 h-32" top="40%" left="-10%" delay={2}/>

      
  
      <Routes>   
         <Route path='/' element={<ProtectedRoute>
            <DashboardPage/>
         </ProtectedRoute>}/>

         <Route path='/signup' element={<RedirectAuthenticatedUser>
          <SingUpPage/>
         </RedirectAuthenticatedUser>}/>

         <Route path='/login' element={<RedirectAuthenticatedUser>
          <LoginPage/>
         </RedirectAuthenticatedUser>}/>

         <Route path='/verify-email' element={<EmailVerificationPage/>}/>
      </Routes>
              <Toaster/>

    </div>
   
  );
}

export default App;

