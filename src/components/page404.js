// Packages
import React from 'react';

// Antd
import { Result } from 'antd';

// Style
import styles from '../styles/page403.module.css';

export default function Page404(props) {

    return (
        <Result
            className={styles.wrapper}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
        // extra={<Button type="primary">Back Home</Button>}
        />
    )
}