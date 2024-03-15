// ChangeUnitPrice.js
import React, { useEffect, useState } from 'react';
import { fetchUnitPrice, updateUnitPrice } from '../../services/UnitPriceService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ChangeUnitPrice = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState(0);
  const [unitData, setUnitData] = useState({
    Unit0to30: 0,
    Unit30to60: 0,
    Unit0to60: 0,
    Unit60to90: 0,
    Unit90to120: 0,
    Unit121to180: 0,
    UnitAbove180: 0,
    Fix0to30: 0,
    Fix0to60:0,
    Fix30to60: 0,
    Fix60to90: 0,
    Fix90to120: 0,
    Fix120to180: 0,
    FixAbove180: 0,
  });

  useEffect(() => {
    async function getPrices() {
      try {
        const data = await fetchUnitPrice();
        console.log('Fetched data:', data);
        setUnits(data);
        setUnitData(data); // Set unitData as well
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getPrices();
  }, []);

  const changePrice = async (e) => {
    e.preventDefault();
    try {
      const data = await updateUnitPrice(unitData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'The Unit prices updated successfully.',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Update-unit-prices");
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnitData({ ...unitData, [name]: value });
  };

  return (
    <div style={{ paddingTop:'50px', paddingLeft:'40px', paddingRight:'40px' }}>
      {units ? (
        <form onSubmit={changePrice}>
          <Table  bordered hover responsive variant="info">
            <thead>
              <tr>
                <th><b>CONSUMER CATEGORY</b></th>
                <th><b>Energy Charge (Rs./kWh)</b></th>
                <th><b>Fixed Charge (Rs./Month)</b></th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td colSpan="3" className="text-left"><b>Consumption of 0-60 kWh per Month</b></td>
              </tr>
              <tr>
                <td>Block 1: 0-30 kWh</td>
                <td><input type='number' name='Unit0to30' value={unitData.Unit0to30} onChange={handleInputChange} /></td>
                <td><input type='number' name='Fix0to30' value={unitData.Fix0to30} onChange={handleInputChange} /></td>
              </tr>
              <tr>
                <td>Block 2: 31-60 kWh</td>
                <td><input type='number' name='Unit30to60' value={unitData.Unit30to60} onChange={handleInputChange} /></td>
                <td><input type='number' name='Fix30to60' value={unitData.Fix30to60} onChange={handleInputChange} /></td>
              </tr>
              <tr>
              <td colSpan="3" className="text-left"><b>Consumption above 60 kWh per Month</b></td>
              </tr>
              <tr>
                <td>Block 1: 0-60 kWh</td>
                <td><input type='number' name='Unit0to60' value={unitData.Unit0to60} onChange={handleInputChange} /></td>
                <td><input type='number' name='Fix0to60' value={unitData.Fix0to60} onChange={handleInputChange} /></td>
              </tr>
              <tr>
                <td>Block 2: 61-90 kWh</td>
                <td><input type='number' name='Unit60to90' value={unitData.Unit60to90} onChange={handleInputChange} /></td>
                <td><input type='number' name='Fix60to90' value={unitData.Fix60to90} onChange={handleInputChange} /></td>
              </tr>
              <tr>
                <td>Block 3: 91-120 kWh</td>
                <td><input type='number' name='Unit90to120' value={unitData.Unit90to120} onChange={handleInputChange} /></td>
                <td><input type='number' name='Fix90to120' value={unitData.Fix90to120} onChange={handleInputChange} /></td>
              </tr>
              <tr>
                <td>Block 4: 121-180 kWh</td>
                <td><input type='number' name='Unit121to180' value={unitData.Unit121to180} onChange={handleInputChange} /></td>
                <td><input type='number' name='Fix120to180' value={unitData.Fix120to180} onChange={handleInputChange} /></td>
              </tr>
              <tr>
                <td>Block 4: Above 180 kWh</td>
                <td><input type='number' name='UnitAbove180' value={unitData.UnitAbove180} onChange={handleInputChange} /></td>
                <td><input type='number' name='FixAbove180' value={unitData.FixAbove180} onChange={handleInputChange} /></td>
              </tr>
            </tbody>
            </Table>

          <Button type='submit'variant="primary" size="lg">Conform</Button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChangeUnitPrice;
