import { Toaster } from 'react-hot-toast';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// import css
import './App.css'

// import components
import Home from './components/pages/Home';
import AdminLayout from './components/admin/AdminLayout';
import Orders from './components/admin/Orders';
import Products from './components/admin/Products';
import Stores from './components/admin/Stores'
import Users from './components/admin/Users';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RegiterForm from './components/auth/RegisterForm';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='admin' element={<AdminLayout />}>
                <Route index element={<Orders />} />
                <Route exact path='orders' element={<Orders />} />
                <Route exact path='products' element={<Products />} />
                <Route exact path='stores' element={<Stores />} />
                <Route exact path='users' element={<Users />} />
            </Route>
        </>
    )
);

function App() {

    return (
        <>
            <div className="app">
                <Toaster position="top-center" reverseOrder={false} />
                <RouterProvider router={router} />
            </div>
        </>
    )
}

export default App
