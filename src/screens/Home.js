import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const baseUrl = "https://aahar-backend-1.onrender.com/";

  const loadData = async () => {
    try {
      let response = await fetch(`${baseUrl}api/auth/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();
      console.log("API Response:", response); // Debugging API response
      setFoodItem(response[0] || []);
      setFoodCat(response[1] || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFoodItem([]); // Ensure state is handled gracefully
      setFoodCat([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* Navbar Component */}
      <div>
        <Navbar />
      </div>

      {/* Carousel Section */}
      <div>
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            {/* Search Bar */}
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success text-white bg-success" type="submit">
                  Search
                </button>
              </div>
            </div>

          {/* Carousel Images */}
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?ixid=M3w2ODU2NjF8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGl6emF8ZW58MHx8fHwxNzM0MDA3MTQzfDA&ixlib=rb-4.0.3"
              className="d-block w-100"
              style={{ width: '900px', height: '700px', filter: "brightness(30%)" }}
              alt="Pizza"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://images.unsplash.com/photo-1674876105548-520cc1e2c82a?ixid=M3w2ODU2NjF8MHwxfHNlYXJjaHwxfHxmb29kJTIwYnVyZ2VyfGVufDB8fHx8MTczNDAwNzA5Nnww&ixlib=rb-4.0.3"
              className="d-block w-100"
              style={{ width: '900px', height: '700px', filter: "brightness(30%)" }}
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1596797038530-2c107229654b?ixid=M3w2ODU2NjF8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9zYXxlbnwwfHx8fDE3MzQwMDcxNzl8MA&ixlib=rb-4.0.3"
              className="d-block w-100"
              style={{ width: '900px', height: '700px', filter: "brightness(30%)" }}
              alt="Chow Mein"
            />
          </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Food Categories and Items */}
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div className="col-12 col-md-6 col-lg-3" key={filterItems._id}>
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div></div>
              )}
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>

      {/* Footer Component */}
      <div>
        <Footer />
      </div>
    </div>
  );
}