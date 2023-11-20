const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'components/category-component/uploads/' });


const responseStatusCode = require('../entity/response-status-code');
const applyResult = require('../entity/apply-result');

const CategoryComponent = require('../components/category-component/category-component');
const CategoryRepository = require('../components/category-component/data/category-repository');

router.get('/', async (req, res) => {
    const categoryComponent = new CategoryComponent(new CategoryRepository());
    const result = await categoryComponent.getAllCategories();
    applyResult(result, res, responseStatusCode.OK);
});

router.get('/:categoryId', async(req, res) => {
    const categoryComponent = new CategoryComponent(new CategoryRepository());
    const result = await categoryComponent.getCategoryById(req?.params?.categoryId);
    applyResult(result, res, responseStatusCode.OK);
});

router.post('/', upload.single('image'), async (req, res) => {
    const categoryComponent = new CategoryComponent(new CategoryRepository());
    const result = await categoryComponent.addCategory(req?.body, req?.file);
    applyResult(result, res, responseStatusCode.OK);
});

router.put('/:categoryId', upload.single('image'), async (req, res) => {
    const categoryComponent = new CategoryComponent(new CategoryRepository());
    const result = await categoryComponent.editCategory(req?.params?.categoryId, req?.body, req?.file);
    applyResult(result, res, responseStatusCode.ACCEPTED);
});

router.delete('/:categoryId', async (req, res) => {
    const categoryComponent = new CategoryComponent(new CategoryRepository());
    const result = await categoryComponent.removeCategory(req?.params?.categoryId);
    applyResult(result, res, responseStatusCode.ACCEPTED);
});

module.exports = router;