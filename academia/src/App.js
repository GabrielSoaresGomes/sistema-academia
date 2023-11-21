import Navbar from "./layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Register from "./pages/Register";
import './app.css';
import Detail from "./pages/Detail";
import EditExercise from "./pages/EditExercise";


function App() {
    const [filter, setFilter] = useState(null);
    const handleSearch = (e) => {
        e.preventDefault();
        setFilter(e.target[0].value);
    };
    return (
        <div className={'all'}>
            <BrowserRouter>
                <Navbar handleSearch={handleSearch} />
                <Routes>
                    <Route path={'/'} element={<Home searchFilter={filter} />} />
                    <Route path={'/category/:categoryId'} element={<Category/>}/>
                    <Route path={'/add'} element={<Register />}/>
                    <Route path={'/:exerciseId/edit'} element={<EditExercise />}/>
                    <Route path={'/category/:categoryId/exercise/:exerciseId'} element={<Detail />}/>
                    <Route path={'/not-found'} element={<h1 className={'text-white'}>NÃO ENCONTRADA</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
