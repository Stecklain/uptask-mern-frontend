import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios.jsx'
import useAuth from "../hooks/useAuth";

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    //TODO: Mover la alerta a su propio context(?)
    const [ alerta, setAlerta ] = useState({});

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password });
            setAlerta({});
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/proyectos');
        } catch (error) {
            setAlerta({
                msg: error.message,
                error: true
            });
        }

    }

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Inicia Sesión Y Administra Tus {''} 
                <span className="text-slate-700">Proyectos</span>
            </h1>

            { msg && <Alerta alerta={alerta} /> }

            <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"                    
                        type="email"
                        placeholder="Email de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >Password</label>
                    <input
                        id="password"                    
                        type="password"
                        placeholder="Password de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit"
                    value={"Iniciar sesión"}
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded 
                    hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
                
            </form>
            
            <nav className="lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/registrar"
                >¿No tienes una cuenta? Regístrate</Link>
                
                <Link 
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/olvide-password"
                >Olvidé mi password</Link>
            </nav>
        </>
    )
}

export default Login
