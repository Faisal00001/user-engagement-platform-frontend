import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
// Create an Axios instance with base URL set to 'http://localhost:5000
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
// Custom hook to handle secure Axios requests
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    // Axios request interceptor to add authorization token to outgoing requests
    axiosSecure.interceptors.request.use(function (config) {
        // Get access token from local storage
        const token = localStorage.getItem('access-token')
        // Add authorization header to the request
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Handle request errors
        return Promise.reject(error);
    });
    // Axios response interceptor to handle unauthorized (401/403) responses
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // If response status is 401 or 403 (unauthorized), log out the user and navigate to login page
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;