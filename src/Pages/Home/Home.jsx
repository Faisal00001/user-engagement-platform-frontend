import axios from "axios";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import SurveyCard from "../../components/SurveyCard/SurveyCard";


const Home = () => {
    // useState hooks for storing surveys 
    const [surveys, setSurveys] = useState([])
    // Fetching all surveys
    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await axios.get('http://localhost:5000/allSurveys');


                setSurveys(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        fetchData();
    }, []);

    // const openSurvey = surveys.filter(survery => survery.status == 'open')
    // const closeSurvey = surveys.filter(survery => survery.status == 'closed')
    return (
        <div>
            <h3>Home</h3>
            <PageTitle title={'EngageHub | Home'}></PageTitle>
            <div className="px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-24">
                    {
                        // Looping through the surveys
                        surveys.map(survey => <SurveyCard key={survey._id} survey={survey}></SurveyCard>)
                    }

                </div>
            </div>

        </div>
    );
};

export default Home;