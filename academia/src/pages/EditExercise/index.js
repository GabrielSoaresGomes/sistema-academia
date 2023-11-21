import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import {Button as ButtonAntd, Modal} from 'antd';
import ExercisesApi from "../../api/execise";
import { message } from 'antd';
import TextArea from "../../components/TextArea/TextArea";
import {useState, useEffect} from "react";
import Select from "../../components/Select";
import CategoriesApi from "../../api/category";

const EditExercise = ({exerciseId, handleChangeEditingExercise}) => {
    const [exerciseData, setExerciseData] = useState({});
    const [imageChanged, setImageChanged] = useState(false);
    const [options, setOptions] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const messageError = () => {
        messageApi.error('Todos parâmetros devem ser preenchidos');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercisesApi = ExercisesApi.getInstance();
                const exerciseDataResult = await exercisesApi.getExerciseById(exerciseId, true);
                if (!exerciseDataResult?.image) {
                    setImageChanged(true);
                }
                setExerciseData(exerciseDataResult);
            } catch (error) {
                console.error('Erro ao buscar dados do exercicio', error);
            }
        }
        fetchData();
    }, [exerciseId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = e.target;
        const exercisesApi = ExercisesApi.getInstance();
        const formData = new FormData();
        formData.append('name', inputs.name.value);
        formData.append('description', inputs.description.value);
        if (imageChanged) {
            formData.append('image', inputs.image.files[0]);
        }else{
            formData.append('image', new Blob([exerciseData?.data], { type: 'image/jpeg' }));
        }
        formData.append('category_id', inputs.category.value);
        for (let [key, value] of formData.entries()) {
            if (!value || value === '' || value === 'undefined') {
                console.log(key)
                messageError()
                return;
            }
        }
        exercisesApi.editExercise(formData, exerciseId);
        handleChangeEditingExercise(null);
    };

    useEffect(() => {
        const fetchOptions = async () => {
            const categoriesApi = CategoriesApi.getInstance();
            const categoriesDataResult = await categoriesApi.getCategories();
            setOptions(categoriesDataResult);
        };
        fetchOptions();
    }, []);

    const handleOnClick = () => {
        setImageChanged(true);
    };

    return (
        <>
        {
            exerciseData?.id &&
            <Modal
                open={exerciseId !== null}
                onCancel={() => handleChangeEditingExercise(null)}
                footer={null}
            >
                <Form handleSubmit={handleSubmit}>
                    {contextHolder}
                    <Input name={'name'} type={'text'} label={'Nome'} value={exerciseData?.name}/>
                    <TextArea name={'description'} label={'Descrição'} value={exerciseData?.description}/>
                    <Select name={'category'} label={'Categoria'} options={options} selected={exerciseData?.category_id}/>
                    {
                        imageChanged
                        ?
                            <Input name={'image'} type={'file'} label={'Imagem'} value={''}/>
                        :
                            <div className={'mb-3 d-flex flex-column align-items-center'}>
                                <ButtonAntd onClick={() => handleOnClick()}>Alterar imagem</ButtonAntd>
                            </div>
                    }
                    <Button type={'submit'} text={'Editar'} />
                </Form>
            </Modal>
        }
        </>
    );
}

export default EditExercise;