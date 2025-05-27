
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
routes.post("/kv-citas-login", serverController.citasLogin);
routes.post("/getAllLocations", serverController.getAllLocations);
routes.delete("/deleteLocation/:id", serverController.deleteLocation);
routes.post("/addLocation", serverController.addLocation);
routes.get("/getAllServices",serverController.getAllServices);
routes.post("/addService",serverController.addService);
routes.delete("/deleteService/:id",serverController.deleteService);
routes.get("/fetchStaff", serverController.fetchStaff);
routes.post("/addStaff", serverController.addStaff);
routes.delete("/deleteStaff/:id", serverController.deleteStaff);
routes.post("/updateService", serverController.updateService);
routes.post("/updateLocation", serverController.updateLocation);
routes.get("/fetchServiceStaffDetails/:id", serverController.fetchServiceStaffDetails);

module.exports = routes;
