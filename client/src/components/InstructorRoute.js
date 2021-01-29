import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const InstructorRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
             window.localStorage.getItem('instructor')?
                <Component {...props} />
            : <Redirect to="/instructorlogin" />
        )} />
    );
};

export default InstructorRoute;