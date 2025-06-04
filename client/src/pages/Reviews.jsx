import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { API_BASE_URL } from '../utils/api';

const Reviews = ({ user }) => {
  const { dealerId } = useParams();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDealer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dealer/${dealerId}`);
      const data = await response.json();
      setDealer(data.dealer);
    } catch (error) {
      console.error("Failed to fetch dealer details:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/dealer/${dealerId}`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealer();
    fetchReviews();
  }, [dealerId]);

  return (
    <>
      <PageHeader title="Dealerships" />

      <div className="container mt-4 text-center">
        {dealer && (
          <>
            <h1 className="mb-3">{dealer.full_name || "Car Dealership"}</h1>
            <p className="fw-bold">
              {dealer.city}, {dealer.address}, Zip - {dealer.zip}, {dealer.state}
            </p>

            {user ? (
              <Link to={`/add-review/${dealerId}`}>
                <button className="btn btn-primary my-3">Write a Review</button>
              </Link>
            ) : (
              <p className="text-muted mb-4">
                To write a review, you must be a registered user
              </p>
            )}
          </>
        )}

        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews available for this dealership.</p>
        ) : (
          <div className="row">
            {reviews.map((review, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <h5>
                      {review.sentiment === "positive" && "😊"}
                      {review.sentiment === "negative" && "😞"}
                      {review.sentiment === "neutral" && "😐"}
                    </h5>
                    <p className="card-text">{review.review}</p>
                  </div>
                  <div className="card-footer text-muted text-center">
                    <small>
                      {review.name}<br />
                      {review.purchase_date && `Purchased: ${review.purchase_date}`}<br />
                      {review.car_make} {review.car_model} {review.car_year}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;