import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const AddReview = ({ user }) => {
  const { dealerId } = useParams();
  const navigate = useNavigate();

  const [dealer, setDealer] = useState(null);
  const [cars, setCars] = useState([]);
  const [review, setReview] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carYear, setCarYear] = useState("");

  useEffect(() => {
    fetchDealer();
    fetchCars();
  }, []);

  const fetchDealer = async () => {
    try {
      const response = await fetch(`http://localhost:8000/dealer/${dealerId}`);
      const data = await response.json();
      setDealer(data.dealer);
    } catch (error) {
      console.error("Failed to fetch dealer details:", error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:8000/get_cars");
      const data = await response.json();
      const uniqueMakes = [...new Set(data.CarModels.map((c) => c.CarMake))];
      setCars(uniqueMakes);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      name: user.username,
      dealership: parseInt(dealerId),
      review: review,
      purchase: true,
      purchase_date: purchaseDate,
      car_make: carMake,
      car_model: "Generic Model",
      car_year: parseInt(carYear),
    };

    try {
      const response = await fetch("http://localhost:8000/add_review/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newReview),
      });

      const result = await response.json();

      if (result.status === 200) {
        alert("Review posted correctly");
        navigate(`/reviews/${dealerId}`);
      } else {
        alert(result.message || "Failed to post review");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <PageHeader title="Write a Review" />

      <div className="container mt-4 text-center">
        {dealer && (
          <>
            <h1 className="mb-3">{dealer.full_name || "Car Dealership"}</h1>
            <p className="fw-bold">
              {dealer.city}, {dealer.address}, Zip - {dealer.zip}, {dealer.state}
            </p>
          </>
        )}
      </div>

      <div className="container-fluid bg-secondary booking my-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 justify-content-center">
                    <div className="col-12">
                      <textarea
                        className="form-control border-0"
                        placeholder="Write your review (max 250 chars)"
                        maxLength={250}
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="date"
                        className="form-control border-0"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <select
                        className="form-select border-0"
                        value={carMake}
                        onChange={(e) => setCarMake(e.target.value)}
                        required
                      >
                        <option value="">Select Car Make</option>
                        {cars.map((make, index) => (
                          <option key={index} value={make}>
                            {make}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control border-0"
                        placeholder="Car Year"
                        value={carYear}
                        onChange={(e) => setCarYear(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button className="btn btn-secondary w-100 py-3" type="submit">
                        Submit Review
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddReview;