import React, { useState } from 'react';
import './CreateAccount.css';
import InputField from '../Componentes/InputField/InputField';
import ButtonPrimary from '../Componentes/Button/ButtonPrimary';
import  '../Componentes/TextStyles.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log("oi");
    navigate('/dashboard')
  };

  function goToLogin() {
    // Coloque o código que deseja executar quando a ação ocorrer
    navigate('/');
  }

  return (
    <div className="container-create">
      <InputField
        id="name"
        labelText="Nome"
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        id="email2"
        labelText="E-mail"
        type="email"
        placeholder="Digite o seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="final-input-create">
        <InputField
          id="password"
          labelText="Senha"
          type="password"
          placeholder="Digite a sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <ButtonPrimary label="Criar conta" onClick={handleLogin} />
      <h5 className='still_dont_have_account' onClick={goToLogin}>
        Já tenho uma conta! Fazer login.
      </h5>
    </div>
  );
}

export default Login;