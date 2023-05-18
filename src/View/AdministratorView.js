import {Layout, Table, theme} from "antd";
import AppHeader from "../Component/AppHeader";
import AppFooter from "../Component/Footer";
import {NoteList} from "../Component/Content/NoteList";
import {AppContent} from "../Component/AppContent";
import AdministratorHeader from "../Component/AdministratorHeader";
import AdministratorSidebar from "../Component/AdministratorSidebar";

const dataSource=[
    {
        id:1,
        title:'你好yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
        anthor:"作者1yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        summary:"总结1yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    }
]

const AdministratorView = () => {

    return(
        <Layout>
            <AdministratorHeader/>
            <AdministratorSidebar dataSource = {dataSource} />
            <AppFooter/>
        </Layout>
    )
}
export default AdministratorView;