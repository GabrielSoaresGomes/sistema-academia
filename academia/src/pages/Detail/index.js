import ExercisesApi from "../../api/exercicios";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import './index.css';

const Detail = () => {
    const [exerciseData, setExerciseData] = useState({});
    const { exerciseId: routeExerciseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const exercisesApi = ExercisesApi.getInstance();
        const exerciseDataResult = exercisesApi.getExerciseById(routeExerciseId);
        if (!exerciseDataResult?.id) {
            navigate('/not-found');
        }
        setExerciseData(exerciseDataResult);
    }, [routeExerciseId]);

    return (
            <div className={'d-flex flex-column justify-content-center align-items-center gap-2'}>
                <h1 className={'h1 text-center text-white'}>{exerciseData?.title}</h1>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className={'detail-img'} src={exerciseData?.thumbnail_url} alt="Thumbnail Image"/>
                        </div>
                        <div className="carousel-item">
                            <img className={'detail-img'} src={exerciseData?.primary_image_url} alt="Primary Image"/>
                        </div>
                        <div className="carousel-item">
                            <img className={'detail-img'} src={exerciseData?.secondary_image_url} alt="Secondary Image"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {
                    exerciseData?.description?.split('\n').map(value => {
                        if (value !== "" && value != null) {
                            return (<p className={'text-white text-center mx-auto w-50'}>{value}</p>)
                        }
                    })
                }
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