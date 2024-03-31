import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';


import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        toast.success('User Login Successfully')
                        navigate('/');
                    })
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} type="submit" className="flex mt-5 w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <FcGoogle className="text-2xl"></FcGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;