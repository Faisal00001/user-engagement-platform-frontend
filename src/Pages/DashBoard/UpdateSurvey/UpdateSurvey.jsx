import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSurvey from "../../../hooks/useSurvey";


const UpdateSurvey = () => {
    const { id } = useParams()
    const [status, setStatus] = useState('open');
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [surveys, , isLoading] = useSurvey()
    if (isLoading) {
        return ''
    }
    const updateSurvey = surveys.find(survey => survey._id === id)
    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }
    const handleUpdateSurvey = (event) => {
        event.preventDefault()
        const form = event.target
        const title = form.title.value
        const description = form.description.value
        const updateInfo = {
            title,
            description,
            status,
            email: user?.email
        }
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.patch(`/updateSurvey/${updateSurvey._id}`, updateInfo)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire("Saved!", "", "success");
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });


    }
    return (
        <div>
            <h3 className="text-2xl md:text-4xl text-center font-semibold">Update Survey</h3>
            <div className="mt-10">
                <form onSubmit={handleUpdateSurvey} className="max-w-sm mx-auto">

                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey Title</label>
                        <input defaultValue={updateSurvey.title} type="text" name="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Survey Description</label>
                        <textarea defaultValue={updateSurvey.description} name="description" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey Status</label>

                        <select
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={status}
                            onChange={handleStatusChange}
                        >

                            <option value="open">Open</option>
                            <option value="close">Close</option>
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="text-white bg-base-content w-[70%] hover:bg-black focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Update Survey</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSurvey;