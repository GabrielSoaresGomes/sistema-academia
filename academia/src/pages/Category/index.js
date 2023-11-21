import { useEffect, useState } from "react";
import CardGroup from "../../components/CardGroup";
import Card from "../../components/Card";
import ExercisesApi from "../../api/execise";
import H1 from "../../layout/H1/H1";
import {useParams} from "react-router-dom";

const Category = () => {
    const { categoryId: routeCategoryId } = useParams();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const exercisesApi = ExercisesApi.getInstance();
            const exercisesData = await exercisesApi.getExerciseByCategoryId(routeCategoryId);
            if (exercisesData?.length) {
                setExercises(exercisesData);
            }
        }
        fetchData();
    }, [routeCategoryId]);

    return (
        <div>
            <H1 text={'Exercícios'} />
            <CardGroup>
                {exercises.map((exercise) => (
                    <Card key={exercise.id} item={exercise} to={`exercise/${exercise.id}`}/>
                ))}
            </CardGroup>
        </div>
    );
};

export default Category;