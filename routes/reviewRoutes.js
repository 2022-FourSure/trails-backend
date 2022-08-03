const router = require('express').Router();
const reviewCtrl = require('../controllers/reviewController');

router.post('/:id/reviews', reviewCtrl.create)
router.delete('/:id/reviews/:reviewId', reviewCtrl.deleteReview)

module.exports = router