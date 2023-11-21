import { useEffect, useState } from "react";
import CardGroup from "../../components/CardGroup";
import Card from "../../components/Card";
import ExercisesApi from "../../api/execise";
import CategoryApi from "../../api/category";
import H1 from "../../layout/H1/H1";
import './index.css';
import {useParams} from "react-router-dom";
import cone from '../../assets/cone-striped.svg';


const Category = ({handleChangeEditingExercise}) => {
    const { categoryId: routeCategoryId } = useParams();
    const [categoryData, setCategoryData] = useState({});
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

    useEffect(() => {
        const fetchData = async () => {
            const categoryApi = CategoryApi.getInstance();
            const categoryDataResult = await categoryApi.getCategoryById(routeCategoryId);
            setCategoryData(categoryDataResult);
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
        handleChangeEditingExercise(exerciseId);
    }

    return (
        <div className={'empty-div-own'}>
            {
                exercises.length ?
                    <>
                        <H1 text={`Exercícios para o ${categoryData?.name}`}/>
                        <div className={'mx-auto'} style={{ width: 1200 }}>
                            <h3 className={'text-white'}></h3>
                        </div>
                        <CardGroup>
                            {exercises.map((exercise) => (
                                <Card handleEdit={() => handleEdit(exercise?.id)} handleDelete={() => handleDelete(exercise?.id)} key={exercise.id} item={exercise} to={`exercise/${exercise.id}`}/>
                            ))}
                        </CardGroup>
                    </>
                :
                    <div className={'empty-div-own'}>

                        <p className={'empty-message'}><img className={'img-empty'} src={cone} alt=""/>Não foi adicionado nenhum exercicio para a categoria de id {routeCategoryId}<img className={'img-empty'} src={cone} alt=""/></p>
                    </div>
            }
        </div>
    );
};

export default Category;