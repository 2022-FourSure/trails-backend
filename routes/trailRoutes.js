const router = require('express').Router()
const trailCtrl = require('../controllers/trailController');
const upload = require('../utils/multer');

router.get('/', trailCtrl.index);
router.get('/new', trailCtrl.showNewTrailForm);
router.post('/', upload.single('image'), trailCtrl.create);
router.get('/:id', trailCtrl.show);
router.get('/:id/edit', trailCtrl.showEditTrailForm);
router.patch('/:id', trailCtrl.update);
router.delete('/:id', trailCtrl.deleteTrail);

module.exports = router