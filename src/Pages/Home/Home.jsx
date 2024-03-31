import { useEffect, useState } from "react";
import SurveyCard from "../../components/SurveyCard/SurveyCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Home = () => {
    const [surveys, setSurvey] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic('/allSurveys');
                setSurvey(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [axiosPublic]);
    // const openSurvey = surveys.filter(survery => survery.status == 'open')
    // const closeSurvey = surveys.filter(survery => survery.status == 'closed')
    return (
        <div>
            <h3>Home</h3>
            <div className="px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-24">
                    {
                        surveys.map(survey => <SurveyCard key={survey._id} survey={survey}></SurveyCard>)
                    }

                </div>
            </div>

        </div>
    );
};

export default Home;