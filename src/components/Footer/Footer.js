// Packages
import { Component } from 'react';
import React from 'react'

// Styles
import styles from '../../styles/footer.module.css';

export class Footer extends Component {
    render() {
        return (
            <footer className={styles.footer}>
                Copyright © 2021 by Liverpool | All Rights Reserved.
            </footer>
        )
    }
}

export default Footer
