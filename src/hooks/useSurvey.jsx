import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useSurvey = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: allSurveys = [], refetch, isLoading } = useQuery({
        queryKey: ['missions', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allSurveys`);
            return res.data;
        }
    })
    return [allSurveys, refetch, isLoading]
};

export default useSurvey;