import ExercisesApi from "../../api/execise";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import './index.css';

const Detail = () => {
    const [exerciseData, setExerciseData] = useState({});
    const { exerciseId: routeExerciseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercisesApi = ExercisesApi.getInstance();
                const exerciseDataResult = await exercisesApi.getExerciseById(routeExerciseId, false);
                console.log(exerciseDataResult)
                if (!exerciseDataResult?.id) {
                    navigate('/not-found');
                } else {
                    setExerciseData(exerciseDataResult);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do exercício:', error);
            }
        };
        fetchData();
    }, [routeExerciseId]);

    return (
            <div className={'d-flex flex-column justify-content-center align-items-center gap-2'}>
                <h1 className={'h1 text-center text-white'}>{exerciseData?.name}</h1>
                <img src={exerciseData?.image} alt=""/>
                {
                    exerciseData?.description?.split('\n').map(value => {
                        if (value !== "" && value != null) {
                            return (<p className={'text-white text-center mx-auto w-50'}>{value}</p>)
                        }
                    })
                }
            </div>
        );
}

export default Detail;