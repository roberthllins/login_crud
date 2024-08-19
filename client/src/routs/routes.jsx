import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Home from '../pages/Home'


const logado = localStorage.getItem('@user');

const Rotas = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {!logado && <Route path="/" element={<Login logado={logado} />} />}
                    {logado && <Route path="/" exact element={<Home/>} />}
                    {!logado && <Route path="/cadastro" element={<Cadastro logado={logado} />} />}
                </Routes>
            </BrowserRouter>
        </div>

    );
};

export default Rotas