import { useEffect, useState } from "react";
import ExercicioCardGroup from "../../components/ExercicioCardGroup";
import ExercicioCard from "../../components/ExercicioCard";
import ExercisesApi from "../../api/exercicios";
import H1 from "../../layout/H1/H1";

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
            <H1 text={'Exercicios'} />
            <ExercicioCardGroup>
                {exercises.map((exercise) => (
                    <ExercicioCard key={exercise.id} exercise={exercise}/>
                ))}
            </ExercicioCardGroup>
        </div>
    );
};

export default Home;