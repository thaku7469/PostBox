import React, { lazy } from 'react'
import { Suspense } from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { routes } from "./routes/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorComponent = lazy(() => import('./components/helperComponents/ErrorComponent'));
const BufferingComponent = lazy(() => import('./components/helperComponents/BufferingComponent'));


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      <Route path={routes.main.path} element={<routes.main.element />} >
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>

      <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
    </Route>
  )
)

const App = () => {
  return (
    <Suspense fallback = {<BufferingComponent />}>
      <RouterProvider router={router} />
      <ToastContainer 
        position="bottom-left" 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
    </Suspense>
  )
}

export default App