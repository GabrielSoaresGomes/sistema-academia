const ResultValidation = require('../../entity/result-validation');
const fs = require('fs');


class ExerciseComponent {
    constructor(repository) {
        this.repository = repository;
    }

    async getExercisesByCategory(categoryId) {
        const resultValidation = new ResultValidation();
        try {
            const result = await this.repository.selectExercisesByCategory(categoryId);
            for (const exercise of result) {
                if (exercise?.image) {
                    exercise.image = `data:image/jpeg;base64,${Buffer.from(exercise?.image).toString('base64')}`;
                }
            }
            resultValidation.setResult(result);
        } catch (error) {
            console.log('Falha ao listar todos exercícios', error);
            resultValidation.addError('GET_ERROR', 'Falha ao listar todos exercícios');
        }
        return resultValidation;
    }

    async getExerciseById(exerciseId, imageRaw = 'false') {
        const resultValidation = new ResultValidation();
        try {
            const result = await this.repository.selectExerciseById(exerciseId);
            if (result?.image && imageRaw === 'false') {
                result.image = `data:image/jpeg;base64,${Buffer.from(result?.image).toString('base64')}`;
            }
            resultValidation.setResult(result);
        } catch (error) {
            console.log('Falha ao listar todos exercícios', error);
            resultValidation.addError('GET_ERROR', 'Falha ao listar todos exercícios');
        }
        return resultValidation;
    }

    async addExercise(exerciseData, exerciseImage) {
        const resultValidation = new ResultValidation();
        try {
            let file;
            if (exerciseImage?.path) {
                const path = `${exerciseImage?.path}`;
                file = await fs.readFileSync(path);
                await fs.unlinkSync(path);
            }
            const result = await this.repository.insertExercise(exerciseData, file);
            resultValidation.setResult(result);
        } catch (error) {
            console.log('Falha ao adicionar um novo exercício', error);
            resultValidation.addError('CREATE_ERROR', 'Falha ao adicionar um novo exercício');
        }
        return resultValidation;
    }

    async editExercise(exerciseData, exerciseImage, exerciseId) {
        const resultValidation = new ResultValidation();
        try {
            let file;
            if (exerciseImage?.path) {
                const path = `${exerciseImage?.path}`;
                file = await fs.readFileSync(path);
                await fs.unlinkSync(path);
            }
            const result = await this.repository.updateExercise(exerciseData, file, exerciseId);
            if (result) {
                resultValidation.setResult(result);
            } else {
                resultValidation.addError('UPDATE_ERROR', 'Não foi possível editar o exercicio solicitado');
                console.log(`Não foi feito nenhuma mudança para o exercicio de id ${exerciseId}`);
            }
        } catch (error) {
            console.log(`Falha ao editar um exercício de id ${exerciseId} com os dados ${exerciseData} `, error);
            resultValidation.addError('UPDATE_ERROR', 'Falha ao editar um exercício');
        }
        return resultValidation;
    }

    async removeExercise(exerciseId) {
        const resultValidation = new ResultValidation();
        try {
            const result = await this.repository.deleteExercise(exerciseId);
            if (result) {
                resultValidation.setResult(result);
            } else {
                resultValidation.addError('DELETE_ERROR', 'Não foi possível apagar o exercicio solicitado');
                console.log(`Não foi possivel apagar o exercicio de id ${exerciseId}`);
            }
        } catch (error) {
            console.log(`Falha ao apagar um exercício de id ${exerciseId} `, error);
            resultValidation.addError('DELETE_ERROR', 'Falha ao apagar um exercício');
        }
        return resultValidation;
    }


}

module.exports = ExerciseComponent;