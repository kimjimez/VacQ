const express = require('express');
const { getHospitals, createHospital, updateHospital, getHospital, deleteHospital, getVacCenters } = require("../controllers/hospitals");

//Include other resource routers
const appointmentRouter = require('./appointments');

const router = express.Router();
const {protect, authorize} = require('../middleware/auth');
//Include other resource routers
const appointmentRouter = require('./appointments');

//Re-route into other resource routers
router.use('/:hospitalId/appointments/', appointmentRouter);

//Re-route into other resource routers
router.use('/:hospitalId/appointments/', appointmentRouter);
router.route("/vacCenters").get(getVacCenters);
router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize('admin'), updateHospital).delete(protect, authorize('admin'), deleteHospital);
router.use("/:hospitalId/appointments/", appointmentRouter);

module.exports=router;

