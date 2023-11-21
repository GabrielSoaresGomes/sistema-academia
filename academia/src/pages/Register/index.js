import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ExercisesApi from "../../api/execise";
import CategoriesApi from "../../api/category";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import TextArea from "../../components/TextArea/TextArea";
import Select from "../../components/Select";
import {useEffect, useState} from "react";

const Register = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const messageError = () => {
        messageApi.error('Todos parâmetros devem ser preenchidos');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = e.target;
        const exercisesApi = ExercisesApi.getInstance();
        const formData = new FormData();
        formData.append('name', inputs.name.value);
        formData.append('description', inputs.description.value);
        formData.append('image', inputs.image?.files[0]);
        formData.append('category_id', inputs.category.value);
        for (let [key, value] of formData.entries()) {
            if (!value || value === '' || value === 'undefined') {
                messageError()
                return;
            }
        }
        exercisesApi.addExercise(formData);
        navigate('/');
    };

    useEffect(() => {
        const fetchOptions = async () => {
            const categoriesApi = CategoriesApi.getInstance();
            const categoriesDataResult = await categoriesApi.getCategories();
            setOptions(categoriesDataResult);
        };
        fetchOptions();
    }, []);

    return (
        <Form handleSubmit={handleSubmit}>
            {contextHolder}
            <Input name={'name'} type={'text'} label={'Nome'} />
            <TextArea name={'description'} label={'Descrição'}/>
            <Select name={'category'} label={'Categoria'} options={options}/>
            <Input name={'image'} type={'file'} label={'Imagem'} />
            <Button type={'submit'} text={'Cadastrar'} />
        </Form>
    )
}

export default Register;