
import React,{ Component, Fragment } from 'react'
import { 
    Link,
    NavLink, 
    Route 
} from 'react-router-dom'

// Services
import { requestDelete } from '../../lib/request'

// Views
import ItemList from './ItemList'
import BlankInput from './BlankInput';

// Antd
import {
    Layout,
    Menu,
    Input,
    Row,
    Col,
    Button,
    message
} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

// Styles
import styles from '../../styles/displayname.module.css';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Search } = Input;

export default class DisplayName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setSelected: '',
            selectedConfig: '',
            responses: '',
            showList: true,
            input: '',
            click: '',
            isToggle: true,
            isUpdateToggle: false,
            id:null,
            url:null,
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.selected !== this.props.selected) {
            this.setState({
                isToggle: true,
                isUpdateToggle: false,
            })
        }
    }
    
    createConfig = () => {
        this.setState({
            isToggle: true,
            isUpdateToggle : false
        })
    }

    setSelected = (selected,id, url) => {
        debugger;
        console.log("stateResponses===",selected)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        this.setState({
            id:id,
            url:url,
            setSelected: selected,
            selectedConfig: selected,
            isToggle: true,
            isUpdateToggle : false
        })
    }

    handleChange = () => {
        this.setState({
            isToggle: false,
            isUpdateToggle: false
        })
    }

    handleUpdate = () => {
        this.setState({
            isUpdateToggle: true
        })
    }

    onSearch = (e) => {
        debugger;
        console.log("stateResponses===",e)
        // change
        this.setState({ 
            input: e.target.value 
        }, () => {
            if (this.state.input !== '') {
                const searchResult = this.props.response.body.filter(o => {
                    const data = o.key || o.supplierId
                    return data.toLowerCase().match(this.state.input.toLowerCase())
                })
                this.setState({ 
                    stateResponses: searchResult,
                    showList: false
                })
            } else {
                this.setState({ 
                    stateResponses: this.props.response.body,
                    showList: true
                })
            }
        })
    }

    displayProperty = (config, response) => {
        console.log("config===",config)
        console.log("response===",response)
        // change
        const displaying = config.displayProperty;
        return response && response.body && response.body.map((item, key) => {
            return (
                <Fragment key={key}>
                    {Object.keys(item).map((ele, k) => {
                        if (ele === displaying) {
                            return (
                                <div
                                    key={k}
                                    className={styles.display_name_list}
                                >
                                    <NavLink 
                                        to={`/config/${config.urlPath}/details/${item[displaying]}`} 
                                        onClick={() => this.setSelected(item,item[displaying], config.urlPath)}
                                        activeStyle={{
                                            fontWeight: "bold",
                                            color: "#9e00ff"
                                          }}
                                    >
                                        {item[displaying]}
                                    </NavLink>
                                    <DeleteTwoTone
                                        twoToneColor="#eb2f96"
                                        onClick={() => this.removeClick(item[displaying], config.urlPath)}
                                        className={styles.display_name_delete}
                                    />
                                </div>
                            )
                        }
                    })}
                </Fragment>
            )
        })
    }

    searchDisplay = (stateResponses, config) => {
        // change
        console.log("===stateResponses===",stateResponses)
        console.log("===config===",config)
        const displaying = config.displayProperty
        return stateResponses.map((item, key) => {
            return (
                <>
                    {Object.keys(item).map((ele, k) => {
                        if (ele === displaying) {
                            return (
                                <div
                                    key={key}
                                    className={styles.display_name_list}
                                >
                                    <NavLink
                                        to={`/config/${config.urlPath}/details/${item[displaying]}`} 
                                        onClick={() => this.setSelected(item, item[displaying], config.urlPath)}
                                        activeStyle={{
                                            fontWeight: "bold",
                                            color: "#9e00ff"
                                          }}
                                    >
                                        {item[displaying]}
                                    </NavLink>
                                    <DeleteTwoTone
                                        twoToneColor="#eb2f96"
                                        onClick={() => this.removeClick(item[displaying], config.urlPath)}
                                        className={styles.display_name_delete}
                                    />
                                </div>
                            )
                        }
                    })}
                </>
            )
        })
    }

    removeClick = (id, urlPath) => {
        debugger;
        // change
        this.call(id, urlPath)
    }

    call = async (id, urlPath) => {
        message.loading({ content: 'Deleting Config...', key: 'updatable', duration: 4  });
        const response = await requestDelete(`global-config/config/${urlPath}/${id}`, 'delete');
        if(response.status === 200){
            message.success({ content: `Config Deleted successfully!`, key: 'updatable', duration: 4 });
            setTimeout(()=>{
                window.location.reload();
            },500)
        } else {
            message.error({ content: `Oops!! Something went wrong!`, key: 'updatable', duration: 4 });
        }
       
        // this.props.setSelected(urlPath)
    }

    handleClick = (urlPath) => {
        const { setSelected } = this.props
        setSelected(urlPath)
        this.setState({
            showList: true,
            input: ''
        })
    }
    displayNavigation = () => {
        // change
        const { configurations, setSelected } = this.props
        
        return (configurations && configurations.body && configurations.body.map((item, key) => (
            <Menu.Item key={key}>
                <Link href="#" to={`/config/${item.urlPath}`} 
                    onClick={() => this.handleClick(`/${item.urlPath}`)}
                >
                    {item.displayName}
                </Link>
            </Menu.Item>
        )))
    }

    click(config) {
        this.setState({ click: config })
    }

    render() {
        const { config, response } = this.props;
        console.log("===config===,",this.props)
        const { stateResponses } = this.state;
        return (
            <Layout>
                <Sider width={250} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub0']}
                        style={{ width: '100%', height: '100vh', borderRight: 0 }}
                    >
                        <SubMenu key={'sub0'} title='Configurations'>
                            {this.displayNavigation()}
                        </SubMenu>
                    </Menu>
                </Sider>
                {config && response &&
                    <Layout className={styles.display_name_wrapper}>
                        <Content
                            className={`site-layout-background ${styles.display_name_wrapper_content}`}
                        >
                            <Row span={24} className={styles.search_box}>
                                <Col span={6}>
                                    <Search
                                        placeholder="input search text"
                                        className={styles.display_name_search}
                                        onChange={this.onSearch}
                                        value={this.state.input}
                                        enterButton
                                    />
                                </Col>
                                <Col span={6}>
                                    <Button
                                        type="primary"
                                        className={styles.display_name_button}
                                        onClick={this.handleChange}
                                    >
                                        +
                                    </Button>
                                </Col>
                            </Row>
                                <Row>
                                    <Col span={12} className={styles.display}>
                                        {this.state.showList ?
                                            this.displayProperty(config, response)
                                            : this.searchDisplay(stateResponses, config)
                                        }
                                    </Col>

                                    <Col className={`gutter-row ${styles.display_name_right}`} span={12}>
                                        <>
                                            {
                                                !this.state.isToggle
                                                    ? <BlankInput 
                                                        createConfig={this.createConfig} 
                                                        configCreate={config}
                                                        setSelected={this.props.setSelected}
                                                    />
                                                    : null
                                            }
                                            {/* <Route
                                                path={`/config/${config.urlPath}/add`}
                                                render={
                                                    (props) => this.state.selectedConfig &&
                                                        <BlankInput 
                                                            createConfig={this.createConfig} 
                                                            configCreate={this.state.click}
                                                            setSelected={this.props.setSelected}
                                                            {...props}
                                                        />
                                                }
                                            /> */}
                                            <Route path={`/config/${config.urlPath}/details/:id`}
                                                render={
                                                    (props) => this.state.selectedConfig && 
                                                        this.state.isToggle &&
                                                        !this.state.isUpdateToggle &&
                                                        <ItemList
                                                            handleUpdate={this.handleUpdate}
                                                            removeClick={this.removeClick}
                                                            id={this.state.id}
                                                            url={this.state.url}
                                                            tableData={this.state.selectedConfig}
                                                            configItem={config} 
                                                            setSelected={this.state.setSelected}
                                                            _setSelected={this.props.setSelected}
                                                            {...props} 
                                                        />
                                                }
                                            />
                                        </>
                                    </Col>
                                </Row>
                        </Content>
                    </Layout>
                }
            </Layout>
        )
    }
}