import { Navigate, Route } from 'react-router-dom';



export const PrivateRoute = ({ children }) => {
    const user = true
    return user ? children : <Navigate to="/login" />
}   