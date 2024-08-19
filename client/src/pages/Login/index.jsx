import './styles.css';


import React, { useState } from 'react';
import Axios from 'axios';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import img from '../../assets/4957136.jpg'



function Login({ logado = false }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});


  // Definindo o esquema de validação com Yup
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    password: yup
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .required('A senha é obrigatória'),
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    //prevData representa o estado anterior do formulário.
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando os dados do formulário
    validationSchema
      .validate(formData, { abortEarly: false }) //faz com que o yup colete todos os erros de validação em vez de parar na primeira falha.
      .then(() => { //é chamado se a validação for bem-sucedida
        // Se a validação passar, enviar os dados
        Axios.post("http://localhost:3001/login", formData)
          .then((response) => {
            const page = response.data;

            if (page === true) {
              localStorage.setItem('@user', JSON.stringify(formData));
              window.location.reload();
            } else {
              alert(response.data.msg);
            }
          });
      })
      .catch((err) => {
        // Se houver erros de validação, atualizar o estado de erros
        //err.inner contém uma lista de todos os erros de validação.
        //reduce é usado para transformar esses erros em um objeto de erros onde a chave é o nome do campo e o valor é a mensagem de erro
        // acc é o acumulador de erro
        // error é o valor atual
        const validationErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      });
  };

  return (
    <div className="body">

      <div className="left-login">
        <img src={img} alt="Descrição da Imagem" className="chart" />
      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">

            <div className="user-link-home">
              {!logado && <Link to="/">Home</Link>}
            </div>

            <div className="user-link-cad">
              {!logado && <Link to="/cadastro">Cadastro</Link>}
            </div>

          </div>
          
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">

              <label htmlFor="email">Usuário</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-field"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-field"
                placeholder="Senha"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <button className="button" type="submit">
              ENTRAR
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
