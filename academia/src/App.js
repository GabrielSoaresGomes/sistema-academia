import Navbar from "./layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import './app.css';
import H1 from "./components/H1";


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
                <H1 text={'Academia L'} />
                <Routes>
                    <Route path={'/'} element={<Home searchFilter={filter} />}/>
                    <Route path={'/add'} element={<Register />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
