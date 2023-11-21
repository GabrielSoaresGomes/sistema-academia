import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import CategoryApi from "../../api/category";
import {useNavigate, useParams} from "react-router-dom";
import { message } from 'antd';
import TextArea from "../../components/TextArea/TextArea";
import {useState, useEffect} from "react";

const EditCategory = () => {
    const navigate = useNavigate();
    const [exerciseData, setExerciseData] = useState({});
    const { categoryId: routeCategoryId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();

    const messageError = () => {
        messageApi.error('Todos parâmetros devem ser preenchidos');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryApi = CategoryApi.getInstance();
                const exerciseDataResult = await categoryApi.getCategoryById(routeCategoryId);
                setExerciseData(exerciseDataResult);
            } catch (error) {
                console.error('Erro ao buscar dados do exercicio', error);
            }
        }
        fetchData();
    }, [routeCategoryId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = e.target;
        const categoryApi = CategoryApi.getInstance();
        const formData = new FormData();
        formData.append('name', inputs.name.value);
        formData.append('description', inputs.description.value);
        formData.append('image', inputs.image.files[0]);
        for (let [key, value] of formData.entries()) {
            if (!value || value === '' || value === 'undefined') {
                console.log(key)
                messageError()
                return;
            }
        }
        categoryApi.editCategory(formData, routeCategoryId);
        navigate('/');
    };

    return (
        <Form handleSubmit={handleSubmit}>
            {contextHolder}
            <Input name={'name'} type={'text'} label={'Nome'} value={exerciseData?.name}/>
            <TextArea name={'description'} label={'Descrição'} value={exerciseData?.description}/>
            <Input name={'image'} type={'file'} label={'Imagem'} value={exerciseData?.image}/>
            <Button type={'submit'} text={'Cadastrar'} />
        </Form>
    );
}

export default EditCategory;