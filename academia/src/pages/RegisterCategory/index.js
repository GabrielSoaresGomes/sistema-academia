import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import CategoriesApi from "../../api/category";
import { useNavigate } from "react-router-dom";
import {message, Modal} from 'antd';
import TextArea from "../../components/TextArea/TextArea";

const RegisterCategory = ({modalOpen, handleModalChange}) => {
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
        categoriesApi.addCategory(formData);
        handleModalChange('');
    };

    return (
        <Modal
            open={modalOpen === '/add/category'}
            onCancel={() => handleModalChange('')}
            footer={null}
        >
            <Form handleSubmit={handleSubmit}>
                {contextHolder}
                <Input name={'name'} type={'text'} label={'Nome'} />
                <TextArea name={'description'} label={'Descrição'}/>
                <Input name={'image'} type={'file'} label={'Imagem'} />
                <Button type={'submit'} text={'Cadastrar'} />
            </Form>
        </Modal>
    )
}

export default RegisterCategory;