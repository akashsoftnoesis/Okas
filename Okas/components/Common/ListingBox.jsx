import Image from "next/image";
import listingImg from "../../public/assets/images/listing-01.jpeg";
import bed from "../../public/assets/images/bed.svg";
import newbed from "../../public/assets/images/newbed.svg";
import bath from "../../public/assets/images/bath.svg";
import redbath from "../../public/assets/images/redbath.svg";
import orangebath from "../../public/assets/images/orangebath.svg";
import garage from "../../public/assets/images/garage.svg";
import orangegarage from "../../public/assets/images/orangegarage.svg";
import redgarage from "../../public/assets/images/redgarage.svg";
import sqft from "../../public/assets/images/sq-ft.svg";
import redsqft from "../../public/assets/images/redsq-ft.svg";
import orangesqft from "../../public/assets/images/orangesq-ft.svg";
import { Col } from "reactstrap";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ImageComponent from "./ImageComponent";
import { DisplayFormatDate } from "../../helper/utils/date.utils";
import { DisplayDate } from "../../helper/utils/date.utils";
import ScrollAnimation from "react-animate-on-scroll";
import orderBy from 'lodash.orderby';

export default function ListingBox(props) {
  const {
    rent,
    category,
    propertiesSaleData = [],
    grid,
    displayRecord,
  } = props;
  const [propertiesSaleDataSorted, setPropertiesSaleDataSorted] = useState([])
  useEffect(() => {
    switch (category) {
      case "sale":
        // const sortSaleData = orderBy(propertiesSaleData, [obj => new Date(obj.publishedToWeb)], ['desc']);
        return setPropertiesSaleDataSorted(propertiesSaleData)
      case "rent":
        const sortLeaseData = orderBy(propertiesSaleData, [obj => new Date(obj.inserted)], ['desc']);
        return setPropertiesSaleDataSorted(sortLeaseData)
      case "sold":
        const sortSoldData = orderBy(propertiesSaleData, [obj => new Date(obj.publishedToWeb)], ['desc']);
        return setPropertiesSaleDataSorted(sortSoldData)
      default:
        return setPropertiesSaleDataSorted(propertiesSaleData)
    }

  }, [propertiesSaleData, category])
  const fifteenDayAgoDate = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);

  const titleToSlug = useCallback((title) => {
    {
      let slug;

      // convert to lower case
      slug = title.toLowerCase();

      // remove special characters
      slug = slug.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        ""
      );
      // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

      // replace spaces with dash symbols
      slug = slug.replace(/ /gi, "-");

      // remove consecutive dash symbols
      slug = slug.replace(/\-\-\-\-\-/gi, "-");
      slug = slug.replace(/\-\-\-\-/gi, "-");
      slug = slug.replace(/\-\-\-/gi, "-");
      slug = slug.replace(/\-\-/gi, "-");

      // remove the unwanted dash symbols at the beginning and the end of the slug
      slug = "@" + slug + "@";
      slug = slug.replace(/\@\-|\-\@|\@/gi, "");
      return slug;
    }
  }, []);

  const propertiesSaleDataWithRoutes = useMemo(() => {
    const agencyTypes = {
      Derrimut: 1,
      Truganina: 2,
    };
    return propertiesSaleDataSorted.map((item) => {
      const propertyType = item?.type?.propertyClass?.internalName;
      const idCombined = `${item.id}-${agencyTypes[item?.agency]}-${titleToSlug(
        item?.displayAddress
      )}`;
      item.route = `/properties/${category}/${propertyType}/${idCombined}`;
      return item;
    });
  }, [propertiesSaleDataSorted, category, titleToSlug]);

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

  const arrayForMap = displayRecord
    ? propertiesSaleDataWithRoutes &&
    propertiesSaleDataWithRoutes.slice(0, displayRecord)
    : propertiesSaleDataWithRoutes && propertiesSaleDataWithRoutes;

  const colsPerRow = 4;
  const itemsPerCol = 4;
  const totalCols = new Array(Math.ceil(arrayForMap.length / colsPerRow)).fill(
    0
  );

  const result = totalCols.map((_, index) => {
    const colNo = index + 1;
    const rangeStart = (colNo - 1) * itemsPerCol;
    const rangeEnd = colNo * itemsPerCol;
    const rowItems = arrayForMap.slice(rangeStart, rangeEnd);
    return rowItems;
  });

  return propertiesSaleDataSorted.length
    ? result.map((rowArray) => {
      return rowArray.map((item, index) => {
        return (
          <Col xl={grid} sm={6} lg={4} key={index}>
            <ScrollAnimation
              animateIn="custom-fadeInUp"
              duration={(!index ? 0.5 : (0.5 + ((index + 1) * 0.1)))}
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
                        src={
                          item?.photos[0]?.thumbnails.thumb_1024 || listingImg
                        }
                        alt=""
                        layout="fixed"
                      />
                      {<div className="image-hover"></div>}
                      {props.category === "sold" ? (
                        <>
                          <div className="sold-property">
                            {/* <div> */}
                            <span>S</span>old
                            {/* <h6>{DisplayFormatDate(item?.saleDetails?.unconditional)}</h6> */}
                            <h5 className="font2">
                              Sold ON:{" "}
                              {/* {DisplayFormatDate(
                                item?.saleDetails?.unconditional
                              )} */}
                              {DisplayDate(item?.saleDetails?.unconditional, 'noDay')}
                            </h5>
                            {/* </div> */}
                          </div>
                        </>
                      ) : null}
                      {props.category === "sold" ? null : (
                        <div className="category">
                          {<span className="sale">For {props.category}</span>}
                          {props.category === "lease" ? (
                            <>
                              {new Date(item?.inserted) >=
                                fifteenDayAgoDate ? (
                                <span className="featured">New</span>
                              ) : // <span className="featured">New Listing</span>
                                null}
                            </>
                          ) : (
                            <>
                              {new Date(item?.publishedToWeb) >=
                                fifteenDayAgoDate ? (
                                <span className="featured">New</span>
                              ) : // <span className="featured">New Listing</span>
                                null}
                            </>
                          )}
                          {/* {new Date(item?.publishedToWeb || item?.inserted) >=
                          fifteenDayAgoDate ? (
                          <span className="featured">New</span>
                          // <span className="featured">New Listing</span>
                        ) : null} */}
                        </div>
                      )}
                      {rent && item?.searchPrice ? (
                        <div className="listing-foot">
                          <h6>${item?.searchPrice} p/w</h6>
                        </div>
                      ): ""}
                    </div>
                    <div className="listing-info">
                      {category === "sold" ? (
                        item?.saleDetails?.showSalePrice == true && (
                          <h6>
                            ${item?.saleDetails?.salePrice?.toLocaleString("en-AU")}
                          </h6>
                        )|| <span style={{color:"white"}}>-</span>
                        
                      ) : (
                        // <h6>Sold On: {item?.saleDetails?.unconditional ? (new Date(item?.saleDetails?.unconditional).getDate() < 10 ? ('0' + new Date(item?.saleDetails?.unconditional).getDate()) : new Date(item?.saleDetails?.unconditional).getDate()) + '-' + ((new Date(item?.saleDetails?.unconditional).getMonth() + 1) < 10 ? ('0' + (new Date(item?.saleDetails?.unconditional).getMonth() + 1)) : (new Date(item?.saleDetails?.unconditional).getMonth() + 1)) + '-' + new Date(item?.saleDetails?.unconditional).getFullYear() : null}</h6>
                        <h6>
                          {checkValueNullOrZero(item?.heading)
                            ? "Okas Property Group"
                            : item?.heading}
                        </h6>
                      )}
                      <span>{item?.displayAddress}</span>
                      <ul className="listing-features">
                        <li>
                          <Image loading="eager" src={newbed} alt="" />{" "}
                          {item?.bed ? (
                            <span>
                              {checkValueNullOrZero(item?.bed)
                                ? "-"
                                : item?.bed}
                            </span>
                          ) : (
                            <span>-</span>
                          )}
                        </li>
                        <li>
                          <Image loading="eager" src={orangebath} alt="" />{" "}
                          {item?.bath ? (
                            <span>
                              {checkValueNullOrZero(item?.bath)
                                ? "-"
                                : item?.bath}
                            </span>
                          ) : (
                            <span>-</span>
                          )}
                        </li>
                        <li>
                          <Image loading="eager" src={orangegarage} alt="" />{" "}
                          {/* {item?.garages ? ( */}
                            <span>{garageValue(item)}</span>
                          {/* ) : (
                            <span>-</span>
                          )} */}
                        </li>
                        <li>
                          <Image loading="eager" src={orangesqft} alt="" />{" "}
                          {item?.landArea ? (
                            <span>{areaValue(item)} </span>
                          ) : (
                            <span>-</span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </a>
              </Link>
            </ScrollAnimation>
          </Col>
        );
      });
    })
    : <div className="font2 m-auto text-center">
        <p className="mb-0">THANKS FOR SEARCHING.</p>
        <p className="mb-0"> WE DO NOT CURRENTLY HAVE ANY PROPERTY LISTINGS IN YOUR SEARCH AREA. PLEASE SEARCH AGAIN OR CONTACT US.</p>
      </div>;
}
