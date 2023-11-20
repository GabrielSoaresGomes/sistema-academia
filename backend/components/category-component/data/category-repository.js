const DatabaseConnector = require('./connectors/database-connector');


class CategoryRepository {
    constructor() {
        this.databaseConnector = new DatabaseConnector();
    }

    async selectAllCategories (){
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            SELECT * 
            FROM category
        `);
        return result?.rows;
    }

    async selectCategoryById(categoryId) {
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            SELECT * 
            FROM category 
            WHERE id = $1
            AND deleted_at is null
        `, [categoryId]);
        return result?.rows;
    }

    async insertCategory(categoryData) {
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            INSERT INTO category (name, description, image)
            VALUES ($1, $2, $3)
        `, [categoryData?.name, categoryData?.description, categoryData?.image]);
        return result?.rows;
    }

    async updateCategory(categoryId, categoryData){
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            UPDATE category 
            SET name = $1,
            description = $2,
            image = $3
            WHERE id = $4
        `, [categoryData?.name, categoryData?.description, categoryData?.image, categoryId]);
        return result?.rows;
    }
}

module.exports = CategoryRepository;