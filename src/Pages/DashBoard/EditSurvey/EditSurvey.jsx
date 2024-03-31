import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const EditSurvey = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { refetch, data: createdSurveys = [] } = useQuery({
        queryKey: ['createdSurveys', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myCreatedMissions/${user.email}`);
            return res.data;
        }
    })
    const handleUpdate = (id) => {
        navigate(`/dashboard/updateSurvey/${id}`)
    }
    const handleDelete = (survey) => {
        Swal.fire({
            title: "Do you want to Delete?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `Cancel`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteCreatedSurvey?id=${survey._id}&email=${user?.email}`)
                    .then(res => {
                        if (res.deletedCount > 0) {
                            Swal.fire({
                                title: `Successfully Deleted`,
                            });

                        }
                        refetch()
                    })
            } else if (result.isDenied) {
                Swal.fire("Not Deleted");
            }
        });

    }

    return (
        <div>
            <h3 className="text-2xl my-10 font-semibold md:text-4xl text-center">Edit Surveys</h3>
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
                            createdSurveys.map((survey, index) => <tr key={survey._id}>
                                <th>{index + 1}</th>
                                <td>{survey.title}</td>
                                <td>{survey.status}</td>
                                <td>
                                    <button onClick={() => handleUpdate(survey._id)} className="px-5 py-2 bg-base-content hover:bg-green-500 text-white rounded-md">
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(survey)} className="px-5 py-2 bg-base-content hover:bg-red-500 text-white rounded-md">
                                        Delete
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

export default EditSurvey;