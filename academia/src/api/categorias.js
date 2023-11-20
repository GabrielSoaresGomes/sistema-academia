const baseUrl = 'http://localhost:2004/api/category/';


class CategoriesApi {
    _constructor() {
    }

    static instance = new CategoriesApi();

    static getInstance() {
        return this.instance;
    }

    async getCategories() {
        const response = await fetch(`${baseUrl}`, {method: 'GET'});
        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Erro na requisição. Código de status: ${response.status}`);
            return null;
        }
    }
}

export default CategoriesApi;