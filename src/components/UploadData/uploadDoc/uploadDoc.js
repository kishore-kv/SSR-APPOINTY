import { React, Component } from "react"
import Papa from "papaparse";
import { Button,message,Spin } from "antd";
import { isEmpty, lowerCase, toUpper } from "lodash";
import SeacrhSkuComponent from "../searchSku/searchsku";
import styles from '../../../styles/upload.module.css';
import withAuth from '../../../lib/auth/withAuth';
import { requestFeedMastePost } from "../../../lib/request"; 
class UploadDocument extends Component {
    state = {
        fileData: null,
        allRecord: null,
        recordCount: 0,
        fileName: null,
        isRecordEmpty: false,
        isCSVformat: true,
        totalRecordsCount: {},
        isload :false
    }



    handleFileUpload = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].type.includes('csv')) {
                this.setState({
                    fileData: e.target.files[0],
                    isRecordEmpty: false,
                    fileName: e.target.files[0].name,
                    isCSVformat: true
                })
            }
            else {
                this.setState({
                    isCSVformat: false,
                    isRecordEmpty: false,
                })
            }

        }

    }
    setloaderState= (value) =>{
        this.setState({
            isload:value
        })
    }


    initiateFileUpload = async (totalRecords, type, batchsize) => {
        message.info("Data Upload Started..")
        this.setloaderState(true)
        const { fileName } = this.state;
        const url = 'file/uploadStarts';
        const uploadtype = toUpper(type)
        let batchcount = Math.ceil(totalRecords / batchsize);
        let payload = {
            "fileName": fileName,
            "uploadFor": uploadtype,
            "uploadingRecordsCount": totalRecords,
            "batchCount": batchcount
        }
        try {             
            const response = await requestFeedMastePost(url,payload,'post')
            if (response && response.data) {
                return response.data
            }
            else{
                this.setloaderState(false)
                return false                
            }
            
        }
        catch (e) {
            message.error("cannot start Data Upload", e)
            this.setloaderState(false)
            return false
        }


    }
    finishedFileUpload = async (totalRecords, type, failedcount, batchcount, jobid) => {
        const { fileName } = this.state;
        const url ="file/uploadFinished";
        const uploadtype = toUpper(type)
        let payload = {
            "id": jobid,
            "fileName": fileName,
            "uploadFor": uploadtype,
            "uploadingRecordsCount": totalRecords,
            "failedRecordsCountAtClient": failedcount,
            "batchCount": batchcount
        }
        try {
            const response = await requestFeedMastePost(url,payload,'post')
            if (response && response.data) {
                this.setloaderState(false)
                return response.data              
                
            }
            return false
        }
        catch (e) {
            message.error("Eroor in fileUploadFinished service", e)
            this.setloaderState(false)
            return false            
        }


    }

    submitFileHandlerForNewArrival = async() => {
        const { uploadtype } = this.props;
        if (this.state.fileData == null) {
            this.setState({
                isRecordEmpty: true
            })
        }
        else {
            let records = [];
            let ImproperRecords = [];
            const file = this.state.fileData;
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, {
                    step: function (row) {
                        if (row.data && !isEmpty(row.data) && row.data.length === 5) {
                            if (!(row.data[0].includes("ID"))) {                            
                                let data = {}
                                data['identifier'] = row.data[0]
                                data['activeDate'] = row.data[1]
                                if(Number(row.data[3])){
                                    data['enabled'] = Number(row.data[3]) === 1 ? true : false;
                                   
                                }
                                else{
                                    data['enabled'] = lowerCase(row.data[3]) === "true" ? true : false;
                                }
                                data['purchaseCount'] = Number(row.data[2])
                                
                                data['ean'] = row.data[4]
                                records.push(data)
                            }
                            else{
                                ImproperRecords.push(row.data)
                            }

                        } else {
                            ImproperRecords.push(row.data)
                        } 
                    },
                    complete: function () {
                        if(!isEmpty(ImproperRecords)){
                            console.log("Unable to Upload these data",ImproperRecords)
                        }
                    }
                });
                let count = 0;
                let succescount = 0;
                let failedcount = 0
                let batchsize = 1000;
                let totalsize = Object.keys(records).length; 
                const data = await this.initiateFileUpload(totalsize, uploadtype, batchsize) 
                let response = null;
                let jobId = data && data.id 
                if (data && data.s === 0) {

                    let startIndex = 0;
                    let endIndex = batchsize; 
                    const url =`${uploadtype}/${jobId}`;
                    do {
                        try {
                            response = await requestFeedMastePost(url, records.slice(startIndex, endIndex),'post').then((res) => {
                                succescount = succescount + 1
                            })
                        } catch (e) {
                            console.error("problem with count after " + count, e);
                            failedcount = failedcount + (records.slice(startIndex, endIndex)).length;

                        }
                        startIndex = startIndex + batchsize;
                        endIndex = endIndex + batchsize;
                        count = count + 1; 
                    } while (startIndex < totalsize);
                }
                //calling finishedfileuploadservice
                if (data && data.s === 0) {
                    try {
                        const finished = await this.finishedFileUpload(totalsize, uploadtype, failedcount, succescount, jobId)
                        if (finished && finished.s == 0){
                            if(failedcount === 0){
                                message.success("Succesfully Completed Data Upload")
                            }else{
                                message.warning("Data uploaded but"+ failedcount +"failed ")
                            }                           
                        }
                    }
                    catch (e) {
                        console.error("error", e)
                    }
                }
            };
            reader.readAsText(file);
        }


    }

    submitFileHandlerforMaterial = async() => {
        const { uploadtype } = this.props;
        if (this.state.fileData == null) {
            this.setState({
                isRecordEmpty: true
            })
        }
        else {
            let records = []
            let ImproperRecords= []
            const file = this.state.fileData;
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, {
                    step: function (row) {
                        if (row.data && !isEmpty(row.data) && row.data.length === 2) {
                            if (!(row.data[0].includes("ID"))) {
                                let data = {}
                                data['identifier'] = row.data[0] 
                                if(Number(row.data[1])){
                                    data['enabled'] = Number(row.data[1]) === 1 ? true : false;
                                   
                                }
                                else{
                                    data['enabled'] = lowerCase(row.data[1]) === "true" ? true : false;
                                }
                                records.push(data)
                            }
                            else{
                                ImproperRecords.push(row.data)
                            }

                        } else {
                            ImproperRecords.push(row.data)
                        } 
                    },
                    complete: function () {
                        // console.log("records",records)
                        if(!isEmpty(ImproperRecords)){
                            console.log("unable to upload these records for material group",ImproperRecords)
                        }
                       
                    }
                }); 
                 
                let count = 0;
                let succescount = 0;
                let failedcount = 0
                let batchsize = 1000;
                let totalsize = Object.keys(records).length; 
                const data = await this.initiateFileUpload(totalsize, uploadtype, batchsize) 
                let response = null;
                let jobId = data && data.id ;
                if (data && data.s == 0) { 
                    let startIndex = 0;
                    let endIndex = batchsize;
                  
                    const url = `${uploadtype}/${jobId}`
                    do {
                        try {
                            response = await requestFeedMastePost(url, records.slice(startIndex, endIndex),'post').then((res) => {
                                succescount = succescount + 1
                            })
                        } catch (e) {
                            console.error("problem with count after " + count, e);
                            failedcount = failedcount + (records.slice(startIndex, endIndex)).length;

                        }
                        startIndex = startIndex + batchsize;
                        endIndex = endIndex + batchsize;
                        count = count + 1;
                    } while (startIndex < totalsize);
                }
                //calling finishedfileuploadservice
                if (data && data.s == 0) {
                    try {
                        const finished = await this.finishedFileUpload(totalsize, uploadtype, failedcount, succescount, jobId)
                        if (finished && finished.s == 0){
                            if(failedcount === 0){
                                message.success("Succesfully Completed Data Upload")
                            }else{
                                message.warning("Data uploaded but"+ failedcount +"failed ")
                            }
                           
                        }                            
                    }
                    catch (e) {
                        console.error("error", e)
                       
                    }
                }
            };
            reader.readAsText(file);
        }


    }



    render() {
        const { isRecordEmpty, isCSVformat ,isload} = this.state
        const { uploadtype } = this.props
        return (

            
            <div className={styles.main_class}>
                <h3>{this.props.headerLable}</h3>
                <hr />
                <h3>{this.props.mainlable}</h3>
                <p>{this.props.messagelable}</p>



                <div>
                <Spin spinning={isload}>
                    <div>
                        <label htmlFor="file">Recoger el archive CSV para cargar:</label>
                        <input
                            type="file"
                            name="file"
                            required
                            onChange={(e) => { this.handleFileUpload(e) }}
                        />

                        { uploadtype === "newArrivals" ?
                            <Button type="primary" disabled={!isCSVformat} onClick={() => { this.submitFileHandlerForNewArrival() }}>
                                Cargar ahora </Button> :
                            <Button type="primary" disabled={!isCSVformat} onClick={() => { this.submitFileHandlerforMaterial() }}>
                                Cargar ahora </Button>
                        }
                        {isRecordEmpty && <p className={styles.error}>{"kindly upload a file !"}</p>}
                        {!isCSVformat && <p className={styles.error}>{"upload CSV file only!"}</p>}
                    </div>
                    </Spin>   


                    <hr />
                    <h3>{this.props.countfisrt} 
                    {this.props.totalcount &&<span className={styles.badge}>{this.props.totalcount}</span>} 
                    {this.props.countsecond} {this.props.enablecount &&<span  className={styles.badge}>{this.props.enablecount}</span>}</h3>
                    <hr />
                </div>

                <div>
                    <SeacrhSkuComponent {...this.props} />
                </div>

            </div>
                        
        );
    }
}

export default withAuth(UploadDocument);