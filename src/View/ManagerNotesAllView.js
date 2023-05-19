import {Layout, Table, theme} from "antd";
import AppFooter from "../Component/Footer";
import AdministratorHeader from "../Component/AdministratorHeader";
import ManagerNotesAll from "../Component/ManagerNotesAll";



const ManagerNotesAllView = () => {

    return(
        <Layout>
            <AdministratorHeader/>
            <ManagerNotesAll/>
            <AppFooter/>
        </Layout>
    )
}
export default ManagerNotesAllView;