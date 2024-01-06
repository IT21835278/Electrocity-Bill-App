import React, { useEffect, useState } from 'react';
import { fetchUnitPrice } from '../../services/UnitPriceService';

const ViewUnitRate = () => {
  const [units, setUnits] = useState(0);

  useEffect(() => {
    async function getPrices() {
      try {
        const data = await fetchUnitPrice();
        console.log('Fetched data:', data);
        setUnits(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getPrices();
  }, []);

  return (
    <div>
      {units ? (
        <table>
            <tr>
              <th><b>CONSUMER CATEGORY</b></th>
              <th><b>Enargy Charge (Rs./lWh)</b></th>
              <th><b>Fix Charge (Rs./Month)</b></th>
            </tr>
            <tr><th>Consumption of 0-60 kWh per Month</th></tr>
            <tr>
              <td>Block 1: 0-30 kWh</td>
              <td>{units.Unit0to30}</td>
              <td>{units.Fix0to30}</td>
            </tr>
            <tr>
              <td>Block 2: 31-60 kWh</td>
              <td>{units.Unit30to60}</td>
              <td>{units.Fix30to60}</td>
            </tr>
            <tr><th>Consumption above 60 kWh per Month</th></tr>
            <tr>
              <td>Block 1: 0-60 kWh</td>
              <td>{units.Unit0to60}</td>
              <td>{units.Fix30to60}</td>
            </tr>
            <tr>
              <td>Block 2: 61-90 kWh</td>
              <td>{units.Unit60to90}</td>
              <td>{units.Fix60to90}</td>
            </tr>
            <tr>
              <td>Block 3: 91-120 kWh</td>
              <td>{units.Unit90to120}</td>
              <td>{units.Fix90to120}</td>
            </tr>
            <tr>
              <td>Block 4: 121-180 kWh</td>
              <td>{units.Unit121to180}</td>
              <td>{units.Fix120to180}</td>
            </tr>
            <tr>
              <td>Block 4: 121-180 kWh</td>
              <td>{units.UnitAbove180}</td>
              <td>{units.FixAbove180}</td>
            </tr>

          
          
          
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewUnitRate;
