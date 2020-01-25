import React, { useState, useEffect, ReactElement } from "react";
import { DetailProps } from "../types";
import { Business } from "../types";
import { getParlorDetails } from "../api/parlorApi";

const Details = (props: DetailProps) => {
  const [parlor, setParlor] = useState<Business>();

  useEffect(() => {
    getParlorDetails(props.match.params.id).then((_parlor: Business) =>
      setParlor(_parlor)
    );
  });

  function renderData(): ReactElement {
    if (parlor) {
      return (
        <>
          <div>{parlor.id}</div>
          <div>
            <div>{parlor.location.address1}</div>
            <div>
              {parlor.location.city}, {parlor.location.state}{" "}
              {parlor.location.zip_code}{" "}
            </div>
          </div>
        </>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="row">
      <div className="col-1">
        <div className="text-right">ID:</div>
        <div className="text-right">Address:</div>
      </div>
      <div className="col-4">{renderData()}</div>
    </div>
  );
};

export default Details;
