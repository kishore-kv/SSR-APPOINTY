
import withAuth from "../../lib/auth/withAuth";
import { Layout } from 'antd';
import styles from '../../styles/upload.module.css';
import UploadDocument from "./uploadDoc/uploadDoc";
import './upload-doc.css'
import { Component} from "react";
import { requestFeedMastePost } from "../../lib/request";
const { Content } = Layout;
 
 
 
class UploadData extends Component {
    state = { 
        totalrecordCount: {}
     } 


    componentDidMount = async() =>{
        const url =  'fetch/recordsCount';
        try{
            const response =  await requestFeedMastePost(url,{},'post')
            if(response && response.data) {
                    this.setState({
                        totalrecordCount: response.data 
                    })
            }
        }
        catch(e){
            console.error("error in fetch records",e)
        }
    }

    render() { 
        const { totalrecordCount } = this.state
        return (
            <div className={styles.config_wrapper}>
                <Layout className={styles.display_name_wrapper}>
                    <Content>
                        <div className={styles.main_wrapper}>
                            <div>
                                <div className={styles.main_navbar}>
                                    <h2 className={styles.header_lable}>Searchanise Config data</h2>
                                    <h2 className={styles.text_center} >Configuración de la sección de datos relacionados con la búsqueda</h2>
                                </div>
                                <UploadDocument
                                    headerLable="Llegada de nuevos productos"
                                    mainlable="Buscar nuevo producto Archivo de datos de llegada Sección de carga y verificación"
                                    messagelable="[Solo se permiten archivos CSV y cada archivo CSV espera 200,000 como entradas máximas]"
                                    countfisrt={`Actualmente, el número total de registros de llegada de nuevos productos disponibles es: `}
                                    countsecond ={'donde el recuento habilitado es '}
                                    seacrhmessagelable="Es recomendable ingresar varios SKU a la vez con coma como separador"
                                    searchlable="SKUS"
                                    totalcount ={totalrecordCount.NewArrivalsTotalCount}
                                    enablecount ={totalrecordCount.NewArrivalsEnabledCount}
                                    uploadtype ="newArrivals"
                                    searchtype ="retrieveNewArrivalData" />
                                {/* <hr className="main-separator"></hr> */}
                                <UploadDocument    
                                    headerLable="Grupo de materiales"
                                    mainlable="Datos de configuración del  Grupo de materiales específicos de los accesorios relacionados con el motor de búsqueda Sección de verificación y carga"
                                    messagelable="[Solo se permiten archivos CSV y cada archivo CSV espera 200,000 como entradas máximas]"
                                    seacrhmessagelable="Es recomendable ingresar varios SKU a la vez con coma como separador"
                                    searchlable="Grupos de Material"  
                                    uploadtype ="materialGroup" 
                                    searchtype = "retrieveMaterialGroupData"
                                    countfisrt={`Actualmente, el número total de registros de llegada de nuevos productos disponibles es: `}
                                    countsecond ={'donde el recuento habilitado es '}
                                    totalcount ={totalrecordCount.MaterialGroupTotalCount}
                                    enablecount ={totalrecordCount.MaterialGroupEnabledCount}
                                    />
    
                            </div>
                        </div>
                    </Content>
                </Layout>
            </div>
    
        );
    }
}
 
export default withAuth(UploadData);