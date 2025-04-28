import Image from "next/image";
import listingImg from "../public/assets/images/DJI_0602U7.jpg";
import bed from "../public/assets/images/bed.svg";
import bath from "../public/assets/images/bath.svg";
import garage from "../public/assets/images/garage.svg";
import sqft from "../public/assets/images/sq-ft.svg";
import { Col } from "reactstrap";
import Link from "next/link";
import ImageComponent from "../components/Common/ImageComponent";
import ScrollAnimation from "react-animate-on-scroll";
import { useState } from "react";
import Layout from "../components/Layout";
import MetaHandler, { getMetaDetails } from '../helper/utils/commonMetaApi'
import SkeletonListBox from "../components/Common/skeleton/ListingBox";
import Topsection from '../components/Common/Topsection'

export default function ListingBox(props) {

    const [metaDetails, setMetaDetails] = useState({
        pageName: "Projects"
    })

    const { rent, category, grid, displayRecord } = props;

    // Sample static property data
    const staticPropertiesData = [
        {
            id: 1,
            agency: "Derrimut",
            type: { propertyClass: { internalName: "house" } },
            displayAddress: "123 Main St, Melbourne",
            publishedToWeb: "2023-07-01",
            inserted: "2023-07-15",
            photos: [{ thumbnails: { thumb_1024: listingImg } }],
            saleDetails: { unconditional: "2023-07-20", salePrice: 500000 },
            searchPrice: 450,
            bed: 3,
            bath: 2,
            garages: 1,
            carports: 0,
            landArea: { value: 500 },
            heading: "Eminence",
            route: "/projects/eminence",
        },
       
        // Add more static property objects as needed
    ];

    const checkValueNullOrZero = (value) => value === null || value === 0 || value === '';

    const areaValue = (item) =>
        checkValueNullOrZero(item?.landArea?.value) ? (
            "-"
        ) : (
            <>
                {" "}
                {item?.landArea?.value} m<sup>2</sup>{" "}
            </>
        );

    const garageValue = (item) =>
        checkValueNullOrZero(item?.garages)
            ? checkValueNullOrZero(item?.carports)
                ? "-"
                : item?.carports
            : item?.garages;

    return (

        <Layout>
            <MetaHandler props={metaDetails} />
            <Topsection
                titleLight
                pageTitle="Projects"
                backgroundImage="/assets/images/projects-bg.jpg"
            />
            <div className="container">
                <div className="property-details">
                    <div className="property-details-heading" style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <h3>Projects</h3>
                    </div>
                    <div className="row">
                        {staticPropertiesData.length
                            ? staticPropertiesData.map((item, index) => (


                                <Col xl={grid} sm={6} lg={3} key={index}>
                                    <ScrollAnimation
                                        animateIn="custom-fadeInUp"
                                        duration={!index ? 0.5 : 0.5 + (index + 1) * 0.1}
                                        animateOnce
                                    >
                                        <Link href={item.route} passHref>
                                            <a className="listing-link">
                                                <div className="listing-box">
                                                    <div className="listing-img">
                                                        <ImageComponent
                                                            className="listing-img-wrapper"
                                                            width={330}
                                                            height={200}
                                                            src={item.photos[0].thumbnails.thumb_1024}
                                                            alt={item.heading}
                                                            layout="fixed"
                                                            grid={4}
                                                        />
                                                        <div className="image-hover"></div>
                                                        {props.category === "sold" ? (
                                                            <div className="sold-property">
                                                                <span>S</span>old
                                                                <h5 className="font2">
                                                                    Sold ON:{" "}
                                                                    {new Date(item?.saleDetails?.unconditional).toLocaleDateString("en-AU")}
                                                                </h5>
                                                            </div>
                                                        ) : null}
                                                        {rent && item?.searchPrice ? (
                                                            <div className="listing-foot">
                                                                <h6>${item?.searchPrice} p/w</h6>
                                                            </div>
                                                        ) : ""}
                                                    </div>
                                                    <div className="listing-info">
                                                        {category === "sold" ? (
                                                            item?.saleDetails ? (
                                                                <h6>
                                                                    ${item?.saleDetails?.salePrice?.toLocaleString("en-AU")}
                                                                </h6>
                                                            ) : (
                                                                <h6>-</h6> // Default if showSalePrice is false or missing
                                                            )
                                                        ) : (
                                                            <h6>
                                                                {checkValueNullOrZero(item?.heading)
                                                                    ? "Okas Property Group"
                                                                    : item?.heading}
                                                            </h6>
                                                        )}
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </ScrollAnimation>
                                </Col>

                            ))

                            : null
                        }
                    </div>
                </div>
            </div>
        </Layout>)
}
