// Package
import { Spin } from 'antd';

// Styles
import styles from '../../styles/loader.module.css';

export default function Loader() {
    return (
        <div className={styles.loader}>
            <Spin size="large"/>
        </div>
    )
}
