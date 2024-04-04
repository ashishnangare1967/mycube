import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://jsoncube.onrender.com/data');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setPhotos(response.data.slice(0, 9));
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchCustomers();
    fetchPhotos();

    // Fetch photos every 10 seconds
    const interval = setInterval(fetchPhotos, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleCustomerClick = (customerId: number) => {
    setSelectedCustomerId(customerId);
  };

  return (
    <div id='app'>
      <h1 className='heading'>Customer Details Portal</h1>
      <div className="customer-details-portal">
        <div className="customer-list">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className={`customer-card ${selectedCustomerId === customer.id ? 'selected' : ''}`}
              onClick={() => handleCustomerClick(customer.id)}
            >
              <h3>{customer.name}</h3>
              <p>{customer.title}</p>
            </div>
          ))}
        </div>
          <div className="customer-details">
          <div className=''>
            {selectedCustomerId !== null && (
              <>
                <h2>{customers.find((customer) => customer.id === selectedCustomerId)?.name}</h2>
                <p>{customers.find((customer) => customer.id === selectedCustomerId)?.title}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aliquid, sequi nulla quidem minus sapiente, quo quas, quibusdam ipsum molestiae possimus doloribus non. Repudiandae laudantium exercitationem, eligendi vitae vero consequatur.{customers.find((customer) => customer.id === selectedCustomerId)?.address}</p>
                <div className="photo-grid">
                  {photos.map((photo) => (

                    <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />

                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
