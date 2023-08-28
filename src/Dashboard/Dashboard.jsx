import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import '../Componentes/TextStyles.css';
import { useNavigate } from 'react-router-dom';
import MenuGrid from './Componentes/MenuGrid';

const API_BASE_URL = 'http://gpt-treinador.herokuapp.com/'; // Altere para a URL correta do seu servidor

function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/v1/folders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ownerID: '1' })
    })
      .then(response => response.json())
      .then(data => {
        setFolders(data.folders);
        setIsLoading(false); // Marcar o carregamento como concluído
      })
      .catch(error => {
        console.error('Erro ao obter pastas:', error);
        setIsLoading(false); // Marcar o carregamento como concluído mesmo em caso de erro
      });
  }, []);

  const handleItemClick = (index) => {
    console.log(`Clicked folder ${folders[index].folderID}`); // O erro está aqui
    const folderid = `${folders[index].folderID}`; // Deveria ser folderID em vez de folderid
    navigate(`/folder/${folderid}`);
  };

  return (
    <div className='dashboard-container'>
      {isLoading && ( // Renderização condicional com base no estado isLoading
        <div className='dashboard-overlay'>
          <h4>
            Carregando
          </h4>
        </div>
      )}
      <h1 className='dashboard-title'>
        Suas pastas
      </h1>
      <div className='container-folders-view'>
        <MenuGrid items={folders} onItemClick={handleItemClick} />
      </div>
    </div>
  );
}

export default Login;
