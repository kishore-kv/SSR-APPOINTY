import logger from './logger';

const axios = require('axios')
const fetch = require('node-fetch')
const {getCookie} = require("./utils")
import https from 'https';
// httpsAgent: new https.Agent({  
        //     rejectUnauthorized: false
        //   })
export const serviceReq = async(reqObject,reqUrl,reqMethod,reqPayload,reqHeaders,enableAuthCookie=true,filehandle) =>{
    
    
    let header = {"Authorization":reqHeaders.authorization|| {} };
    let options = {
        method:reqMethod || 'GET',
        url:reqUrl || '',
        data:reqPayload || {},
        headers:header || {},
        mode: 'cors',
        
    }
    debugger;
    if(enableAuthCookie){
        options['headers']['Authorization'] = 'Bearer' + ' ' + getCookie("token",reqObject["headers"]['cookie'])
    }
    if(filehandle){
        options['responseType']= 'stream'
    }
    if(reqMethod == 'GET' || reqMethod == 'get'){
        delete options['data']
    }
    try{
        let resp = await axios(options).then(res=>{
            return res
        }).catch(err=>{
            logger.error(err.response && err.response.data && err.response.data.error)
            return err?.response
        })
        if(resp && resp.status !== 200){
            return resp;
        }
        if(filehandle){
            return resp
        }
        return resp
    } catch(e){
        logger.info(e);
    }
}