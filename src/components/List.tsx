import React, { useState, useEffect } from "react";
import { getTopParlors } from "../api/parlorApi";
import { Link } from "react-router-dom";
import Stars from "react-stars";
import logo from "../logo.svg";
import { Business } from "../types";

const List = () => {
  const [parlors, setParlors] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getTopParlors().then((_parlors: Business[]) => {
      setParlors(_parlors);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="row">
          <div className="loader">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
      ) : (
        <div className="row">
          {parlors.map((parlor: Business) => {
            return (
              <div className="card" style={{ width: "18rem" }} key={parlor.id}>
                <div className="card-header bg-primary text-white">
                  {parlor.name}
                </div>
                <div className="card-body">
                  <div>
                    <div>{parlor.location.address1}</div>
                    <div>
                      {`${parlor.location.city}, ${parlor.location.state} ${parlor.location.zip_code}`}
                    </div>
                  </div>
                  <div className="card-text rating">
                    <Stars count={5} value={parlor.rating} size={25}></Stars>
                  </div>

                  <div className="card-text font-italic text-justify review-summary">
                    {parlor.reviews && parlor.reviews.length > 0
                      ? parlor.reviews[0].text
                      : null}
                  </div>
                  <div className="card-text font-weight-bold font-italic text-right">
                    {parlor.reviews && parlor.reviews.length > 0
                      ? parlor.reviews[0].user.name
                      : null}
                  </div>
                  <Link to={"/details/" + parlor.id} className="card-link">
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default List;
