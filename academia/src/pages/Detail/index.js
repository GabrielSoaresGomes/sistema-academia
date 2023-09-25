import ExercisesApi from "../../api/exercicios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './index.css';

const Detail = () => {
    const [exerciseId, setExerciseId] = useState(undefined);
    const [exerciseData, setExerciseData] = useState({});
    const { exerciseId: routeExerciseId } = useParams();

    useEffect(() => {
        setExerciseId(routeExerciseId);
    }, [routeExerciseId]);

    useEffect(() => {
        const exercisesApi = new ExercisesApi();
        const exerciseData = exercisesApi.getExerciseById(exerciseId);
        setExerciseData(exerciseData);
    }, [exerciseId]);

    return (
        <div className={'d-flex flex-column justify-content-center align-items-center gap-2'}>
            <h1 className={'h1 text-center text-white'}>{exerciseData?.title}</h1>
            <p>{exerciseData?.description}</p>
            <img className={'detail-img'} src={exerciseData?.primary_image_url} alt="Primary Image" />
            <img className={'detail-img'} src={exerciseData?.secondary_image_url} alt="Secondary Image" />
            <div className="text-center">
                <iframe width="853" height="480" src={exerciseData?.video_url} title={exerciseData?.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </div>
    );
}

export default Detail;