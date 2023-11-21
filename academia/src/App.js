import Navbar from "./layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Register from "./pages/Register";
import './app.css';
import Detail from "./pages/Detail";
import EditExercise from "./pages/EditExercise";
import RegisterCategory from "./pages/RegisterCategory";
import EditCategory from "./pages/EditCategory";


function App() {
    const [filter, setFilter] = useState(null);
    const [modalOpen, setModalOpen] = useState('');
    const [editingExerciseId, setEditingExerciseId] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const handleModalChange = (newModalOpen) => {
        setModalOpen(newModalOpen);
    }

    const handleChangeEditingExercise = (newEditingExerciseId) => {
        setEditingExerciseId(newEditingExerciseId);
    }

    const handleChangeEditingCategory = (newEditingCategoryId) => {
        setEditingCategoryId(newEditingCategoryId);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setFilter(e.target[0].value);
    };
    return (
        <div className={'all'}>
            <BrowserRouter>
                <Navbar handleSearch={handleSearch} handleModalChange={handleModalChange}/>
                <Routes>
                    <Route path={'/'} element={<Home searchFilter={filter} handleChangeEditingCategory={handleChangeEditingCategory}/>} />
                    <Route path={'/category/:categoryId'} element={<Category handleChangeEditingExercise={handleChangeEditingExercise}/>}/>
                    <Route path={'/category/:categoryId/exercise/:exerciseId'} element={<Detail />}/>
                    <Route path={'/not-found'} element={<h1 className={'text-white'}>NÃO ENCONTRADA</h1>} />
                </Routes>

                {
                    modalOpen === '/add/exercise' && (
                        <Register modalOpen={modalOpen} handleModalChange={handleModalChange} />
                    )
                }

                {
                    modalOpen === '/add/category' && (
                        <RegisterCategory modalOpen={modalOpen} handleModalChange={handleModalChange} />
                    )
                }

                {
                    editingCategoryId !== null && (
                        <EditCategory categoryId={editingCategoryId} handleChangeEditingCategory={handleChangeEditingCategory}/>
                    )
                }

                {
                    editingExerciseId != null && (
                        <EditExercise exerciseId={editingExerciseId} handleChangeEditingExercise={handleChangeEditingExercise}/>
                    )
                }

            </BrowserRouter>
        </div>
    );
}

export default App;
