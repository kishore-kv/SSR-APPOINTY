// Package
import { Component } from "react";
import moment from 'moment';
import SimpleReactValidator from 'simple-react-validator';

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

// Services
import { configRequest } from '../../lib/request'

// styles
import styles from '../../styles/itemlist.module.css';
import '../../assets/css/App.css';

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default class ItemList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.tableData,
      isSingle: false
    }
    this.validator = new SimpleReactValidator();
  }

  componentDidUpdate() {
    // change
    if (this.props.setSelected !== this.state.data) {
      debugger;
      this.setState({ data: this.props.tableData })
    }
  }

  displayValues = (i, configName, config) => {
    return Object.keys(config.properties).map((ele, k) => {
      if (config.properties[ele] === "String") {
        return (
          <Row
            gutter={16}
            key={k}
          >
            {this.str(i, configName, k, config.properties[ele], ele, config)}
          </Row>
        )
      }
      else if (config.properties[ele] === "Map") {
        return (
          <Row
            gutter={16}
            key={k}
          >
            {this.maping(ele, i, k, config.properties[ele], i[ele] ? Object.entries(i[ele]).length: null, k)}
          </Row>
        )
      } else if (config.properties[ele] === "List") {
        return (
          <Row
            gutter={16}
            key={k}
          >
            {this.listing(ele, i, config.properties[ele], Object.values(i[ele]).length, k)}
          </Row>
        )
      }
      else if (config.properties[ele] === "List<Date>") {
        return (
          <Row
            gutter={16}
            key={k}
          >
            {this.date(ele, i, config.properties[ele], i[ele] ? Object.values(i[ele]).length: null, k)}
          </Row>
        )
      }
      else if (config.properties[ele] === "Boolean") {
        return (
          <Row
            gutter={16}
            key={k}
          >
            {this.boolean(ele, i, config.properties[ele], k)}
          </Row>
        )
      }
    })
  }

  handleChange(ele, values, key, properties, indx1, indx2, length, event, date, dateString) {
    let stateCopy = this.state.data
    if (properties === "String") {
      stateCopy[ele] = event.target.value
      this.setState({ data: stateCopy })
    } else if (properties === "List") {
      stateCopy[ele][key] = event.target.value
      this.setState({ data: stateCopy })
    } else if (properties === "Map") {
      let arr = [];
      if(stateCopy[ele]){
        arr = Object.entries(stateCopy[ele]);
        arr[indx1][indx2] = event.target.value
      } else {
        arr.push([event.target.value])
      }
      let obj = Object.fromEntries(arr)
      stateCopy[ele] = obj
      this.setState({ data: stateCopy })
    } else if (properties === "Boolean") {
      stateCopy[ele] = event.target.value
      this.setState({ data: stateCopy })
    } else if (properties === "List<Date>") {
      stateCopy[ele][key] = date
      this.setState({ data: stateCopy })
    }
  }

  addClick(ele, value, key, properties, nullValue) {
    let stateCopy = this.state.data
    if (properties === "List") {
      stateCopy[ele][key + 1] = ''
      this.setState({ data: stateCopy })
    }
    else if (properties === "Map") {
      if (nullValue !== null) {
        let arr = Object.entries(stateCopy[ele])
        arr[key + 1] = ['', '']
        let obj = Object.fromEntries(arr)
        stateCopy[ele] = obj
        this.setState({ data: stateCopy })
      } else {
        stateCopy[ele] = ['', '']
      }
    } else if (properties === "List<Date>") {
      stateCopy[ele][key + 1] = new Date()
      this.setState({ data: stateCopy })
    }
  }

  removeClick(ele, key, properties, indx) {
    let stateCopy = this.state.data
    if (properties === "List") {
      if (stateCopy[ele].length === 1) {
        this.setState({ isSingle: true })
      }
      stateCopy[ele].splice(key, 1)
      this.setState({ data: stateCopy })
    } else if (properties === "Map") {
      if (Object.keys(stateCopy.value).length === 1) {
        this.setState({ isSingle: true })
        // this.props.removeClick(this.props.id, this.props.url)
      }
      // else {
      let arr = Object.entries(stateCopy[ele])
      arr.splice(indx, 1)
      let obj = Object.fromEntries(arr)
      stateCopy[ele] = obj
      this.setState({ data: stateCopy })
      // }
    } else if (properties === "List<Date>") {
      stateCopy[ele].splice(key, 1)
      this.setState({ data: stateCopy })
    }
  }

  str = (i, configName, k, prp, ele, config) => {
    if (config.objectKey === ele) {
      // const spaceLeft = ele === 'key' ? 2 : 6;
      // const spaceRight = ele === 'key' ? 22 : 18;
      return (
        <>
          <Col className={`gutter-row ${styles.col}`} span={2}>
            {ele}
          </Col>
          <Col className={`gutter-row ${styles.col}`} span={22}>
            <div className={styles.name}>
              {i[ele]}
            </div>
          </Col>
        </>
      )
    } else {
      return (
        <>
          <Col className={`gutter-row ${styles.col}`} span={2}>
            {ele}
          </Col>
          <Col className={`gutter-row ${styles.col}`} span={18}>
            <TextArea
               rows={1}
              className={`form-control mb-1 ${styles.text_area}`}
              value={i[ele] || ''}
              onChange={this.handleChange.bind(this, ele, i, k, prp, null, null, null)}
            />
            {this.validator.message(prp, i[ele], `required|${prp}`, { className: 'text-danger' })}
          </Col>
        </>
      )
    }
  }

  maping = (ele, i, k, prp, length, l) => {
    if (i[ele] !== null) {
      return (
        <>
          <Col className={`gutter-row ${styles.col}`} span={2}>
            {ele}
          </Col>

          <Col className="gutter-row" span={8}>
            {Object.keys(i[ele]) && Object.keys(i[ele]).map((ke, j) => {
              return (
                <Row key={j} gutter={16}>
                  <Col className={styles.col}>
                    <TextArea
                      rows={1}
                      name="Key"
                      className={styles.text_area_wrapper}
                      value={ke !== '0' ? ke : ''}
                      onChange={this.handleChange.bind(this, ele, i, k, prp, j, 0, length)}
                    />
                    {this.validator.message(prp, ke, `required|${prp}`, { className: 'text-danger' })}
                  </Col>
                </Row>
              )
            })}
          </Col>

          <Col className="gutter-row" span={14}>
            {Object.keys(i[ele]) && Object.values(i[ele]).map((v, m) => {
              return (
                <Row key={m}>
                  <Col className={styles.col}>
                    <TextArea
                       rows={1}
                      className={styles.text_area_mapping}
                      name="Values" value={v}
                      onChange={this.handleChange.bind(this, ele, i, k, prp, m, 1, length)}
                    />
                    {this.validator.message(prp, v, `required|${prp}`, { className: 'text-danger' })}
                  </Col>
                  <Col className={styles.col}>
                    <DeleteTwoTone
                      twoToneColor="#eb2f96"
                      className={styles.delete_btn}
                      onClick={() => this.removeClick(ele, k, prp, m)}
                    />
                  </Col>
                  <Col className={styles.col}>
                    {
                      Object.entries(i[ele]).length - 1 === m &&
                      <Button type="primary"
                        style={{ position: "absolute", right: "-66px" }}
                        onClick={
                          () => this.addClick(ele, i, m, prp)}
                      >
                        Add
                      </Button>
                    }
                  </Col>
                </Row>
              )
            })}
          </Col>
        </>
      )
    } else {
      return (
        <>
          <Col className={`gutter-row ${styles.col}`} span={3}>
            {ele}
          </Col>
          <Col className={`gutter-row ${styles.col}`} span={20}>
            {
              i[ele] 
                ? i[ele] 
                : <Row>
                    <Col className={styles.col} span={10}>
                      <TextArea
                           rows={1}
                          name="Key"
                          className={styles.text_area_wrapper}
                          onChange={this.handleChange.bind(this, ele, i, k, prp, 0, 0, length)}
                        />
                    </Col>
                      <Col className={styles.col} span={10}>
                        <TextArea
                            rows={1}
                            name="value"
                            className={styles.text_area_wrapper}
                            onChange={this.handleChange.bind(this, ele, i, k, prp, 1, 0, length)}
                          />
                      </Col>
                  </Row>
            }
          </Col>
          <Col className={styles.col} span={1}>
            <Button type="primary" onClick={() => this.addClick(ele, i, null, prp, i[ele])}>Add</Button>
          </Col>
        </>
      )
    }

  }

  listing = (ele, i, prp, length, k) => {
    return (
      <>
        <Col className={`gutter-row ${styles.col}`} span={2}>
          {ele}
        </Col>

        <Col className="gutter-row" span={20}>
          {i[ele] && i[ele].map((v, k) => {
            return (
              <Row key={k} gutter={24}>
                <Col span={20} className={styles.col}>
                  <TextArea
                     rows={1}
                    name={ele}
                    value={v}
                    className={styles.text_area_listing}
                    onChange={this.handleChange.bind(this, ele, i, k, prp, null, null, length)}
                  />
                  {this.validator.message(prp, v, `required|${prp}`, { className: 'text-danger' })}
                </Col>
                <Col span={2} className={styles.col}>
                  <DeleteTwoTone
                    twoToneColor="#eb2f96"
                    onClick={() => this.removeClick(ele, k, prp, 0)}
                  />
                </Col>
                <Col
                  span={2}
                  className={styles.col}
                >
                  {
                    length - 1 === k &&
                    <Button
                      type="primary"
                      onClick={() => this.addClick(ele, i, k, prp, null, null, 0)}
                    >
                      Add
                    </Button>
                  }
                </Col>
              </Row>
            )
          })}
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
            {i[ele] && i[ele].map((d, k) => {
              return (
                <Row key={k} gutter={16}>
                  <Col >
                    <div className={styles.col}>
                      <ConfigProvider >
                        <DatePicker defaultValue={moment(d, dateFormatList[0])} format={dateFormatList} onChange={this.handleChange.bind(this, ele, i, k, prp, null, null, null)} />
                      </ConfigProvider>
                    </div>
                  </Col>
                  <Col >
                    <div className={styles.col}>
                      <DeleteTwoTone
                        twoToneColor="#eb2f96"
                        onClick={() => this.removeClick(ele, k, prp, 0)}
                      />
                    </div>
                  </Col>
                  <Col >
                    <div className={styles.col}>
                      {length - 1 === k && <Button type="primary" onClick={() => this.addClick(ele, i, k, prp, null, null, 0)}>Add</Button>}
                    </div>
                  </Col>
                </Row>
              )
            })}
          </Col>
        </>
      )
    } else if (prp === "Date") {
      if (i.dateOfBirth != null) {
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
                      defaultValue={moment(i.dateOfBirth, dateFormatList[0])}
                      format={dateFormatList} onChange={this.handleChange.bind(this, ele, i, k, prp, null, null)}
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
                <Col >
                  <div className={styles.col}>
                    <DatePicker
                      defaultValue={moment(new Date(), dateFormatList[0])}
                      format={dateFormatList} onChange={this.handleChange.bind(this, ele, i, k, prp, null, null)}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </>
        )
      }
    }
  }

  boolean = (ele, i, prp, k) => {
    return (
      <>
        <Col className={`gutter-row ${styles.col}`} span={6}>
          {ele}
        </Col>

        <Col className="gutter-row" span={18}>
          <RadioGroup onChange={this.handleChange.bind(this, ele, i, k, prp, null, null, null)} value={i[ele]}>
            <Radio value={true}>True</Radio>
            <Radio value={false}>False</Radio>
          </RadioGroup>
        </Col>
      </>
    )
  }

  call = async (formData, urlPath) => {
   
    console.log("sadsadsa===",urlPath)
    !this.state.isSingle && message.loading({ content: 'Update Config...', key: 'updatable', duration: 4 });
    const response = await configRequest(`global-config/config/${urlPath}`, 'put', formData);
    if (response.status === 200) {
      !this.state.isSingle && message.success({ content: `Config Updated successfully!`, key: 'updatable', duration: 4 });
      setTimeout(() => {
        debugger;
        this.props.handleUpdate();
        this.props._setSelected(urlPath);
        this.state.isSingle && this.props.removeClick(this.props.id, this.props.url)
      }, 500)
    } else {
      !this.state.isSingle && message.error({ content: `Oops!! Something went wrong!`, key: 'updatable', duration: 4 });
  }

  }

  handleForm(urlPath) {
    // change
    const { configItem } = this.props
    return event => {
      event.preventDefault()
      if (this.validator.allValid() || configItem.beanName === 'statickeys') {
        let formData = this.state.data
        this.call(formData, urlPath)
      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    }
  }

  render() {
    const { configItem } = this.props
    let item = this.state.data
    return (
      <form onSubmit={this.handleForm(configItem.urlPath)}>
        {this.displayValues(item, configItem.beanName, configItem)}
        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
        >
          Update
        </Button>
      </form>
    )
  }
}
