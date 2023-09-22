import axios from "axios";

class ExercisesApi {
    constructor() {
        this.baseUrl = 'http://localhost';
        this.exercises = [
            {
                id: 1,
                title: 'Remada baixa',
                description: ' Remada baixa nada mais é que um exercício com o objetivo de trabalhar os músculos dorsais. Apesar disto, outros músculos, como os flexores do cotovelo, têm participação significativa quando a pessoa pratica este tipo de exercício.',
                thumbnail_url: 'https://blog.lionfitness.com.br/wp-content/uploads/2019/01/Blog-75-1.jpg',
                primary_image_url: 'https://i.ytimg.com/vi/6uSkfRxfrmM/maxresdefault.jpg',
                secondary_image_url: 'https://blog.lionfitness.com.br/wp-content/uploads/2019/01/Blog-75-1.jpg',
                video_url: 'https://www.youtube.com/watch?v=mUgFn3aMAP4'
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