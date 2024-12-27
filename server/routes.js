 
const express = require("express");
const routes = express.Router();
const serverController = require("./controllers/server-controller");

routes.post("/login", serverController.loginService);
routes.post("/config-ui-login", serverController.configlogin);
routes.get("/config-menu", serverController.config);
routes.get("/configMap", serverController.configMap);
routes.get("/staticKeys", serverController.staticKeys);
routes.get("/supplierConfig", serverController.supplierConfig);
routes.get("/configList", serverController.configList);
routes.post("/getAllLocations", serverController.getAllLocations);
routes.get("/getLocationById/:id" , serverController.getLocationById);
routes.post("/getStaffListHours",serverController.getStaffListHours);
routes.post("/postNewAppointment", serverController.postNewAppointment);
routes.get("/fetchAppointmentById/:id",serverController.fetchNewAppointment);

module.exports = routes;