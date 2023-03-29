 import {Table} from 'antd';
import { React, Component } from "react"
import { Button } from "antd";
import { isEmpty } from "lodash";
import styles from '../../../styles/upload.module.css';
import { requestFeedMastePost } from "../../../lib/request"; 
import withAuth from '../../../lib/auth/withAuth';
 
 
class SeacrhSkuComponent extends Component {
  state = {
    searchTerm: null,
    tableData: {},
    isNodata: false,
    isEmptySearchTerm: false

  }

  onChangeHadler = (e) => {
    this.setState(
      {
        searchTerm: e.target.value
      }
    )
  }

  searchHandler = async () => {
    const { searchtype } = this.props;
    const { searchTerm } = this.state;

    if (searchTerm === "" || searchTerm === undefined || searchTerm === null) {
      this.setState({
        isEmptySearchTerm: true
      })
    }
    else {
      const url = `${searchtype}/${searchTerm}`;

      try {
        const res = await requestFeedMastePost(url,{},"post")
        if (res && res.data) {
          this.setState({
            tableData: res.data,
            isNodata: false,
            isEmptySearchTerm:false
          })
        }
        if (isEmpty(res) || isEmpty(res.data)) {
          this.setState({
            isNodata: true,
            isEmptySearchTerm:false
          })
        }
      }
      catch (e) {
        console.error("error", e)
      }
    }


  }
  render() {

    const { isNodata, tableData, isEmptySearchTerm } = this.state; 
    const { searchtype } = this.props;

    const columns = [
      {
        title: 'SKU ID',
        dataIndex: 'identifier',
        key: 'identifier',
      },
      {
        title: 'ACTIVE DATE',
        dataIndex: 'activeDate',
        key: 'activeDate',
      }, 
      {
        title: 'PURCHASE COUNT',
        dataIndex: 'purchaseCount',
        key: 'purchaseCount',
      }, {
        title: 'ENABLED',
        dataIndex: 'enabled',
        key: 'enabled ',
        render: (text) => <p>{ text.toString()}</p>,
      }, {
        title: 'EAN',
        dataIndex: 'ean',
        key: 'ean ',
      },
      {
        title: 'Last ModifiedTime',
        dataIndex: 'lastModifiedTime',
        key: 'lastModifiedTime ',
      }
       
    ];
    const columnsforMaterialGroup = [
      {
        title: 'SKU ID',
        dataIndex: 'identifier',
        key: 'identifier',
      }, {
        title: 'ENABLED',
        dataIndex: 'enabled',
        key: 'enabled ',
        render: (text) => <p>{ text.toString()}</p>,
      },  
      {
        title: 'Last ModifiedTime',
        dataIndex: 'lastModifiedTime',
        key: 'lastModifiedTime ',
      }
       
    ];
    return (
      <div>
        <div>
          <p> {this.props.seacrhmessagelable}</p>
          <label htmlFor="skus">{this.props.searchlable} :</label>
          <input type='text' name='skus' placeholder="Ex: 1002323,1232223" onChange={(e) => this.onChangeHadler(e)} />
          <Button type="primary" onClick={() => this.searchHandler()}>Buscar</Button>
        </div>
        {isNodata && <p className={styles.error}>No Data found!</p>}
        {isEmptySearchTerm && <p className={styles.error}>kindly enter SKU ID!</p>}

        {!isEmpty( tableData) && searchtype ==="retrieveNewArrivalData" &&  <Table dataSource={ tableData} columns={columns} scroll={{ x: 1300 }} />}
        {!isEmpty( tableData)  && searchtype ==="retrieveMaterialGroupData" &&  <Table dataSource={ tableData} columns={columnsforMaterialGroup}   />}

      </div>


    );
  }
}

export default withAuth(SeacrhSkuComponent);