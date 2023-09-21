import Navbar from "./layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <h1>Academia</h1>
            <Routes>
                <Route path={'/'} element={<Home />}/>
                <Route path={'/teste'} element={<h1>Oi</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
