import { ToastContainer } from 'react-toastify'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { adminRoutes, publicRoutes } from './routers'
import AdminRoute from './routers/AdminRoute'
import { useSelector } from 'react-redux'
import { selectAuth } from './redux/store'
import AdminLayout from './layouts/AdminLayout'
import SignIn from './pages/SignIn'
function App() {
  const user = useSelector(selectAuth).login.user
  return (
    <>
    
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          return <Route key={index} path={route.path} element={<Page />}></Route>
        })}
        {adminRoutes.map((route, index) => {
          const Page = route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <AdminRoute isAllowed={!!user?.accessToken && user.roles.includes("ROLE_ADMIN")}>
                  <AdminLayout>
                    <Page />
                  </AdminLayout>
                </AdminRoute>
              }
            ></Route>
          )
        })}
      </Routes>
      <div>

      <ToastContainer />
      </div>
    </>
  )
}

export default App
