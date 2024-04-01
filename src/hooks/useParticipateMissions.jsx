import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

// Custom hook to fetch missions in which the user has participated
const useParticipateMissions = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    // Use react-query's useQuery hook to fetch participated missions
    const { isLoading, data: participatedMissions = [] } = useQuery({
        // Define query key as an array containing 'participatedMissions' and user's email
        queryKey: ['participatedMissions', user?.email],
        queryFn: async () => {
            // Make a GET request to fetch missions in which the user has participated
            const res = await axiosSecure.get(`/myMissions/${user.email}`);
            return res.data;
        }
    })
    return [participatedMissions, isLoading]  // Return the fetched missions and loading state
};

export default useParticipateMissions;