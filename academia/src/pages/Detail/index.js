import ExercisesApi from "../../api/exercicios";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import './index.css';

const Detail = () => {
    const [exerciseData, setExerciseData] = useState({});
    const { exerciseId: routeExerciseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const exercisesApi = new ExercisesApi();
        const exerciseDataResult = exercisesApi.getExerciseById(routeExerciseId);
        if (!exerciseDataResult?.id) {
            navigate('/not-found');
        }
        setExerciseData(exerciseDataResult);
    }, [routeExerciseId]);

    return (
            <div className={'d-flex flex-column justify-content-center align-items-center gap-2'}>
                <h1 className={'h1 text-center text-white'}>{exerciseData?.title}</h1>
                <p className={'text-white text-center mx-auto w-50'}>{exerciseData?.description}</p>
                <img className={'detail-img'} src={exerciseData?.primary_image_url} alt="Primary Image"/>
                <img className={'detail-img'} src={exerciseData?.secondary_image_url} alt="Secondary Image"/>
                <div className="text-center">
                    <iframe width="853" height="480" src={exerciseData?.video_url} title={exerciseData?.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        );
}

export default Detail;