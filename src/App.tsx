import React, { useState } from 'react';
import './App.css';
import { useAxios } from './customhook/Ax';
import CustomerList from './component/CustomerList';
import CustomerDetails from './component/CustomerDetails';

const App: React.FC = () => {
  const { data: customers, loading: customersLoading } = useAxios('https://jsoncube.onrender.com/data', []);
  const { data: photos, loading: photosLoading } = useAxios('https://jsonplaceholder.typicode.com/photos?_limit=9', []);

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCustomerClick = (customerId: number) => {
    setSelectedCustomerId(customerId);
  };

  // Checking if any loading is still in progress
  if (customersLoading || photosLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Loading...</div>
    </div>
  }

  // Once loading is finished, render the main content
  return (
    <div id="app">
      <h1 className="heading">Customer Details Portal</h1>
      <div className="customer-details-portal">
        <CustomerList customers={customers} selectedCustomerId={selectedCustomerId} handleCustomerClick={handleCustomerClick} />
        <CustomerDetails
          customer={customers.find((customer: { id: number }) => customer.id === selectedCustomerId)}
          photos={photos}
        />
      </div>
    </div>
  );
};

export default App;
