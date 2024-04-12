import React from 'react';

interface Boat {
  mooringNumber: number;
  boatName: string;
}

interface BoatyardDetail {
  name: string;
  address: string;
  boats: Boat[];
}

interface DataProps {
  boatyardDetails: BoatyardDetail[];
}

const RowExpansionDemo: React.FC<DataProps> = ({ boatyardDetails }) => {
  return (
    <div>
      <h4>Boatyard Details</h4>
      {boatyardDetails.map((detail, index) => (
        <div key={index}>
          <p>
            <strong>Name:</strong> {detail.name}, <strong>Address:</strong> {detail.address}
          </p>
          <ul>
            {detail.boats.map((boat, idx) => (
              <li key={idx}>
                <strong>Mooring Number:</strong> {boat.mooringNumber}, <strong>Boat Name:</strong> {boat.boatName}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RowExpansionDemo;
