import gear_thin from '../assets/Icons/gearshape.svg';

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
    const fetchData = async () => {
        
      const apiUrl = `${API_BASE_URL}/v1/folders`;
      const requestData = {
        ownerID: '1',
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
      };

      try {
        const response = await axios.post(apiUrl, requestData);
        if (response.status === 200) {
          console.error('sucesso');
          const data = response.data;
          setFolders(data.folders)
          setIsLoading(false);
        } else if (response.status === 401) {
          setIsLoading(false);
        } else if (response.status === 400) {
          setIsLoading(false);
        } else if (response.status === 500) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('5');
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleItemClick = (index) => {
    const folderid = `${folders[index].folderID}`;
    navigate(`/folder/${folderid}`);
  };

  const goToSettings = (index) => {
    navigate(`/settings`);
  };

  return (
    <div>
      <div className='dashboard-container'>
        <div className='dashboard-vertical-breadcrumbs'>
            <h5 className='dashboard-title'>
                Minhas pastas
            </h5>
            <img className="gear_thin_icon" src={gear_thin} alt="gear_thin" onClick={goToSettings}/>
        </div>
        <div className='container-dashboard-view'>
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
