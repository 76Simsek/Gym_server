const express = require('express');
const { getGym } = require('../controllers/gym');
const { getPlan } = require('../controllers/gym');
const { getWorkout } = require('../controllers/gym');
const { getPlanWorkout } = require('../controllers/gym');
const { addPlan } = require('../controllers/gym');
const { addUebung } = require('../controllers/gym');

const router = express.Router();

router.get('/gym', getGym);
router.get('/gym/:id', getPlan);
router.get('/workout', getWorkout);
router.get('/workout/:id', getPlanWorkout);
router.post('/gym', addPlan);
router.post('/workout', addUebung);

module.exports = router;
