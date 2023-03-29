// Packages
import React from 'react';

// Antd
import { Result } from 'antd';

// Style
import styles from '../styles/page403.module.css';

export default function Page403(props) {

    return (
        <Result
            className={styles.wrapper}
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
        // extra={<Button type="primary">Back Home</Button>}
        />
    )
}