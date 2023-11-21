import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import CategoryApi from "../../api/category";
import {useNavigate, useParams} from "react-router-dom";
import {Button as ButtonAntd, message, Modal} from 'antd';
import TextArea from "../../components/TextArea/TextArea";
import {useState, useEffect} from "react";

const EditCategory = ({categoryId, handleChangeEditingCategory}) => {
    const [categoryData, setCategoryData] = useState({});
    const [imageChanged, setImageChanged] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const messageError = () => {
        messageApi.error('Todos parâmetros devem ser preenchidos');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryApi = CategoryApi.getInstance();
                const CategoryDataResult = await categoryApi.getCategoryById(categoryId);
                setCategoryData(CategoryDataResult);
            } catch (error) {
                console.error('Erro ao buscar dados da categoria', error);
            }
        }
        fetchData();
    }, [categoryId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = e.target;
        const categoryApi = CategoryApi.getInstance();
        const formData = new FormData();
        formData.append('name', inputs.name.value);
        formData.append('description', inputs.description.value);
        if (imageChanged) {
            formData.append('image', inputs.image.files[0]);
        }else{
            formData.append('image', new Blob([categoryData?.data], { type: 'image/jpeg' }));
        }
        for (let [key, value] of formData.entries()) {
            if (!value || value === '' || value === 'undefined') {
                console.log(key)
                messageError()
                return;
            }
        }
        categoryApi.editCategory(formData, categoryId);
        handleChangeEditingCategory(null);
    };

    const handleOnClick = () => {
        setImageChanged(true);
    };

    return (
        <Modal
            open={categoryId !== null}
            onCancel={() => handleChangeEditingCategory(null)}
            footer={null}
        >
            <Form handleSubmit={handleSubmit}>
                {contextHolder}
                <Input name={'name'} type={'text'} label={'Nome'} value={categoryData?.name}/>
                <TextArea name={'description'} label={'Descrição'} value={categoryData?.description}/>
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
    );
}

export default EditCategory;