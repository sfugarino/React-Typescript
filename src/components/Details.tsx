import React, { useState, useEffect } from "react";
import { DetailProps } from "../types";
import { Business } from "../types";
import { getParlorDetails } from "../api/parlorApi";

const Details = (props: DetailProps) => {
  const initialData: Business = {
    rating: 0,
    location: { address1: "", city: "", state: "", zip_code: "" }
  };
  const [parlor, setParlor] = useState<Business>(initialData);

  useEffect(() => {
    getParlorDetails(props.match.params.id).then((_parlor: Business) =>
      setParlor(_parlor)
    );
  });

  return (
    <div className="row">
      <div className="col-1">
        <div className="text-right">ID:</div>
        <div className="text-right">Address:</div>
      </div>
      <div className="col-4">
        <div>{parlor.id}</div>
        <div>
          <div>{parlor.location.address1}</div>
          <div>
            {parlor.location.city}, {parlor.location.state}{" "}
            {parlor.location.zip_code}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
