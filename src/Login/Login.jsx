import React, { useState } from 'react';
import './Login.css';
import InputField from '../Componentes/InputField/InputField';
import ButtonPrimary from '../Componentes/Button/ButtonPrimary';
import '../Componentes/TextStyles.css';
import { loginUser } from '../Services/AuthService.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    if (!isValidEmail(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }
  
    try {
      const response = await loginUser(email, password);
      console.log(response)
      if (response.statusCode === "200") {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', email);
        navigate('/dashboard');
      } else if (response.statusCode === "401") {
        console.log('Erro ao fazer login: Invalid email or password');
      } else {
        console.log('Erro ao fazer login: Empty response');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message || 'Erro desconhecido');
    }
  };
  
  
  // Função para validar o formato do email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  function goToCreateAccount() {
    navigate('/createAccount');
  }

  return (
    <div className="container-login">
      <h1 className='login_title'>Boas vindas!</h1>
      <h5 className='login_subtitle'>Faça login para entrar no sistema</h5>
      <div className="login_form_gap_spacing">
        <InputField
          id="email"
          labelText="E-mail"
          type="email"
          placeholder="Digite o seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="password"
          labelText="Senha"
          type="password"
          placeholder="Digite a sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <ButtonPrimary label="Fazer login" onClick={handleLogin} isFullWidth={true}/>
      <h5 className='already-have-account' onClick={goToCreateAccount}>
        Ainda não tem conta? Criar conta.
      </h5>
    </div>
  );
}

export default Login;
