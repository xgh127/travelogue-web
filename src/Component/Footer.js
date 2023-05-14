import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer  style={{
            textAlign: 'center',
        }}>
            &copy; 2023 SJTU. All Rights Reserved By Xgh,Yh,Cy.
        </Footer>
    );
};

export default AppFooter;