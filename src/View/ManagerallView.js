import {Layout, Table, theme} from "antd";
import AppHeader from "../Component/AppHeader";
import AppFooter from "../Component/Footer";
import {NoteList} from "../Component/Content/NoteList";
import {AppContent} from "../Component/AppContent";
import AdministratorHeader from "../Component/AdministratorHeader";
import AdministratorSidebar from "../Component/AdministratorSidebar";
import ManagerAll from "../Component/ManagerAll";

const dataSource=[
    {
        id:1,
        Username:'nick1',
        email:'123@qq.com',
        telephone:'123456789',
        anthority:2,
    }
]

const ManagerallView = () => {

    return(
        <Layout>
            <AdministratorHeader/>
            <ManagerAll dataSource = {dataSource}/>
            <AppFooter/>
        </Layout>
    )
}
export default ManagerallView;