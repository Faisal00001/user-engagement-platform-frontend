import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div>
            <div className="flex flex-col h-screen justify-center items-center space-y-3">
                <div className="w-[70%] md:w-[40%] lg:w-[20%]">
                    <img src="https://i.ibb.co/sRR6GSN/5203299.jpg" alt="" />
                </div>


                <p className="text-2xl md:text-3xl font-bold">{error.statusText || error.message}</p>
                <Link to={"/"}><button className="px-5 py-2 rounded-lg text-white bg-black hover:text-red-500 font-semibold">Go Back To Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;