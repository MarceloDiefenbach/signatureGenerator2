import React, { useState, useEffect } from 'react';
import './Settings.css';
import ButtonPrimary from '../Componentes/Button/ButtonPrimary';
import  '../Componentes/TextStyles.css';
import { useNavigate } from 'react-router-dom';

function Settings() {

    const [editedEmail, setEditedEmail] = useState(localStorage.getItem('email'));
    const [editedPhone, setEditedPhone] = useState(localStorage.getItem('phone'));
    const [editedName, setEditedName] = useState(localStorage.getItem('name'))

    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log("oi");
        navigate('/dashboard')
    };

    function backToDashboard() {
        navigate('/dashboard');
    }

    function saveData() {
        localStorage.setItem('email', editedEmail);
        localStorage.setItem('phone', editedPhone);
        localStorage.setItem('name', editedName);
        navigate('/dashboard');
    }

    return (
        <div className="settings-main-container">
            <div className="circulo"></div>
            <div className='settings_list_items'>
                <h5 className='settings_client_input_label'>Nome</h5>
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className='settings_client_email'
                    placeholder="Digite seu nome"
                />
                <h5 className='settings_client_input_label'>E-mail</h5>
                <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className='settings_client_email'
                    placeholder="Digite seu email"
                />
                <h5 className='settings_client_input_label'>Telefone</h5>
                <input
                    type="text"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className='settings_client_email'
                    placeholder="Digite seu telefone"
                />
                <div className='back_to_dashboard_button_setting' onClick={backToDashboard} >
                    <ButtonPrimary label="Salvar" onClick={saveData} isFullWidth={true}/>
                </div>
            </div>
            <h4 className='row_item_settings_label'>Voltar para o dashboard</h4>
        </div>
    );
}

export default Settings;