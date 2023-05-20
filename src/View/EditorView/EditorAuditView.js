import React from "react";
import {Layout} from "antd";
import {AppContent} from "../../Component/AppContent";
import AppFooter from "../../Component/Footer";
import EditorAudit from "../../Component/EditorAudit";


const EditorAuditView = () => {

    return(
        <Layout>
            <Layout.Header/>
            <AppContent children={<EditorAudit/>}/>
            <AppFooter/>
        </Layout>
    )
}
export default EditorAuditView;