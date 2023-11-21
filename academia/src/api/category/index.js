const baseUrl = 'http://localhost:2004/api/category/';


class CategoriesApi {
    _constructor() {
    }

    static instance = new CategoriesApi();

    static getInstance() {
        return this.instance;
    }

    async getCategories() {
        try {
            const response = await fetch(`${baseUrl}`, {method: 'GET'});
            if (response.ok) {
                return await response?.json();
            } else {
                console.error(`Erro na requisição. Código de status: ${response.status}`);
                return [];
            }
        } catch (error) {
            console.log('Erro ao tentar fazer requisição GET para categorias', error);
            return [];
        }

    }

    async deleteCategoryById(categoryId) {
        try {
            fetch(`http://localhost:2004/api/category/${categoryId}`, {
                method: 'DELETE'
            }).then(r => console.log(r.statusText));
        } catch (error) {
            console.log('Erro ao tentar fazer requisição DELETE para categorias ', error);
            return null;
        }
    }

    addCategory(categoryData) {
        try {
            fetch('http://localhost:2004/api/category/', {
                method: 'POST',
                body: categoryData
            }).then(r => console.log(r.statusText));
        } catch (error) {
            console.log('Erro ao tentar fazer requisição POST para categorias ', error);
            return null;
        }
    }
}

export default CategoriesApi;