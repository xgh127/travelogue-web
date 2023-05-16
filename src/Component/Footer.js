import React from 'react';
import { Layout } from 'antd';
import '../CSS/AppHeader.css';
const { Footer } = Layout;

const AppFooter = () => {
    return (
        <div className="footer-wrapper">
        <Footer  style={{
            textAlign: 'center',

        }}>
            &copy; 2023 SJTU. All Rights Reserved By Xgh,Yh,Cy.
        </Footer>
        </div>
    );
};

export default AppFooter;