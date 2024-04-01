import axios from "axios";
// Create an Axios instance with base URL set to 'http://localhost:5000
const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})
// Custom hook to handle public Axios requests
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;