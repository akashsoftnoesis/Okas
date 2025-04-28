import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

function OfficesBox(props) {
  return (
    <div className="office-box">
      <div className="pointer">
        <Link href={`/office/${props.route}`}>
          <div className="office-img">
            <Image src={props.officeImage} alt="" />
          </div>
        </Link>
        <div className="office-info">
          <h2>
            <Link href={`office/${props.route}`}>{props.title}</Link>
          </h2>
          <span className="font2 font-wight-lighter">{props.address}</span>
        </div>
        <div>
        </div>
        <ul className="personal-info personal-info-office">
          <li>
            <a href={`tel:${props.phone}`} target="_blank" rel="noreferrer"><span>{props.phone}</span></a>
          </li>
          <li>
            <a href={`mailto:${props.email}`} target="_blank" rel="noreferrer"><span>{props.email}</span></a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default memo(OfficesBox)