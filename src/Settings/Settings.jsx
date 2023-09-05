import React, { useState } from 'react';
import './Settings.css';
import ButtonPrimary from '../Componentes/Button/ButtonPrimary';
import  '../Componentes/TextStyles.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../Componentes/InputField/InputField';

function Settings() {

    const [editedEmail, setEditedEmail] = useState(localStorage.getItem('email'));
    const [editedPhone, setEditedPhone] = useState(localStorage.getItem('phone'));
    const [editedName, setEditedName] = useState(localStorage.getItem('name'))

    const navigate = useNavigate();

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
            <h5 className='settings_subtitle'>Defina as informações que aparecerão nas assinaturas das imagens</h5>
            <div className='settings_spacing_between_form_and_buttons'>
                <div className='settings_list_items'>
                    <InputField
                        id="name"
                        labelText="Nome"
                        type="name"
                        placeholder="Digite seu nome"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <InputField
                        id="email"
                        labelText="E-mail"
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                    />
                    <InputField
                        id="phone"
                        labelText="Telefone"
                        type="phone"
                        placeholder="Digite seu telefone"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                    />
                </div>
                <div className='settings_row_buttons'>
                    <h4 className='row_item_settings_label' onClick={backToDashboard} >Voltar sem salvar</h4>
                    <ButtonPrimary label="Salvar" onClick={saveData} isFullWidth={false}/>
                </div>
            </div>
        </div>
    );
}

export default Settings;