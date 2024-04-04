import React from 'react';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface Photo {
  id: number;
  thumbnailUrl: string;
  title: string;
}

interface CustomerDetailsProps {
  customer: Customer | undefined;
  photos: Photo[];
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, photos }) => {
  return (
    <div className="customer-details">
      {customer && (
        <>
          <h2>{customer.name}</h2>
          <p>{customer.title}</p>
          <p>{customer.address}</p>
          <div className="photo-grid">
            {photos.map((photo) => (
              <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerDetails;
