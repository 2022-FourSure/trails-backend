const router = require('express').Router();
const reviewCtrl = require('../controllers/reviewController');

router.get('/trails/:id/reviews', reviewCtrl.index)
router.post('trails/:id/reviews', reviewCtrl.create)
router.delete('reviews/:id', reviewCtrl.create)


module.exports = router