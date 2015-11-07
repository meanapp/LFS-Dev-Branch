var express = require('express');
var router = express.Router();
var loginController = require('./controllers/LoginController.js');
var projectController = require('./controllers/ProjectController.js');
var userController = require('./controllers/UserController.js');
var leaveController = require('./controllers/LeaveController.js');

//login Route with token generator
router.post('/login', loginController.login);
router.post('/forgotPassword', loginController.forgotPassword);

//Project routes
router.post('/addProject', projectController.addProject);
router.get('/getProjects', projectController.getProjects);
router.get('/getProjectsForManager/:id', projectController.getProjectsForManager);
router.put('/api/v1/admin/updateProjectManager/:id', projectController.updateProjectManager);
router.put('/api/v1/admin/updateProjectName/:id', projectController.updateProjectName);
router.delete('/api/v1admin/deleteProject/:id', projectController.deleteProject);
router.put('/addProjectToManager/:id/:projectId', userController.addProjectToManager);

//Login routes for updating
router.put('/updatePassword/:id', loginController.updatePassword);
router.post('/changePassword', loginController.changePassword);


//User model routes
router.post('/addUser', userController.addUser);
router.get('/getUserDetails/:id', userController.getUserDetails);
router.get('/getAllUsersByProject/:id', userController.getAllUsersByProject);
router.put('/changeProject/:id', userController.changeProject);
router.put('/updateFirstAndLastName/:id', userController.updateFirstAndLastName);
router.put('/updateRole/:id', userController.updateRole);

//Leave model routes
router.post('/createLeave', leaveController.createLeave);
router.get('/getLeaveRecordsByUserId/:id', leaveController.getLeaveRecordsByUserId);
router.get('/getLeaveRecordByProject/:id', leaveController.getLeaveRecordByProject);
router.get('/getPendingLeaveRecordByProject/:id', leaveController.getPendingLeaveRecordByProject);
router.post('/updateLeaveStatus', leaveController.updateLeaveStatus);
router.put('/cancelLeaveRecord/:id', leaveController.cancelLeaveRecord);
router.get('/getLeaveRecordById/:id', leaveController.getLeaveRecordById);
router.post('/cancelAndCreateLeave', leaveController.cancelAndCreateLeave);

module.exports = router;