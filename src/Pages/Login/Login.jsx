import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";


const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const handleLogin = (event) => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                console.log(result.user)
                toast.success('User Login Successfully')
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div className="flex min-h-full flex-col pt-24 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" required className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block px-1 text-sm font-medium leading-6 text-gray-900">Password</label>

                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>

                    </div>
                </form>
                <div className="my-5">

                    <p className="text-center font-semibold">Sign in using google</p>
                    <hr className="border-2 border-blue-300 mt-2" />
                </div>

                {/* Social login */}
                <SocialLogin></SocialLogin>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Do not have account?
                    <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to={'/signup'}>
                        Please register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;