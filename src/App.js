import './App.css';
import HomeView from "./View/HomeView";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import EditorAuditView from "./View/EditorView/EditorAuditView";
import LoginView from "./View/LoginView";
const routes = [
    {
        path: '/',
        element: <HomeView />,
        canActivate: (user) => user ? true : false // 只有登录用户才能访问首页
    },
    {
        path: '/login',
        element: <LoginView/>,
    },
    {
        path: '/editor/audit',
        element: <EditorAuditView/>,
        canActivate: (user) => user && user.role === 'editor' // 只有管理员用户才能访问仪表盘页面
    }
];
function App() {
    const user = {
        name: 'jerry',
        role: 'editor'
    }; // 假设从localStorage中读取用户信息

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
                              route.element :
                              <Navigate to="/login" replace /> :
                          route.element
                  }
              />
          ))}
      </Routes>
    </div>
</Router>
  );
}

export default App;
