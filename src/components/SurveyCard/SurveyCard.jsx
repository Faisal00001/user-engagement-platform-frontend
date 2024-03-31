import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const SurveyCard = ({ survey }) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { title, description, status, _id } = survey
    const axiosSecure = useAxiosSecure()
    const handleParticipate = async (survey) => {
        if (user?.email) {
            const { title, description, status } = survey
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
        <div className="card bg-base-300  text-black">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <p className="font-semibold text-lg">Status : {status}</p>
                <div className="card-actions justify-center mt-2 ">
                    <button onClick={() => handleParticipate(survey)} disabled={status === 'closed' ? true : false} className="btn w-[90%] hover:bg-black bg-base-content text-white">Participate</button>
                </div>
            </div>
        </div>
    );
};

export default SurveyCard;