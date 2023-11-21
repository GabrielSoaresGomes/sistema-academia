import { useEffect, useState } from "react";
import CardGroup from "../../components/CardGroup";
import Card from "../../components/Card";
import ExercisesApi from "../../api/execise";
import H1 from "../../layout/H1/H1";
import {useNavigate, useParams} from "react-router-dom";

const Category = () => {
    const navigate = useNavigate();
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

    const handleDelete = async (exerciseId) => {
        const exercisesApi = ExercisesApi.getInstance();
        const deleteResponse = await exercisesApi.deleteExerciseById(exerciseId);
        if (deleteResponse) {
            setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
        }
    }

    const handleEdit = (exerciseId) => {
        navigate(`/exercise/${exerciseId}/edit`);
    }

    return (
        <div>
            <H1 text={'Exercícios'} />
            <CardGroup>
                {exercises.map((exercise) => (
                    <Card handleEdit={() => handleEdit(exercise?.id)} handleDelete={() => handleDelete(exercise?.id)} key={exercise.id} item={exercise} to={`exercise/${exercise.id}`}/>
                ))}
            </CardGroup>
        </div>
    );
};

export default Category;