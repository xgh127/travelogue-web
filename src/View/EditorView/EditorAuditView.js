import {Layout} from "antd";
import {AppContent} from "../../Component/AppContent";
import AppFooter from "../../Component/Footer";


const EditorAuditView = () => {

    return(
        <Layout>
            <Layout.Header/>
            <AppContent children={<div>这是编辑页面</div>}/>
            <AppFooter/>
        </Layout>
    )
}
export default EditorAuditView;