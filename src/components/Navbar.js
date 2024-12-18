import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge"
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar() {
  let data = useCart()
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");

  }

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "MediumSeaGreen" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">अAhar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Order</Link>
                  </li> : ""
              }
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white  mx-1" style={{ color: "MediumSeaGreen" }} to="/login">Login</Link>
                <Link className="btn bg-white  mx-1" style={{ color: "MediumSeaGreen" }} to="/creatuser">Signup</Link>
              </div>
              :
              <div>
                <div className="btn bg-white  mx-1" style={{ color: "MediumSeaGreen" }} onClick={() => { setCartView(true) }}>My Cart {" "}
                  <Badge pill bg='danger'>
                    {data.length}
                  </Badge>
                </div>

                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>Logout</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
