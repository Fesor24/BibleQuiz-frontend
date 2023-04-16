import React from 'react'
import { Navigate } from 'react-router-dom';

// Higher Order Component
// Defining a HOC that takes a component as an argument
const RequireAuth = (Component) => {

  // We define a function
  // Props here is the props that will be passed to the component
  const authRoute = (props) => {

    // Define a function to check if the user is authenticated
    const isAuthenticated = () =>{
    
      // Get token from local storage
      const token = localStorage.getItem("token");
      
      const isLoggedIn =  token !== null && token !== undefined;

      return isLoggedIn;
    }

    if (isAuthenticated() === true){
      
      // Return the component with the props if the user is logged in
      return <Component {...props} />;
    }
    else{

      console.log(window.location.pathname)

      // Get the relative path the user wants to access
      const relPath = window.location.pathname;

      // Set it in session storage
      localStorage.setItem('relPath', relPath);

      // Redirect user to login page     
      return <Navigate to="/login" replace={true} />;
    
    }
  }

  // Return the function as the final output of this HOC fucntion
  return authRoute;

};

// We export it so we can use in other files
export default RequireAuth;