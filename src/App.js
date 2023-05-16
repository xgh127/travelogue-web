import './App.css';
import HomeView from "./View/HomeView";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import EditorAuditView from "./View/EditorView/EditorAuditView";
import LoginView from "./View/LoginView";
import TextEditorView from "./View/TextEditorView";
import PersonCenterView from "./View/PersonalCenterView";
import RegisterView from "./View/RegisterView";
const routes = [
    {
        path: '/',
        element: <HomeView />,
        canActivate: (user) => !!user // 只有登录用户才能访问首页
    },
    {
        path: '/login',
        element: <LoginView/>,
    },
    {
      path: '/personalCenter',
      element: <PersonCenterView/>,
        canActivate: (user) => !!user // 只有登录用户才能访问首页
    },
    {
        path: '/editor/audit',
        element: <EditorAuditView/>,
        canActivate: (user) => user && user.role === 'editor'
    },
    {
        path:'/textEditor',
        element: <TextEditorView/>,

    },
    {
        path:'/register',
        element: <RegisterView/>,
    },
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
