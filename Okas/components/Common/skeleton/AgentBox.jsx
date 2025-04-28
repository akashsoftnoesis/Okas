import React from "react";
import Skeleton from "react-loading-skeleton";

export default function AgentBox({count}) {
  return (
    <>
      {Array(count)
        .fill(count)
        .map((index) => {
          return (
            <div className="mx-2" key={index}>
              <div className="mb-5 text-center" style={{ maxWidth: "246px" }}>
                <Skeleton circle={true} width={180} height={180} />
                <div className="my-3">
                  <Skeleton width={180} height={20} />
                  <Skeleton width={180} height={18} />
                </div>
                <Skeleton width={130} height={13} />
                <Skeleton width={220} height={13} />
              </div>
            </div>
          );
        })}
    </>
  );
}
