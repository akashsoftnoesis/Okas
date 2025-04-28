import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Col } from "reactstrap";
import { titleToSlug } from "../../helper/utils/common.util";
import ImageComponent from "./ImageComponent";

export default function AgentContactBox({ agentContactData }) {
  if (!agentContactData) {
    return Array(2).map((key) => {
      return (
        <Col md={6} key={key}>
          <div className="p-2">
            <div>
              <div>
                <Skeleton height={100} width={100} circle={true} />
              </div>
              <div className="ml-4">
                <Skeleton height={20} width={200} />
                <ul className="mt-2">
                  <div>
                    <Skeleton height={15} width={130} />
                  </div>
                  <div>
                    <Skeleton height={15} width={130} />
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      );
    });
  }

  const getNumber = (phone) => {
    let mobileNumber
    let directNumber
    phone.map(item => {
      if (item.typeCode === 'M') {
        mobileNumber = item.number
        return item.number
      } else if (item.typeCode === 'D') {
        directNumber = item.number
        return item.number
      } else {
        return '-'
      }
    })
    // console.log("findNumber => ",findNumber);
    // const convertString = findNumber.length && findNumber[0]
    // console.log("convertString => ",convertString);
    // return convertString
    const numberToShow = mobileNumber ? mobileNumber : directNumber ? directNumber : '-'
    return numberToShow
  }
  return (
    (agentContactData &&
      agentContactData?.saleHistory?.length &&
      agentContactData?.saleHistory[0].contactStaff) ||
    (agentContactData &&
      agentContactData?.contactStaff?.length &&
      agentContactData?.contactStaff) ||
    []
  ).map((item, key) => {
    return (
      <Col key={key} className="col-6 agent-box-col">
        <div className="agent-box text-center">
          <Link
            passHref
            href={`/agents/${item.id}-${titleToSlug(
              item.firstName + " " + item.lastName
            )}`}
          >
            <div className="agent-img">
              <ImageComponent
                src={item?.photo?.original}
                height={200}
                width={200}
                layout="fixed"
                alt=""
              />
            </div>
          </Link>
          <div className="agent-info">
            <Link
              passHref
              href={`/agents/${item.id}-${titleToSlug(
                item.firstName + " " + item.lastName
              )}`}
            >
              <h6>
                <a>
                  {item?.firstName} {item?.lastName}
                </a>
              </h6>
            </Link>
            <span>{item?.position ? item?.position : "-"}</span>
            <ul className="personal-info">
              <li>
                <a
                  href={`tel:${getNumber(item?.phoneNumbers)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getNumber(item?.phoneNumbers)}
                </a>
              </li>
              <li>
                {item?.email ? (
                  <a href={`mailto:${item?.email}`}>
                    {item?.email ? item?.email : "-"}
                  </a>
                ) : (
                  "-"
                )}
              </li>
            </ul>
          </div>
        </div>
      </Col>
    );
  });
}
