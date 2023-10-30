const asyncHandler = require('express-async-handler');
const gym = require('../model/gym.js');

const getGym = asyncHandler(async (req, res) => {
  res.status(200).json(await gym.getGym());
});

const getPlan = asyncHandler(async (req, res) => {
  res.status(200).json(await gym.getPlan(req.params.id));
});

const getWorkout = asyncHandler(async (req, res) => {
  res.status(200).json(await gym.getWorkout());
});

const getPlanWorkout = asyncHandler(async (req, res) => {
  res.status(200).json(await gym.getPlanWorkout(req.params.id));
});

const addPlan = asyncHandler(async (req, res) => {
  res.status(200).json(await gym.addPlan(req.body));
});

const addUebung = asyncHandler(async (req, res) => {
  res.status(200).json(await gym.addUebung(req.body));
});

module.exports = {
  getGym,
  getPlan,
  getWorkout,
  getPlanWorkout,
  addPlan,
  addUebung,
};
