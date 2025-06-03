import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const states = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
    { code: "DC", name: "District of Columbia" },
  ];

  const fetchDealers = async (state = "") => {
    setLoading(true);
    try {
      const endpoint = state
        ? `http://localhost:8000/get_dealers/${state}`
        : "http://localhost:8000/get_dealers";
      const response = await fetch(endpoint);
      const data = await response.json();
      setDealers(data.dealers || []);
    } catch (error) {
      console.error("Error fetching dealers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setStateFilter(selectedState);
    fetchDealers(selectedState);
  };

  return (
    <>
      <PageHeader title="Dealerships" />
      <div className="container mt-4">
        <div className="mb-3">
          <label htmlFor="stateSelect" className="form-label">
            Filter by State:
          </label>
          <select
            id="stateSelect"
            className="form-select"
            value={stateFilter}
            onChange={handleStateChange}
          >
            <option value="">All States</option>
            {states.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading dealerships...</p>
        ) : (
          <>
            {dealers.length === 0 ? (
              <p>No dealerships found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered text-center table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>ID</th>
                      <th>Dealer Name</th>
                      <th>City</th>
                      <th>Address</th>
                      <th>Zip</th>
                      <th>State</th>
                      <th>Review Dealer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealers.map((dealer) => (
                      <tr key={dealer.id}>
                        <td>{dealer.id}</td>
                        <td>
                          <a href="#!" className="text-decoration-none">
                            {dealer.full_name}
                          </a>
                        </td>
                        <td>{dealer.city}</td>
                        <td>{dealer.address}</td>
                        <td>{dealer.zip}</td>
                        <td>{dealer.state}</td>
                          <td>
                            <Link to={`/reviews/${dealer.id}`}>
                              <button className="btn btn-success btn-sm">
                                View Reviews
                              </button>
                            </Link>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dealers;
