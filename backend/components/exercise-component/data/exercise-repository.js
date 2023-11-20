const DatabaseConnector = require('./connectors/database-connector');


class ExerciseRepository {
    constructor() {
        this.databaseConnector = new DatabaseConnector();
    }

    async selectExercisesByCategory(categoryId) {
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            SELECT e.id, e.name, e.description, e.image, e.category_id
            FROM exercise e
            WHERE deleted_at is null
            AND category_id = $1
        `, [categoryId]);
        return result?.rows;
    }

    async selectExerciseById(exerciseId) {
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            SELECT e.id, e.name, e.description, e.image, e.category_id
            FROM exercise e
            WHERE deleted_at is null
            AND id = $1
        `, [exerciseId]);
        return result?.rows?.[0] || {};
    }

    async insertExercise(exerciseData, exerciseImage) {
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            INSERT INTO exercise (name, description, image, category_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `, [exerciseData?.name, exerciseData?.description, exerciseImage, exerciseData?.category_id]);
        return result?.rows?.[0];
    }

    async updateExercise(exerciseData, exerciseImage, exerciseId) {
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            UPDATE exercise
            SET name = $1,
                description = $2,
                image = $3,
                category_id = $4
            WHERE deleted_at is null
            AND id = $5
            RETURNING id
        `, [exerciseData?.name, exerciseData?.description, exerciseImage, exerciseData?.category_id, exerciseId]);
        return result?.rows?.[0];
    }

    async deleteExercise(exerciseId) {
        const connection = await this.databaseConnector.generateConnection();
        const result = await connection.query(`
            UPDATE exercise
            SET deleted_at = now()
            WHERE deleted_at is null
            AND id = $1
            RETURNING id
        `, [exerciseId]);
        return result?.rows?.[0];
    }
}

module.exports = ExerciseRepository;