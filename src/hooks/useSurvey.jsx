import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

// Custom hook to fetch all surveys
const useSurvey = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    // Use react-query's useQuery hook to fetch all surveys
    const { data: allSurveys = [], refetch, isLoading } = useQuery({
        queryKey: ['missions', user?.email],
        // Define query function to fetch all surveys from the backend
        queryFn: async () => {
            const res = await axiosPublic.get(`/allSurveys`);
            return res.data;
        }
    })
    return [allSurveys, refetch, isLoading] // Return the fetched surveys, refetch function, and loading state
};

export default useSurvey;