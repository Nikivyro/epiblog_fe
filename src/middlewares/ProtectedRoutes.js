import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { updateUser } from '../reducers/userSlice';

export const isAuth = () => {
    return JSON.parse(localStorage.getItem('loggedInUser'));
}

const ProtectedRoutes = () => {
    const auth = isAuth();
    const dispatch = useDispatch();

    if (auth) {
        const decodedToken = jwtDecode(auth);
        dispatch(updateUser(decodedToken));

        return <Outlet />;
    } else {
        return <Login />;
    }
}

export default ProtectedRoutes;
