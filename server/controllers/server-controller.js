const endpoints = require("../endpoints");
const { serviceReq, loginToken } = require("../axios-calls");
const { handleDecode, generateSignedUrl, deleteFolder } = require("../utils");
const FormData = require('form-data');
const logger = require("../logger");


var reactAppUrl = process && process.env && process.env.API_BASE_URL
// debugger;
module.exports = {
  loginService: async (req, res, next) => {
    res.send({message:'Welcome to my world'})
  },
  configlogin: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.configlogin}`;
    debugger;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "POST", req.body,req.headers,false);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  config: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.config}`;
    debugger;
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
    debugger;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  supplierConfig: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.supplierConfig}`;
    debugger;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  configList: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.configList}`;
    debugger;
    console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  citasLogin: async (req, res, next) => {
    try {
      if (req.body.password) {
        req.body.password = handleDecode(req.body.password);
      }
      let finalUrl = `${reactAppUrl}${endpoints.citasLogin}`;
      console.log(`final logon`,finalUrl);
      

      let response = await serviceReq(req, finalUrl, "POST", req.body, req.headers, false);
      let statusCode = response && response.status || 400
      res.status(statusCode).send(response && response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
};
