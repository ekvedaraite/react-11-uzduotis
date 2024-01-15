import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';

const PetLogsPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [petLogs, setPetLogs] = useState([]);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        // Fetch pet details
        const petResp = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${id}`, {
          method: 'GET',
        });
        const petData = await petResp.json();
        setPet(petData);

        // Fetch pet logs
        const logsResp = await fetch(`https://vetbee-backend.glitch.me/v1/logs/${id}`, {
          method: 'GET',
        });
        const logsData = await logsResp.json();
        setPetLogs(logsData);
      } catch (error) {
        console.log('Error fetching pet details and logs:', error);
      }
    };

    fetchPetDetails();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Invalid Date';
    }

    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        // Format the date as "yyyy-mm-dd"
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      } else {
        throw new Error('Invalid Date');
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  return (
    <>
      <Header />
      <div className='petLogsPageDiv'>
        <div className="h1AndBtn">
        <h1 className='petLogsPageH1'>{pet.name}: Health Records</h1>
        <div className='petLogsPageButtons'>
          <Link to={`/add-log/${id}`}>
            <button className='addLogBtn'>Add Log</button>
          </Link>
          <Link to={`/`}>
            <button className='goBackBtn'>Go Back</button>
          </Link>
        </div>
        </div>
        <div className='LogsDiv'>
          {Array.isArray(petLogs) && petLogs.length > 0 ? (
            petLogs.map((log, index) => {
              console.log('Log data:', log);
              return (
                <div key={index} className='logCard'>
                  <h3>{log.status}</h3>
                  <p>{log.description}</p>
                  <p className='logDate'>{pet.dob ? formatDate(pet.dob) : 'Invalid Date'}</p>
                </div>
              );
            })
          ) : (
            <p>No health records available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PetLogsPage;
