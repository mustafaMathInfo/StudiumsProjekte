import {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import {AuthProvider} from "./context/authContext.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Landing from "./pages/Landing.jsx";
import Error from "./pages/Error.jsx";
import Navbar from "./component/Navbar.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import {ItemProvider} from "./context/itemContext.jsx";


function App() {
    const [theme, setTheme] = useState("light")
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])
    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    return (
        <AuthProvider>
            <ItemProvider>
                    <div className="h-screen bg-white dark:bg-black dark:text-white">
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' element={<Navbar/>}>
                                    <Route index element={<Landing/>}/>
                                    <Route path='/register' element={<Register/>}/>
                                    <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                                    <Route path='/home/:itemId' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                                    <Route path='/edit/:itemId' element={<ProtectedRoute><EditItem/></ProtectedRoute>}/>
                                    <Route path='/add' element={<ProtectedRoute><AddItem/></ProtectedRoute>}/>
                                    <Route path='*' element={<Error/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </div>
            </ItemProvider>
        </AuthProvider>
    )
}

export default App
