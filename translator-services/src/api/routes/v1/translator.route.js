const express = require('express');
const translatorController = require('../../controller/translator.controller');
const likesController = require('../../controller/likes.controller');

const router = express.Router();

router.route('/translate').post(translatorController.translate);

router.route('/languages').get(translatorController.languages);

router.route('/likes/add').post(likesController.addToLikesList);
router.route('/likes/:id').delete(likesController.removeFromLikesList);
router.route('/likes/list').get(likesController.getLikesList);

module.exports = router;
