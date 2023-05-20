import {Layout, Table} from "antd";
import AppFooter from "../Component/Footer";
import AdministratorHeader from "../Component/AdministratorHeader";
import ManagerAll from "../Component/ManagerAll";



const ManagerallView = () => {

    return(
        <Layout>
            <AdministratorHeader/>
            <ManagerAll/>
            <AppFooter/>
        </Layout>
    )
}
export default ManagerallView;