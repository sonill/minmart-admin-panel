import { Toaster } from 'react-hot-toast';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// import css
import './App.css'

// protected route
import Protected from './components/route/Protected';

// import components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/util/NotFound';
import Users from './components/admin/users/Users';
import Stores from './components/admin/stores/Stores';
import AdminLayout from './components/admin/AdminLayout';
import Products from './components/admin/products/Products';
import AllOrders from './components/admin/orders/AllOrders';
import ForgotPassword from './components/pages/ForgotPassword';

// app
function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
    
                <Route path='admin' element={<Protected isLoggedIn={false}><AdminLayout /></Protected>}>
                    <Route index element={<AllOrders />} />
                    <Route path='orders' element={<AllOrders />} />
                    <Route path='products' element={<Products />} />
                    <Route path='stores' element={<Stores />} />
                    <Route path='users' element={<Users />} />
                </Route>
    
                <Route path="*" element={<NotFound />} />
            </>
        )
    );

    
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={router} />
        </>
    )
}

export default App
