import { useEffect, useState } from "react";
import CardGroup from "../../components/CardGroup";
import Card from "../../components/Card";
import ExercisesApi from "../../api/exercicios";
import H1 from "../../layout/H1/H1";

const Category = ({ searchFilter }) => {
    const [filter, setFilter] = useState(searchFilter);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        searchFilter ? setFilter(searchFilter.trim()) : setFilter('');
    }, [searchFilter]);

    useEffect(() => {
        const exercisesApi = ExercisesApi.getInstance();
        const exercisesData = exercisesApi.getAllExercises();
        if (exercisesData?.length) {
            const filteredExercisesData = exercisesData.filter((exercise) =>
                exercise.title.includes(filter)
            );
            setExercises(filteredExercisesData);
        }
    }, [filter]);

    return (
        <div>
            <H1 text={'Exercícios'} />
            <CardGroup>
                {exercises.map((exercise) => (
                    <Card key={exercise.id} exercise={exercise}/>
                ))}
            </CardGroup>
        </div>
    );
};

export default Category;