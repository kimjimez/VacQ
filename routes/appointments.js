<<<<<<< HEAD
const express = require('express');
const {getAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment} = require('../controllers/appointments');
const router = express.Router({mergeParams:true});
const {protect, authorize}=require('../middleware/auth');
=======
const express = require('express')

const {getAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment} = require('../controllers/appointments');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

>>>>>>> 5545f80 (add VacCenter API)
router.route('/')
    .get(protect, getAppointments)
    .post(protect, authorize('admin', 'user'), addAppointment);
router.route('/:id')
    .get(protect, getAppointment)
    .put(protect, authorize('admin', 'user'), updateAppointment)
    .delete(protect, authorize('admin', 'user'), deleteAppointment);
<<<<<<< HEAD
module.exports=router;
=======

module.exports = router;
>>>>>>> 5545f80 (add VacCenter API)
