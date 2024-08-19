import React, { useState } from "react";
import "./styles.css";
import Img from "../../assets/4957136.jpg";
import Axios from "axios";
import { Link } from 'react-router-dom';
import * as yup from "yup";



function Cadastro({ logado = false }) {

    // Estado para armazenar os valores dos campos e erros
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmation: '',
    });

    const [formErrors, setFormErrors] = useState({});



    // Definindo o schema de validação com Yup
    const validationsRegister = yup.object().shape({
        email: yup
            .string()
            .email("E-mail inválido")
            .required("O e-mail é obrigatório"),
        password: yup
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("A senha é obrigatória"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "As senhas são diferentes")
            .required("A confirmação da senha é obrigatória"),
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };


    const validate = async () => {
        try {

            //{ abortEarly: false } faz com que a validação continue mesmo após encontrar o primeiro erro, acumulando todos os erros encontrados.
            await validationsRegister.validate(formValues, { abortEarly: false }); 
            setFormErrors({});
            return true;
        } catch (err) {
            //err.inner é uma lista de erros retornados pela validação
            //O método reduce é usado para transformar essa lista em um objeto errors, onde cada chave é o caminho do erro (error.path)
            const errors = err.inner.reduce((acc, error) => { //acc -> acumulador
                return acc;
            }, {});
            setFormErrors(errors);
            return false;
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        const isValid = await validate();
        if (!isValid) return;
        
        try {
            const response = await Axios.post("http://localhost:3001/register", {
                email: formValues.email,
                password: formValues.password,
            });
            alert(response.data.msg);
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao registrar:", error);
        }
    };

    return (
        <div className="body">
            <div className="left-cadastro">
                <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
            </div>
            <div className="right-cadastro">
                <div className="card-cadastro">
                    <div className="user-links">
                        <div className="user-link-home">
                            {!logado && <Link to="/">Home</Link>}
                        </div>

                        <div className="user-link-cad">
                            {!logado && <Link to="/cadastro">Cadastro</Link>}
                        </div>
                    </div>
                    <h1>CADASTRO</h1>
                    <form className="login-form" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="email">Usuário</label>
                            <input
                                name="email"
                                type="email"
                                className="form-field"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                                // onChange={(e) => {setEmail(e.target.value)}}
                            />
                            {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                name="password"
                                type="password"
                                className="form-field"
                                placeholder="Senha"
                                value={formValues.password}
                                onChange={handleChange}
                                // onChange={(e) => {setPassword(e.target.value)}}
                            />
                            {formErrors.password && <span className="form-error">{formErrors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmation">Confirme sua senha</label>
                            <input
                                name="confirmation"
                                type="password"
                                className="form-field"
                                placeholder="Senha"
                                value={formValues.confirmation}
                                onChange={handleChange}
                                // onChange={(e) => {setConfirmantion(e.target.value)}}
                            />
                            {formErrors.confirmation && <span className="form-error">{formErrors.confirmation}</span>}
                        </div>
                        <button className="button" type="submit">
                            CADASTRAR
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
