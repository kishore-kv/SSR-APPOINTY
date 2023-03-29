// Packages
import React,{ Component } from "react";
// import { Link, Route } from "react-router-dom";

// Services
// import { request } from "../../lib/request";

// Hoc
import withAuth from "../../lib/auth/withAuth";

// View
import DisplayName from './DisplayName'

// Styles
import styles from '../../styles/config.module.css';
class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: '',
            selected: this.props.selected,
            selectedConfig: this.props.selectedConfig,
        }
    }

    
    

    UNSEF_componentWillMount() {
        // change
        const replacedselected = this.props.match.url 
        const selected = replacedselected.replace("/config", "");
        if (selected !== this.state.selected) {
            if (this.props.response) {
                this.setState({ 
                    selected, 
                    selectedConfig: this.props.config.body.find(i => `/${i.urlPath}` === selected) 
                })
            }
        }
    }

    componentDidMount() {
        const replacedselected = this.props.match.url
        const selected = replacedselected.replace("/config", "");
       // const selected = '/configMapService'
       
        if(!this.props.response){
            debugger;
            this.props.setSelected(selected)
        }
        this.setConfig();
    }

   async componentDidUpdate() {
        // change
        debugger;
        this.setConfig();
    }

    setConfig = () => {
       
        const replacedselected = this.props.match.url 
        const selected = replacedselected.replace("/config", "");
        if (selected !== this.state.selected) {
            if (this.props.response) {
                this.setState({ 
                    selected, 
                    selectedConfig: this.props.config.body.find(i => `/${i.urlPath}` === selected)
                })
            }
        }
    }

    render() {
        const { selectedConfig, selected } = this.state;
        console.log('congig--------------', this.props)
        console.log('response--------------', this.state)
        return (
            <div className={styles.config_wrapper}>
                <DisplayName
                   configurations={this.props.config}
                    setSelected={this.props.setSelected}
                    config={selectedConfig}
                    selected={selected}
                    response={this.props.response}
                />
            </div>
        )
    }
}

export default withAuth(Config)
