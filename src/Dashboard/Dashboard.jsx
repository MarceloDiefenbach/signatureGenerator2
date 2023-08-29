import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import '../Componentes/TextStyles.css';
import { useNavigate } from 'react-router-dom';
import MenuGrid from './Componentes/MenuGrid';
import LoadingView from '../Componentes/Loading/Loading'
import axios from 'axios';

const API_BASE_URL = 'http://gpt-treinador.herokuapp.com/';

function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  
  useEffect(() => {

    const tokenData = {
      email: localStorage.getItem('email'), // Substitua pelo email do usuário
      token: localStorage.getItem('token') // Substitua pelo token do usuário
    };

    axios.post(`${API_BASE_URL}/v1/check_token`, tokenData)
      .then(tokenResponse => {
        if (tokenResponse.status === 200) {
          axios.post(`${API_BASE_URL}/v1/folders`, { ownerID: '1' }, {
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then(response => {
              setFolders(response.data.folders);
              setIsLoading(false);
          })
          .catch(error => {
              console.error('Erro ao obter pastas:', error);
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
  }, []);

  const handleItemClick = (index) => {
    const folderid = `${folders[index].folderID}`;
    navigate(`/folder/${folderid}`);
  };

  return (
    <div>
      <div className='dashboard-container'>
        <h3 className='dashboard-title'>
          Pastas
        </h3>
        <div className='container-folders-view'>
          <MenuGrid items={folders} onItemClick={handleItemClick} />
        </div>
      </div>
      {isLoading && (
          <LoadingView />
        )}
    </div>
  );
}

export default Login;
