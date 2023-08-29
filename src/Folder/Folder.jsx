import arrow_right from '../assets/Icons/right-arrow-svgrepo-com.svg';

import React, { useState, useEffect } from 'react';
import './Folder.css';
import '../Componentes/TextStyles.css';
import { useNavigate } from 'react-router-dom';
import FilesGrid from './Componentes/FilesGrid';
import LoadingView from '../Componentes/Loading/Loading'
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Importe o Axios

const API_BASE_URL = 'http://gpt-treinador.herokuapp.com/';

function Folder() {

    const navigate = useNavigate();
    const { folderid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [folderName, setFolderName] = useState(true);
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    useEffect(() => {
        console.log("entrou");
      const tokenData = {
        email: email, // Substitua pelo email do usuário
        token: token // Substitua pelo token do usuário
      };
  
      axios.post(`${API_BASE_URL}/v1/check_token`, tokenData)
        .then(tokenResponse => {
          if (tokenResponse.status === 200) {
            axios.post(`${API_BASE_URL}/v1/files`, {
              folderID: folderid
            })
            .then(response => {
              setFiles(response.data.files);
              setFolderName(response.data.folderName);
              setIsLoading(false);
            })
            .catch(error => {
              console.error('Erro ao obter arquivos:', error);
              setIsLoading(false);
            });
          } else {
            console.log("vai pra login");
            navigate('/');
          }
        })
        .catch(tokenError => {
          console.error('Erro ao verificar token:', tokenError);
          navigate('/');
        });
    }, [folderid]);

    const handleItemClick = (index) => {
        console.log(`Item ${index + 1} clicado.`);
    };

    const goToMyFolders = (index) => {
        console.log(`clicou`);
        navigate("/dashboard");
    };

    return (
        <div className='folder-all-bkacground'>
            <div className='folder-container'>
                <div className='vertical-breadcrumbs'>
                    <h3 className='folder-title' onClick={goToMyFolders}>
                        Pastas
                    </h3>
                    <img className="arrow-icon-breadcrumb" src={arrow_right} alt="arrow right" />
                    <h3 className='folder-actual-name'>
                        {folderName}
                    </h3>
                </div>
                <div className='container-folders-view'>
                    {/* Atualiza para usar o estado "files" */}
                    <FilesGrid items={files} onItemClick={handleItemClick} />
                </div>
            </div>
            {isLoading && ( // Renderização condicional com base no estado isLoading
                <LoadingView />
            )}
        </div>
    );
}

export default Folder;
