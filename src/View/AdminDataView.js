import {Layout, Table, Tabs, theme} from "antd";
import AppFooter from "../Component/Footer";
import AdministratorHeader from "../Component/AdministratorHeader";
import ManageData from "../Component/ManageData";




const AdminDataView = () => {

    return(
        <Layout>
            <AdministratorHeader/>
            <ManageData/>
            <AppFooter/>
        </Layout>
    )
}
export default AdminDataView;