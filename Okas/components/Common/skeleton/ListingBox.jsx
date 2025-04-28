import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col } from "reactstrap";

export default function ListingBox({ count, grid }) {
  return (
    <>
      {Array(count)
        .fill(count)
        .map((index) => {
          return (
            <Col xl={grid} sm={6} lg={4} className="mt-3" key={index}>
              <Skeleton height={200} />
              <div className="mt-3">
                <h6>
                  <Skeleton height={15}></Skeleton>
                </h6>
                <h6>
                  <Skeleton height={15} width={250}></Skeleton>
                </h6>
                <ul className="d-flex mt-3">
                  <div className="mr-2">
                    <Skeleton height={40} width={73}></Skeleton>
                  </div>
                  <div className="mr-2">
                    <Skeleton height={40} width={73}></Skeleton>
                  </div>
                  <div className="mr-2">
                    <Skeleton height={40} width={73}></Skeleton>
                  </div>
                  <div className="mr-2">
                    <Skeleton height={40} width={73}></Skeleton>
                  </div>
                </ul>
              </div>
            </Col>
          );
        })}
    </>
  );
}
