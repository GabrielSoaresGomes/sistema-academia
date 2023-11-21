const ResultValidation = require('../../entity/result-validation');
const fs = require('fs');

class CategoryComponent {
    constructor(repository) {
        this.repository = repository;
    }

    async getAllCategories(){
        const resultValidation = new ResultValidation();

        try {
            const result = await this.repository.selectAllCategories();
            for (const category of result) {
                if (category?.image) {
                    category.image = `data:image/jpeg;base64,${Buffer.from(category?.image).toString('base64')}`;
                }
            }
            resultValidation.setResult(result);
        }catch (error) {
            console.log('Falha ao listar todas categorias', error);
            resultValidation.addError('GET_ERROR', 'Falha ao listar todas categorias');
        }
        return resultValidation;
    }

    async getCategoryById(categoryId) {
        const resultValidation = new ResultValidation();
        try {
            const result = await this.repository.selectCategoryById(categoryId);
            if (result?.image) {
                result.image = `data:image/jpeg;base64,${Buffer.from(result?.image).toString('base64')}`;
            }
            resultValidation.setResult(result);
        } catch (error) {
            console.log('Falha ao listar categoria', error);
            resultValidation.addError('GET_ERROR', 'Falha ao listar categoria');
        }
        return resultValidation;
    }

    async addCategory(categoryData, categoryImage) {
        const resultValidation = new ResultValidation();
        try {
            let file;
            if (categoryImage?.path) {
                const path = `${categoryImage?.path}`;
                file = await fs.readFileSync(path);
                await fs.unlinkSync(path);
            }
            const result = await this.repository.insertCategory(categoryData, file);
            resultValidation.setResult(result);
        } catch (error) {
            console.log('Falha ao adicionar uma nova categoria', error);
            resultValidation.addError('CREATE_ERROR', 'Falha ao adicionar um novo exercício');
        }
        return resultValidation;
    }

    async editCategory(categoryId, categoryData, categoryImage) {
        const resultValidation = new ResultValidation();
        try {
            let file;
            if (categoryImage?.path) {
                const path = `${categoryImage?.path}`;
                file = await fs.readFileSync(path);
                await fs.unlinkSync(path);
            }
            const result = await this.repository.updateCategory(categoryId, categoryData, file);
            if (result) {
                resultValidation.setResult(result);
            } else {
                resultValidation.addError('UPDATE_ERROR', 'Não foi possível editar a categoria solicitada');
                console.log(`Não foi feito nenhuma mudança para a categoria de id ${categoryId}`);
            }
        } catch (error) {
            console.log(`Falha ao editar uma categoria de id ${categoryId} com os dados ${categoryData}`, error);
            resultValidation.addError('UPDATE_ERROR', 'Falha ao editar uma categoria');
        }
        return resultValidation;
    }

    async removeCategory(categoryId) {
        const resultValidation = new ResultValidation();
        try {
            const result = await this.repository.deleteCategory(categoryId);
            resultValidation.setResult(result);
        } catch (error) {
            console.log(`Falha ao apagar uma categoria de id ${categoryId}`, error);
            resultValidation.addError('DELETE_ERROR', 'Falha ao apagar uma categoria');
        }
        return resultValidation;
    }

}

module.exports = CategoryComponent;