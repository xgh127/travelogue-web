import {Layout, theme} from "antd";
import AppHeader from "../Component/AppHeader";
import {Content} from "antd/es/layout/layout";
import AppFooter from "../Component/Footer";

const HomeView = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return(
        <Layout>
        <AppHeader/>
            <Content
                className="site-layout"
                style={{
                    padding: '0 50px',
                }}
            >

                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                    }}
                >
                    Content！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                    ！！！！！！！！！！！！！！！！
                </div>
            </Content>
            <AppFooter/>
        </Layout>
    )
}
export default HomeView;