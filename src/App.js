import React, {useEffect, useState} from "react";
import './App.css';
import HomeView from "./View/HomeView";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import EditorAuditView from "./View/EditorView/EditorAuditView";
import LoginView from "./View/LoginView";
import TextEditorView from "./View/TextEditorView";
import PersonCenterView from "./View/PersonalCenterView";
import RegisterView from "./View/RegisterView";
import TravelogueDetailView from "./View/TraveloguDetailView";
import ManagerallView from "./View/ManagerallView";
import {Constant} from "./Utils/constant";
import CollaborativeFiltering from "./View/RecommendView/CollaborativeFiltering";
import ViewsRecommendView from "./View/RecommendView/ViewsRecommend";
import AdministratorView from "./View/AdministratorView";
import SearchResultView from "./View/SearchResultView";
import {checkLogin} from "./Service/UserService";
//0代表管理员，1代表用户，2代表编辑，3代表主编，-1代表黑名单用户


const routes = [
    {
        path: '/',
        element: <HomeView />,
        canActivate: checkLogin
    },

    {
        path: '/personalCenter',
        element: <PersonCenterView/>,
        canActivate: checkLogin
    },
    {
        path: '/editor/audit',
        element: <EditorAuditView/>,
        canActivate: (user) => user
    },
    {
        path:'/TextEditor',
        element: <TextEditorView/>,
        canActivate: checkLogin

    },
    {
        path: '/travelogueDetail',
        element: <TravelogueDetailView/>,
        canActivate: checkLogin
    },
    {
        path: '/CollaborativeFiltering',
        element: <CollaborativeFiltering/>,
        canActivate: checkLogin
    },
    {

        path:'/register',
        element: <RegisterView/>,
    },
    {
        path:'/administrator',
        element: <AdministratorView/>,
    },
    {
        path: '/manager',
        element: <ManagerallView/>,
    },
    {
        path:'/ViewsRecommend',
        element: <ViewsRecommendView/>,
        canActivate: checkLogin
    },
    {
        path:'/SearchResult',
        element: <SearchResultView/>,
        canActivate: checkLogin
    }
];
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUserStatus = () => {
            const storedUser = localStorage.getItem(Constant.USER);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        checkUserStatus(); // 初始渲染时检查用户状态

        // 在每次渲染时检查用户状态
        const interval = setInterval(() => {
            checkUserStatus();
        }, 500);

        return () => {
            clearInterval(interval); // 组件卸载时清除定时器
        };
    }, []);
        return (
            <Router>
                <div className="App">
                    <Routes>

                        {routes.map(route => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    route.canActivate ?
                                        route.canActivate(user) ?
                                            route.element:
                                            <Navigate to="/login" replace/> :
                                        route.element
                                }
                            />
                        ))}
                        <Route path="/login" element={<LoginView setUser={setUser} />} />
                    </Routes>
                </div>
            </Router>
        );
    }

export default App;
