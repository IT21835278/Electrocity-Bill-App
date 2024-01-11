import React, { useEffect, useState } from 'react';
import { fetchUnitPrice } from '../../services/UnitPriceService';
import Table from 'react-bootstrap/Table';

const UnitRateTable = () => {
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
        <div style={{ paddingTop:'50px', paddingLeft:'40px', paddingRight:'40px' }}>
            {units ? (
                <Table  bordered hover responsive variant="info">
                    <thead>
                        <tr >
                            <th>CONSUMER CATEGORY</th>
                            <th>Energy Charge (Rs./kWh)</th>
                            <th>Fixed Charge (Rs./Month)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3" className="text-left"><b>Consumption of 0-60 kWh per Month</b></td>
                        </tr>
                        <tr>
                            <td>Block 1: 0-30 kWh</td>
                            <td className='text-center'>{units.Unit0to30}</td>
                            <td className='text-center'>{units.Fix0to30}</td>
                        </tr>
                        <tr>
                            <td>Block 2: 31-60 kWh</td>
                            <td className='text-center'>{units.Unit30to60}</td>
                            <td className='text-center'>{units.Fix30to60}</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="text-left"><b>Consumption above 60 kWh per Month</b></td>
                        </tr>
                        <tr>
                            <td>Block 1: 0-60 kWh</td>
                            <td className='text-center'>{units.Unit0to60}</td>
                            <td className='text-center'>{units.Fix30to60}</td>
                        </tr>
                        <tr>
                            <td>Block 2: 61-90 kWh</td>
                            <td className='text-center'>{units.Unit60to90}</td>
                            <td className='text-center'>{units.Fix60to90}</td>
                        </tr>
                        <tr>
                            <td>Block 3: 91-120 kWh</td>
                            <td className='text-center'>{units.Unit90to120}</td>
                            <td className='text-center'>{units.Fix90to120}</td>
                        </tr>
                        <tr>
                            <td>Block 4: 121-180 kWh</td>
                            <td className='text-center'>{units.Unit121to180}</td>
                            <td className='text-center'>{units.Fix120to180}</td>
                        </tr>
                        <tr>
                            <td>Block 5: Above 180 kWh</td>
                            <td className='text-center'>{units.UnitAbove180}</td>
                            <td className='text-center'>{units.FixAbove180}</td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UnitRateTable;
