import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ExercisesApi from "../../api/execise";
import {useNavigate, useParams} from "react-router-dom";
import { message } from 'antd';
import TextArea from "../../components/TextArea/TextArea";
import {useState, useEffect} from "react";

const EditExercise = () => {
    const navigate = useNavigate();
    const [exerciseData, setExerciseData] = useState({});
    const { exerciseId: routeExerciseId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();

    const messageError = () => {
        messageApi.error('Todos parâmetros devem ser preenchidos');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercisesApi = ExercisesApi.getInstance();
                const exerciseDataResult = await exercisesApi.getExerciseById(routeExerciseId);
                if (exerciseDataResult?.image) {
                    const blob = new Blob([exerciseDataResult?.image], { type: 'image/jpeg' });
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        exerciseDataResult.image = reader.result
                    }
                    reader.readAsDataURL(blob);
                }
                setExerciseData(exerciseDataResult);
            } catch (error) {
                console.error('Erro ao buscar dados do exercicio', error);
            }
        }
        fetchData();
    }, [routeExerciseId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = e.target;
        const exercisesApi = ExercisesApi.getInstance();
        const formData = new FormData();
        formData.append('name', inputs.name.value);
        formData.append('description', inputs.description.value);
        formData.append('image', inputs.image.files[0]);
        formData.append('category_id', inputs.category.value);
        for (let [key, value] of formData.entries()) {
            if (!value || value === '' || value === 'undefined') {
                console.log(key)
                messageError()
                return;
            }
        }
        exercisesApi.editExercise(formData, routeExerciseId);
        navigate('/');
    };

    return (
        <Form handleSubmit={handleSubmit}>
            {contextHolder}
            <Input name={'name'} type={'text'} label={'Nome'} value={exerciseData?.name}/>
            <TextArea name={'description'} label={'Descrição'} value={exerciseData?.description}/>
            <Input name={'category'} type={'number'} label={'Categoria'} value={exerciseData?.category_id} /> {/* TODO Virar um select podendo escolher uma categoria */}
            <Input name={'image'} type={'file'} label={'Imagem'} value={exerciseData?.image}/>
            <Button type={'submit'} text={'Cadastrar'} />
        </Form>
    );
}

export default EditExercise;