import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSurvey from "../../../hooks/useSurvey";


const Missions = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [allSurveys] = useSurvey()
    const navigate = useNavigate()
    const { refetch, data: participatedMissions = [] } = useQuery({
        queryKey: ['participatedMissions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myMissions/${user.email}`);
            return res.data;
        }
    })
    // Getting participate Surveys
    let participatedMissions_id = []
    for (let item of participatedMissions) {
        participatedMissions_id.push(item.survey_id)
    }
    // Getting not participate Surveys
    const incompleteSurveys = allSurveys.filter(survey => {
        return !participatedMissions_id.includes(survey._id)
    })
    const handleParticipate = async (survey) => {
        if (user?.email) {
            const { title, description, status, _id } = survey
            const { email, displayName } = user
            const data = {
                email,
                displayName,
                title,
                description,
                status,
                survey_id: _id
            }
            const response = await axiosSecure.post('/mySurveyMission', data)
            if (response.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `${title}`,
                    text: "Participated Successfully",
                });
                refetch()
            }
            else {
                toast.error('Already Participated.Thank you')
            }
        }
        else {
            Swal.fire({
                icon: "error",
                title: `PLease Login to Participate`,

            });
            navigate('/login')
        }
    }
    return (
        <div>
            <PageTitle title={'EngageHub | Available Missions'}></PageTitle>
            <h3 className="text-2xl my-10 font-semibold text-center md:text-4xl">Available Surveys</h3>
            <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th></th>
                            <td>Title</td>
                            <td>Status</td>
                            <td>Action</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            participatedMissions.map((survey, index) => <tr key={survey._id}>
                                <th>{index + 1}</th>
                                <td>{survey.title}</td>
                                <td>{survey.status}</td>
                                <td>Participated</td>
                            </tr>)
                        }
                        {
                            incompleteSurveys.map((survey, index) => <tr key={survey._id}>
                                <th>{index + 1}</th>
                                <td>{survey.title}</td>
                                <td>{survey.status}</td>
                                <td>Not Participated Yet</td>
                                <td>
                                    <button onClick={() => handleParticipate(survey)} className="px-5 py-2 bg-base-content hover:bg-green-500 rounded-md text-white">
                                        Want to participate
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Missions;