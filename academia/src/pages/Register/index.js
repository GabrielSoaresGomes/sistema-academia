import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ExercisesApi from "../../api/exercicios";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import TextArea from "../../components/TextArea/TextArea";

const Register = () => {
    const navigate = useNavigate();
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
        formData.append('image', inputs.image.files[0]);
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

    return (
        <Form handleSubmit={handleSubmit}>
            {contextHolder}
            <Input name={'name'} type={'text'} label={'Nome'} />
            <TextArea name={'description'} label={'Descrição'}/>
            <Input name={'category'} type={'number'} label={'Categoria'} /> {/* TODO Virar um select podendo escolher uma categoria */}
            <Input name={'image'} type={'file'} label={'Imagem'} />
            <Button type={'submit'} text={'Cadastrar'} />
        </Form>
    )
}

export default Register;