import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleRegistration = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value
        const email = form.email.value
        const password = form.password.value
        if (password.length < 6) {
            toast.error("Password length should be at least 6 characters")
            return
        }
        const uppercaseRegex = /[A-Z]/;
        const specialCharacterRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
        if (!uppercaseRegex.test(password)) {
            toast.error("Password should contain at least one uppercase letter")
            return
        }
        if (!specialCharacterRegex.test(password)) {
            toast.error("Password should contain at least one special character")
            return
        }
        createUser(email, password)
            .then(res => {
                console.log(res.user)
                updateUserProfile(name, photo)
                    .then(() => {
                        console.log('Hello')
                        const userInfo = {
                            name,
                            email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    form.reset()
                                    toast.success('User Created Successfully')
                                    form.reset()
                                    navigate('/')
                                }
                            })


                    })
                    .catch(error => {
                        toast.error(error.message)
                    })
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div className="flex min-h-full pt-24 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <PageTitle title={'EngageHub | SignUp'}></PageTitle>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registration</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleRegistration} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input id="name" name="name" type="text" required className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo URL</label>
                        <div className="mt-2">
                            <input id="photo" name="photo" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" required className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registration</button>
                    </div>
                </form>
                {/* Social Login  */}
                <SocialLogin></SocialLogin>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have account?
                    <Link className="text-blue-500 font-bold" to={'/login'}>
                        Please Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default SignUp;