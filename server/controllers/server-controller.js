const endpoints = require("../endpoints");
const { serviceReq, loginToken } = require("../axios-calls");
const FormData = require('form-data');
const logger = require("../logger");


var reactAppUrl = process && process.env && process.env.REACT_APP_BASE_URL;
var reactAppointyUrl = process && process.env && process.env.REACT_APPOINTY_BASE_URL;
module.exports = {
  loginService: async (req, res, next) => {
    res.send({message:'Welcome to my world'})
  },
  configlogin: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.configlogin}`;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "POST", req.body,req.headers,false);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  config: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.config}`;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  configMap: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.configMap}`;
    debugger;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  staticKeys: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.staticKeys}`;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  supplierConfig: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.supplierConfig}`;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  configList: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.configList}`;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  }, 
  getAllLocations: async (req, res, next) => {
  
    
    const pageNo = req.body.page ;
    const limitNo = req.body.limit;
    let finalUrl = `${reactAppointyUrl}${endpoints.locations}?page=${pageNo}&limit=${limitNo}`;
  
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },

   getLocationById: async (req, res, next) => {
    console.log('-----------',req);
    const id = req.params.id;
    let finalUrl = `${reactAppointyUrl}${endpoints.locationById}/${id}`;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },

  
};
