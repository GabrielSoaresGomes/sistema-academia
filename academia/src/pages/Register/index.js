import Input from "../../components/Input";
import ExercicioForm from "../../components/ExercicioForm";
import Button from "../../components/Button";
import ExercisesApi from "../../api/exercicios";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

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
        const exerciseData = {
            title: inputs[0]?.value,
            description: inputs[1]?.value,
            thumbnail_url: inputs[2]?.value,
            primary_image_url: inputs[3]?.value,
            secondary_image_url: inputs[4]?.value,
            video_url: inputs[5]?.value,

        };
        for (const value of Object.values(exerciseData)) {
            if (!value || value === '') {
                messageError()
                return;
            }
        }
        exercisesApi.addExercise(exerciseData);
        navigate('/');
    };

    return (
        <ExercicioForm handleSubmit={handleSubmit}>
            {contextHolder}
            <Input name={'Titulo'} type={'text'} label={'Título'} />
            <Input name={'Descricao'} type={'text'} label={'Descrição'} />
            <Input name={'Thumbnail'} type={'url'} label={'Thumbnail'} />
            <Input name={'ImagemPrincipal'} type={'url'} label={'Imagem principal'} />
            <Input name={'ImagemSecundaria'} type={'url'} label={'Imagem secundaria'} />
            <Input name={'Video'} type={'url'} label={'Vídeo'} />
            <Button type={'submit'} text={'Cadastrar'} />
        </ExercicioForm>
    )
}

export default Register;