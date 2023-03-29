import React from 'react'
import { Link, Route } from 'react-router-dom'
import { requestDelete } from '../../lib/request'
import ItemList from './ItemList'
import BlankInput from './BlankInput';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Space, Row, Col } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Search } = Input;
const MenuItemGroup = Menu.ItemGroup;

export default class LeftHandData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            setSelected: '',
            selectedConfig: '',
            responses: '',
            blank: false,
            stateResponses: this.props.response.body,
            showList: true,
            input: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ responses: this.props.response });
    }


    setSelected = (selected) => {
        this.setState({ setSelected: selected.key, selectedConfig: selected })

    }

    handleChang = () => {
        this.setState({ blank: !this.state.blank })
    }

    onSearch = (e) => {
        this.setState({ input: e.target.value })
        if (this.state.input.length > 0) {
            const searchResult = this.props.response.body.filter(o => {
                return o.key.toLowerCase().match(this.state.input.toLowerCase())
            })
            this.setState({ stateResponses: searchResult })
            this.setState({ showList: false })
        }
    }

    displayProperty = (config, response) => {
        console.log('config, response', config)
        let displaying = config.displayProperty
        return response && response.body && response.body.map((item, key) => {
            return (
                <>
                    {Object.keys(item).map((ele, k) => {
                        if (ele == displaying) {
                            console.log('item.displaying', item[displaying])
                            return (
                                <div style={{ lineHeight: '27px', width: '80%' }} key={key}>
                                    <Link href="#" style={{ width: '60%' }} to={`/config/${config.urlPath}/${item[displaying]}`} onClick={() => this.setSelected(item)}>
                                        {item[displaying]}
                                    </Link>
                                    <DeleteTwoTone style={{ float: 'right' }} onClick={() => this.removeClick(item[displaying], config.urlPath)} />
                                </div>
                            )
                        }
                    })}
                </>
            )
        })
    }

    searchDisplay = (stateResponses, config) => { 
        console.log('config, response', config)
        let displaying = config.displayProperty
        return stateResponses.map((item, key) => {
            return (
                <>
                    {Object.keys(item).map((ele, k) => {
                        if (ele == displaying) {
                            console.log('item.displaying', item[displaying])
                            return (
                                <div style={{ lineHeight: '27px', width: '80%' }} key={key}>
                                    <Link href="#" style={{ width: '60%' }} to={`/config/${config.urlPath}/${item[displaying]}`} onClick={() => this.setSelected(item)}>
                                        {item[displaying]}
                                    </Link>
                                    <DeleteTwoTone style={{ float: 'right' }} onClick={() => this.removeClick(item[displaying], config.urlPath)} />
                                 </div>
                            )
                        }
                    })}
                </>
            )
        })
    }

    removeClick(id, urlPath) {
        { this.call(id, urlPath) }
    }

    call = async (id, urlPath) => {
        debugger;
    console.log("sadsadsa===",urlPath)
        console.log(id,urlPath,requestDelete)
        let configInfo = await requestDelete(`global-config/config/${urlPath}/${id}`, 'delete')
        window.location.reload();
    }

    render() {
        const { config, response, configurations } = this.props
        const { stateResponses, responses } = this.state
        console.log('congig--------------', config)
        console.log('response--------------', responses)
        return (
            <>
                <Layout>
                    <Sider width={180} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            defaultOpenKeys={['sub0']}
                            style={{ width: '100%', height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key={'sub0'} title='Configurations'>
                                {configurations && configurations.body && configurations.body.map((item, key) => (
                                    <Menu.Item key={key}>
                                        <Link href="#">
                                            {item.displayName}
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout style={{ padding: '52px 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 30,
                                margin: 0,
                                minHeight: 280,

                            }}
                        >
                            <Row gutter={24}>
                                <Col className="gutter-row" span={6}>
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        style={{ height: '100%', borderRight: 0 }}
                                    >
                                        <SubMenu key="sub1" title={`${config.displayName} - Keys`}>
                                            <div style={{ lineHeight: '27px' }}>
                                                <Space direction="vertical">
                                                    <Search placeholder="input search text" style={{ width: '90%' }} onChange={this.onSearch} value={this.state.input} enterButton />
                                                </Space>
                                                <button className="btn btn-primary" style={{ float: 'right' }} onClick={this.handleChang}>+</button>
                                            </div>
                                            {this.state.showList ?
                                                <div>
                                                    {this.displayProperty(config, response)}
                                                </div> :
                                                <div>
                                                    {this.searchDisplay(stateResponses, config)}
                                                </div>
                                            }

                                        </SubMenu>
                                    </Menu>
                                </Col>
                                <Col className="gutter-row" span={18}>
                                    {this.state.blank ? <BlankInput configName={config.beanName} config={config} /> : null}
                                    <Route path={`/config/${config.urlPath}/:id`} render={(props) => this.state.selectedConfig && <ItemList tableData={this.state.selectedConfig} config={config} setSelected={this.state.setSelected} {...props} />} />
                                    {/* {this.state.selectedConfig && (
                                        <ItemIndex tableData={this.state.selectedConfig} config={config} setSelected={this.state.setSelected}/>
                                    )} */}
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}