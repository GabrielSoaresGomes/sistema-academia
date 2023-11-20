import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import CategoriesApi from "../../api/exercicios";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import TextArea from "../../components/TextArea/TextArea";

const RegisterCategorie = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const messageError = () => {
        messageApi.error('Todos parâmetros devem ser preenchidos');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = e.target;
        const categoriesApi = CategoriesApi.getInstance();
        const formData = new FormData();
        formData.append('name', inputs.name.value);
        formData.append('description', inputs.description.value);
        formData.append('image', inputs.image.files[0]);
        for (let [key, value] of formData.entries()) {
            if (!value || value === '' || value === 'undefined') {
                messageError()
                return;
            }
        }
        categoriesApi.addCategorie(formData);
        navigate('/');
    };

    return (
        <Form handleSubmit={handleSubmit}>
            {contextHolder}
            <Input name={'name'} type={'text'} label={'Nome'} />
            <TextArea name={'description'} label={'Descrição'}/>
            <Input name={'image'} type={'file'} label={'Imagem'} />
            <Button type={'submit'} text={'Cadastrar'} />
        </Form>
    )
}

export default RegisterCategorie;