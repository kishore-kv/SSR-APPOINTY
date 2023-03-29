// Package
import { Component } from "react";
import { cloneDeep, isEmpty } from 'lodash';
import moment from 'moment';

// Antd
import {
  Input,
  Row,
  Col,
  Button,
  Radio,
  DatePicker,
  ConfigProvider,
  message
} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons'

// Styles
import '../../assets/css/App.css';

import styles from '../../styles/blankinput.module.css';

// Service
import { createRequest } from '../../lib/request'
import { isArray } from "lodash";

const RadioGroup = Radio.Group;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { TextArea } = Input;

export default class BlankInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateStr: '',
      data: this.setData(),
      mapKey: '',
      mapValue: '',
      item: ''
    }
  }

  // Later we"ll write common helper function for the same 
  validateMap = (mapping) => {
    const {
      key,
      value
    } = mapping;
    let validate = true;
    if(!key?.trim()){
      message.error({ content: `Key should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }
    const objKeys = Object.keys(value).filter(Boolean);
    const objValues = Object.values(value).filter(Boolean);
    if(objKeys[0] === 'undefined'){
      message.error({ content: `value's key should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }
    if(objKeys.length < 1 ||  objValues.length < 1){
      message.error({ content: `value's value should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }
    return validate;
  }
  
  // Later we"ll write common helper function for the same 
  validateSupplier = (formData) => {
    const {
      supplierId,
      supplierName,
      supplierPhone,
    } = formData;

    let validate = true;

    if(!supplierId?.trim()){
      message.error({ content: `supplierId should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }
    if(!supplierName?.trim()){
      message.error({ content: `supplierName should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }
    if(!supplierPhone?.trim()){
      message.error({ content: `supplierPhone should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }
    return validate;

  }

  // validateList
  validateList = (formData) => {
    const {
      key,
      value
    } = formData;

    let validate = true;

    if(!key?.trim()){
      message.error({ content: `Key should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }
    if((value.map(el=> el?.trim())).filter(Boolean)?.length < 1){
      message.error({ content: `value should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }
    return validate;
  }

  // 
  validateStatickey = (formData) => {
    const {
      key,
      value,
      siteValues
    } = formData;

    let validate = true;

    if(!key?.trim()){
      message.error({ content: `Key should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }

    if(!value?.trim()){
      message.error({ content: `value should not be empty`, key: 'updatable', duration: 4 });
      validate = false;
      return validate
    }

    // if(siteValues === null) {
    //   return validate
    // } else {
    // }
    return validate
  }
  displayValues = (config, i) => {
    return Object.keys(config.properties).map((ele, k) => {
      if (config.properties[ele] === "String") {
        return (
          <Row
            gutter={16}
            key={k}
          >
            {this.str(ele, config.properties[ele])}
          </Row>
        )
      }
      else if (config.properties[ele] === "Map") {
        return (
          <Row
            gutter={[16, 16]}
            key={k}
          >
            {this.maping(ele, config.properties[ele])}
          </Row>
        )
      } else if (config.properties[ele] === "List") {
        return (
          <Row
            gutter={16}
            key={k}
          >
            {this.listing(ele, config.properties[ele], config.properties)}
          </Row>
        )
      } else if (config.properties[ele] === "List<Date>" || "Boolean") {
        return (
          <Row
            gutter={16}
            key={k}
          >
            {this.date(ele, i, config.properties[ele], null, k)}
          </Row>
        )
      }
    })
  }

  setData() {
    const { configCreate } = this.props;
    let properties = cloneDeep(configCreate.properties)
    Object.keys(properties).map((ele, k) => {
      if (properties[ele] === "String") {
        properties[ele] = ''
      } else if (properties[ele] === "Map") {
        properties[ele] = [{key:0,value:{}}]
        if(configCreate.beanName === "statickeys" ) {
          properties[ele] = [{key:0,value:"", siteValues:[{key:0,value:{}}]}]
        }
      } else if (properties[ele] === "List") {
        properties[ele] = [{key:0,value:""}]
      } else if (properties[ele] === "List<Date>") {
          properties[ele] = [moment().format('DD/MM/YYYY')];
      } else if (properties[ele] === "Boolean") {
        properties[ele] = true
      }
    })
    return properties
  }

  handleClick = (prp) => {
    debugger;
      let value = "";
      if(prp === "Map"){
        value = {}
      }
      // let data = Array.isArray(this.state.data.siteValues) ? {...this.state.data, value:this.state.data.siteValues} : this.state.data;
      let data = this.state.data;
      if(Array.isArray(this.state.data.siteValues)) {
        const lastElemenet = data.siteValues.length -1;
        data.siteValues.push({
          key: lastElemenet + 1,
          value
        })
      } else {
        const lastElemenet = data.value[data.value.length - 1];
        data.value.push({
          key: lastElemenet.key + 1,
          value
        })
      }
      this.setState({ data })
  }

  removeList = (prp, index) => {
    let data = this.state.data;
      if(Array.isArray(data.siteValues)) {
        data.siteValues.splice(index,1);
      } else {
        data.value.splice(index,1);
      }
    this.setState({ data })
  }

  handleInputChange(prp, index, ele, e, date, dateString) {
    let stateCopy = this.state.data;
    if (prp === "Map") {
      const input = e.target.name;
      let data =this.state.data;
      //  data = Array.isArray(this.state.data.siteValues) ? {...this.state.data, value:this.state.data.siteValues} : this.state.data;
      if(data.value[index] || data.siteValues[index]) {
        if (input === 'mapKey') {
          if(!data.siteValues) {
            data.value[index].value.key = e.target.value;
          } else {
            data.siteValues[index].key = e.target.value;
          }
          
        } else if (input === "mapValue") {
          if(!data.siteValues) {
             data.value[index].value.value = e.target.value;
          } else {
            data.siteValues[index].value = e.target.value;
          }
        }
        this.setState({ data })
      } else {
        message.error({content: "Index Removed"})
      }
    } else if (prp === "List") {
      const { data } = this.state;
      if(data.value[index]) {
        data.value[index].value = e.target.value;
        this.setState({  data })
      } else {
        message.error({content: "Index Removed"})
      }
    } else if (prp === "String") {
      stateCopy[ele] = e.target.value
      this.setState({ data: stateCopy })
    } else if (prp === "List<Date>") {
      stateCopy[ele] = []
      stateCopy[ele].push(date)
      this.setState({ data: stateCopy })
    } else if (prp === "Boolean") {
      stateCopy[ele] = !!date.target.value
      this.setState({ data: stateCopy })
    } else if (prp === "Date") {
      stateCopy[ele] = date
      this.setState({ data: stateCopy })
    }
  };

  str = (ele, prp) => {
    // const spaceLeft = ele === 'key' ? 2 : 6;
    // const spaceRight = ele === 'key' ? 22 : 18;
    const { configCreate } = this.props;
    const spaceLeft = configCreate.beanName === "supplierconfig" ? 4 : 2;
    const spaceRight = configCreate.beanName === "supplierconfig" ? 20 : 21
    return (
      <>
        <Col className="gutter-row" span={spaceLeft}>
          <div className={styles.col}>
            {ele}
          </div>
        </Col>
        <Col className="gutter-row" span={spaceRight}>
          <div className={styles.col}>
            <TextArea
              rows={1}
              className={`form-control mb-1 ${styles.text_area}`}
              value={typeof this.state.data[ele] === 'string' ? this.state.data[ele] : ''}
              onChange={this.handleInputChange.bind(this, prp, null, ele)}
            />
          </div>
        </Col>
      </>
    )
  }
 
  displayInputValue = (mapData,index) => {
    if(mapData?.siteValues && isArray(mapData.siteValues)) {
      return typeof mapData.siteValues[index].value === 'string' ? mapData.siteValues[index].value : ""
    }
    return mapData.value.value;
  }

  maping = (ele, prp) => {
    const { value, siteValues } = this.state.data;
    const data = Array.isArray(siteValues) ? siteValues : value;
    const { configCreate } = this.props;
    const spaceLeft = configCreate.beanName === "configmap" ? 2 : 3;
    const spaceRight = configCreate.beanName === "configmap" ? 10 : 9
    return (
      <>
        <Col className={`gutter-row ${styles.col}`} span={spaceLeft}>
          {ele}
        </Col>
        {data && data.map((mapData,index) => (
          <>
            <Col className={`gutter-row ${styles.col}`} span={spaceRight}>
              <TextArea
                rows={1}
                name='mapKey'
                style={{ height: '43px', width: '400px' }}
                value={typeof mapData.key === 'string' ? mapData.key :  typeof mapData.value.key === 'string' ? mapData.value.key: ""}
                onChange={this.handleInputChange.bind(this, prp, index, ele)}
              />
            </Col>
            <Col className={`gutter-row ${styles.col}`} span={spaceRight}>
              <TextArea
                rows={1}
                style={{ height: '43px', width: '400px' }}
                name="mapValue"
                // value={this.displayInputValue(mapData,index)}
                value={typeof mapData.value === 'string'? mapData.value : typeof mapData.value.value === 'string' ? mapData.value.value: ""}
                onChange={this.handleInputChange.bind(this, prp, index, ele)}
              />
            </Col>
            {mapData.key !== 0 && (
            <Col className={`gutter-row ${styles.col}`}>
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                onClick={() => this.removeList(prp, index)}
              />
            </Col>)}
          </>
        ))}
        <Col className={`gutter-row ${styles.col}`} span={2}>
          <Button
            type="primary"
            onClick={() => this.handleClick(prp)}
          >
            Add
          </Button>
        </Col>
      </>
    )
  }

  listing = (ele, prp) => {
    return (
      <>
        <Col className={`gutter-row ${styles.col}`} span={2}>
          {ele}
        </Col>
        {this.state.data.value && this.state.data.value.map((list,index) => (
          <>
            <Col key={list.key} className={`gutter-row ${styles.col}`} span={19}
              style={{marginLeft:`${list.key !== 0 ? '46px' : ''}`}}
            >
              <TextArea
                rows={1}
                value={list.value}
                style={{ height: '43px', width: '100%' }}
                onChange={this.handleInputChange.bind(this, prp, list.key, ele)}
              />
            </Col>
            {list.key !== 0 && (
            <Col className={`gutter-row ${styles.col}`}>
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                onClick={() => this.removeList(prp, index)}
              />
            </Col>)}
          </>
        ))}
        <Col  className={`gutter-row ${styles.col}`} span={2}>
          <Button type="primary" onClick={() => this.handleClick(prp)}>Add</Button>
        </Col>
      </>
    )
  }

  date = (ele, i, prp, length, k) => {
    if (prp === "List<Date>") {
      return (
        <>
          <Col className={`gutter-row ${styles.col}`} span={6}>
            {ele}
          </Col>
          <Col className="gutter-row" span={18}>
            <Row key={k} gutter={16}>
              <Col className={styles.col}>
                <ConfigProvider >
                  <DatePicker
                    defaultValue={moment(new Date(),
                      dateFormatList[0])}
                    format={dateFormatList}
                    onChange={this.handleInputChange.bind(this, prp, null, ele)}
                  />
                </ConfigProvider>
              </Col>
            </Row>
          </Col>
        </>
      )
    } else if (prp === "Boolean") {
      return (
        <>
          <Col className={`gutter-row ${styles.col}`} span={6}>
            {ele}
          </Col>
          <Col className="gutter-row" span={18}>
            <RadioGroup onChange={this.handleInputChange.bind(this, prp, null, ele, null)}>
              <Radio value={true}>True</Radio>
              <Radio value={false}>False</Radio>
            </RadioGroup>
          </Col>
        </>
      )
    } else if (prp === "Date") {
      if (i.dateOfBirth !== null) {
        return (
          <>
            <Col className={`gutter-row ${styles.col}`} span={3}>
              {ele}
            </Col>
            <Col className="gutter-row" span={21}>
              <Row gutter={16}>
                <Col >
                  <div className={styles.col}>
                    <DatePicker
                      defaultValue={moment(new Date(), dateFormatList[0])}
                      format={dateFormatList}
                      onChange={this.handleInputChange.bind(this, prp, null, ele)}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </>
        )
      } else if (i.dateOfBirth === null) {
        return (
          <>
            <Col className={`gutter-row ${styles.col}`} span={3}>
              {ele}
            </Col>
            <Col className="gutter-row" span={21}>
              <Row gutter={16}>
                <Col className={styles.col}>
                  <DatePicker
                    defaultValue={moment(new Date(), dateFormatList[0])}
                    format={dateFormatList}
                    onChange={this.handleInputChange.bind(this, prp, null, ele)}
                  />
                </Col>
              </Row>
            </Col>
          </>
        )
      }
    }
  }

  call = async (formData, urlPath) => {
    debugger;
    console.log("sadsadsa===",urlPath)
    message.loading({ content: 'Create Config...', key: 'updatable', duration: 4 });
    const response = await createRequest(`global-config/config/${urlPath}`, 'post', formData);
    if (response.status === 200) {
      message.success({ content: `Config Created successfully!`, key: 'updatable', duration: 4 });
      setTimeout(() => {
        this.props.setSelected(urlPath);
      }, 500)
    } else {
      message.error({ content: `Oops !! Something went wrong!`, key: 'updatable', duration: 4 });
    }
  }

  handleForm(urlPath) {
    // change
    return event => {
      event.preventDefault()
      let formData = this.state.data;
      const { configCreate } = this.props;
      let isValidate = true;
      if(configCreate.beanName === "configmap"){
        formData.value = Object.fromEntries(formData.value.map(data => Object.values(data.value)));
        formData.key = formData.key;
        isValidate = this.validateMap(formData);
      }
      if(configCreate.beanName === "configlist"){
        formData.value = formData.value.map(data => data.value).filter(Boolean);
        formData.key = formData.key;
        isValidate = this.validateList(formData);
      }
      if(configCreate.beanName === "supplierconfig"){
        isValidate = this.validateSupplier(formData)
      }
      if(configCreate.beanName === "statickeys"){
        let obj = {}
        formData.siteValues.map(data => obj[data.key] = data.value);
        const isSiteMap = Object.values(obj).filter(Boolean).filter(data => !isEmpty(data));
        obj = isSiteMap.length ? obj : null;
        formData.siteValues = obj;
        // isValidate = true;
        isValidate = this.validateStatickey(formData);
      }
      if(isValidate) {
        this.call(formData, urlPath)
        this.props.createConfig();
      } else {
        this.setState({
          data: this.setData()
        })
      }
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.configCreate.beanName !== this.props.configCreate.beanName) {
      this.setState({
        data: this.setData()
      })
    }
  }

  render() {
    // change
    const item = this.state.data;
    const { configCreate } = this.props;
    return (
      <form onSubmit={this.handleForm(configCreate.urlPath)}>
        {this.displayValues(configCreate, item)}
        <Button type="primary" htmlType="submit" className={styles.create}>
          Create
        </Button>
      </form>
    )
  }
}