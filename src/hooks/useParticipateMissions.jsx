import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useParticipateMissions = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { isLoading, data: participatedMissions = [] } = useQuery({
        queryKey: ['participatedMissions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myMissions/${user.email}`);
            return res.data;
        }
    })
    return [participatedMissions, isLoading]
};

export default useParticipateMissions;