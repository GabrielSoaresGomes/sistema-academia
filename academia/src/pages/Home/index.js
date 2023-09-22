import { useEffect, useState } from "react";
import ExercicioCardGroup from "../../components/ExercicioCardGroup";
import ExercicioCard from "../../components/ExercicioCard";
import ExercisesApi from "../../api/exercicios";

const Home = ({ searchFilter }) => {
    const [filter, setFilter] = useState(searchFilter);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        searchFilter ? setFilter(searchFilter.trim()) : setFilter('');
    }, [searchFilter]);

    useEffect(() => {
        const exercisesApi = new ExercisesApi();
        const exercisesData = exercisesApi.getAllExercises();
        if (exercisesData.length) {
            const filteredExercisesData = exercisesData.filter((exercise) =>
                exercise.title.includes(filter)
            );
            setExercises(filteredExercisesData);
        }
    }, [filter]);

    return (
        <div>
            <ExercicioCardGroup>
                {exercises.map((exercise) => (
                    <ExercicioCard key={exercise.id} exercise={exercise}/>
                ))}
            </ExercicioCardGroup>
        </div>
    );
};

export default Home;