import { type FC } from "react"
import { Navigate, Route, Routes } from "react-router"
import { APP_ROUTE } from "../config";


import { ProtectedRoute } from "..";
import { ProfilePage, NotFoundPage, ProductAdd, BasketPage, OrderPage } from "../../pages";
import { LoginPage, LogoutPage, RegisterPage, PageLayout } from "../../pages";
import { ProductPage, ProductEditPage } from "../../pages";


const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path={APP_ROUTE.root} element={<Navigate to={APP_ROUTE.product} />} />
        <Route path={APP_ROUTE.product} element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        <Route path={APP_ROUTE.basket} element={<ProtectedRoute><BasketPage /></ProtectedRoute>} />
        <Route path={APP_ROUTE.order} element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path={APP_ROUTE.productAdd} element={<ProtectedRoute><ProductAdd /></ProtectedRoute>} />
        <Route path={`${APP_ROUTE.productEdit}/:id`} element={<ProtectedRoute><ProductEditPage /></ProtectedRoute>} />
        <Route path={APP_ROUTE.profile} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path={APP_ROUTE.logout} element={<LogoutPage />} />
        <Route path={APP_ROUTE.login} element={<LoginPage />} />
        <Route path={APP_ROUTE.register} element={<RegisterPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes