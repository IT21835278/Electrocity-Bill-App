import React from 'react'
import { Link } from 'react-router-dom'

const CustomerNavBar = () => {
  return (
    <div>
        <ul>
            <li><Link to={`#`}>Home</Link></li>
            <li><Link to={`/view-bill`}>Bill Pay</Link></li>
            <li><Link to={`/payment-history`}>Bill History</Link></li>
            <li><Link to={`/payment-history`}>Payment History</Link></li>
            <li><Link to={`/view-unit-rate`}>Unit rate</Link></li>

        </ul>
    </div>
  )
}

export default CustomerNavBar