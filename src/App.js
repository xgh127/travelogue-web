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

import AdministratorView from "./View/AdministratorView";
import ManagerallView from "./View/ManagerallView";


import {Constant} from "./Utils/constant";
//0代表管理员，1代表用户，2代表编辑，3代表主编，-1代表黑名单用户

const routes = [
    {
        path: '/',
        element: <HomeView />,
        canActivate: (user) => !!user // 只有登录用户才能访问首页
    },

    {
        path: '/personalCenter',
        element: <PersonCenterView/>,
        canActivate: (user) => !!user // 只有登录用户才能访问首页
    },
    {
        path: '/editor/audit',
        element: <EditorAuditView/>,
        canActivate: (user) => user
    },
    {
        path:'/TextEditor',
        element: <TextEditorView/>,
        canActivate: (user) => {
            return user && user.UserAuth.userType === 1;
        }

    },
    {
        path: '/travelogueDetail',
        element: <TravelogueDetailView/>,
        canActivate: (user) => !!user
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
    }
];
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUserStatus = () => {
            const storedUser = localStorage.getItem(Constant.USER);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        checkUserStatus(); // 初始渲染时检查用户状态

        // 在每次渲染时检查用户状态
        const interval = setInterval(() => {
            checkUserStatus();
        }, 1000);

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
