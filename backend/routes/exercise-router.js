const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'components/exercise-component/uploads/' });

const responseStatusCode = require('../entity/response-status-code');
const applyResult = require('../entity/apply-result');

const ExerciseComponent = require('../components/exercise-component/exercise-component');
const ExerciseRepository = require('../components/exercise-component/data/exercise-repository');

router.get('/category/:categoryId', async (req, res) => {
    const exerciseComponent = new ExerciseComponent(new ExerciseRepository());
    const result = await exerciseComponent.getExercisesByCategory(req?.params?.categoryId);
    applyResult(result, res, responseStatusCode.OK);
});

router.get('/:exerciseId', async (req, res) => {
    const exerciseComponent = new ExerciseComponent(new ExerciseRepository());
    const result = await exerciseComponent.getExerciseById(req?.params?.exerciseId);
    applyResult(result, res, responseStatusCode.OK);
});

router.post('/', upload.single('image'), async (req, res) => {
    const exerciseComponent = new ExerciseComponent(new ExerciseRepository());
    const result = await exerciseComponent.addExercise(req?.body, req?.file);
    applyResult(result, res, responseStatusCode.CREATED);
});

router.put('/:exerciseId', upload.single('image'), async (req, res) => {
    const exerciseComponent = new ExerciseComponent(new ExerciseRepository());
    const result = await exerciseComponent.editExercise(req?.body, req?.file, req?.params?.exerciseId);
    applyResult(result, res, responseStatusCode.ACCEPTED);
});

router.delete('/:exerciseId', async (req, res) => {
    const exerciseComponent = new ExerciseComponent(new ExerciseRepository());
    const result = await exerciseComponent.removeExercise(req?.params?.exerciseId);
    applyResult(result, res, responseStatusCode.ACCEPTED);
});

module.exports = router;