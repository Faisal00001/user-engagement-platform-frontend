import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddSurvey = () => {
    const [status, setStatus] = useState('open');
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    const handleSurvey = (event) => {

        event.preventDefault();
        console.log('Hello')
        const form = event.target;
        const title = form.title.value
        const description = form.description.value
        const newSurvey = {
            title,
            description,
            status,
            email: user?.email
        }
        axiosSecure.post('/addSurvey', newSurvey)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset()
                    Swal.fire({
                        icon: "success",
                        title: `${title} Added Successfully...`,
                    });
                }
            })
            .catch(error => {
                console.log(error.message)
            })


    }
    return (
        <div>
            <h3 className="text-2xl font-semibold text-center md:text-4xl">Add a Survey</h3>
            <div className="mt-10">
                <form onSubmit={handleSurvey} className="max-w-sm mx-auto">

                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey Title</label>
                        <input type="text" name="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Survey Description</label>
                        <textarea name="description" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey Status</label>

                        <select
                            className="select select-bordered w-full max-w-xs"
                            value={status}
                            onChange={handleStatusChange}
                        >

                            <option value="open">Open</option>
                            <option value="close">Close</option>
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="text-white bg-base-content w-[70%] hover:bg-black focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add Survey</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSurvey;