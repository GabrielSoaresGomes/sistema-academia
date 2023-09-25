import axios from "axios";

class ExercisesApi {
    constructor() {
        this.baseUrl = 'http://localhost';
        this.exercises = [
            {
                id: 1,
                title: 'Remada baixa',
                description: 'Remada baixa nada mais é que um exercício com o objetivo de trabalhar os músculos dorsais. Apesar disto, outros músculos, como os flexores do cotovelo, têm participação significativa quando a pessoa pratica este tipo de exercício.',
                thumbnail_url: 'https://blog.lionfitness.com.br/wp-content/uploads/2019/01/Blog-75-1.jpg',
                primary_image_url: 'https://i.ytimg.com/vi/6uSkfRxfrmM/maxresdefault.jpg',
                secondary_image_url: 'https://blog.lionfitness.com.br/wp-content/uploads/2019/01/Blog-75-1.jpg',
                video_url: 'https://www.youtube.com/embed/mUgFn3aMAP4'
            },
            {
                id: 2,
                title: 'Supino reto com barra',
                description: 'Supino é um exercício multiarticulares, ou seja, que envolve várias articulações, que tem como ênfase o trabalho do músculo peitoral maior. Muito usado por quem busca estética e também performance, é considerado um dos melhores exercícios para os treinos de peitoral.',
                thumbnail_url: 'data:image/jpeg;base64,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',
                primary_image_url: 'https://www.hipertrofia.org/blog/wp-content/uploads/2017/04/at%C3%A9-onde-descer-a-barra-no-supino.jpg',
                secondary_image_url: 'https://www.smartfit.com.br/news/wp-content/uploads/2016/06/supino-reto.jpg',
                video_url: 'https://www.youtube.com/embed/fG_03xSzT2s'
            },
        ]
    }

    getAllExercises() {
        try {
            // axios.get(`${this.baseUrl}/exercicios/`)
            //     .then(response => {
            //         return response.data;
            //     });

            return this.exercises;
        } catch (error) {
            console.log('Erro ao tentar fazer requisição GET para exercicios');
            return null;
        }
    }

    getExerciseById(exerciseId) {
        try {
            return this.exercises.find(exercise => parseInt(exercise.id) === parseInt(exerciseId));
        } catch (error) {
            console.log('Erro ao pegar atividade pelo id');
        }
    }

    addExercise(exerciseData) {
        try {
            this.exercises.push({
                id: this.exercises.length + 1,
                ...exerciseData
            });
        } catch (error) {
            console.log('Erro ao tentar fazer requisição POST para exercicios');
            return null;
        }
    }
}

export default ExercisesApi;