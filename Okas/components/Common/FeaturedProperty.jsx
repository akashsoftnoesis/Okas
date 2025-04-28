import Image from "next/image";
import listingImg from '../../public/assets/images/listing-01.jpeg'
import Link from "next/link";

export default function FeaturedProperty(props) {
  return (
    <div className="featured-box">
        <div className="featured-img">
          <Image height="350" src={listingImg} alt=""/>
          <div className="category">
            <span className="featured">FEATURED</span>
            <span className="sale">{props.category ? props.category : "FOR SALE"}</span>
          </div>
        </div>
        <div className="featured-info">
          <h4><Link href="/singleproperty">New Apartment Nice Wiew</Link></h4>
          <h6>$7,500/mo</h6>
        </div>
    </div>
  )
}
