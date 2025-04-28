import Script from 'next/script'
import Layout from "../../../../components/Layout";
import { Container, Row, Col, Button } from "reactstrap";
import Image from "next/image";
import bed from "../../../../public/assets/images/bed2.svg";
import bath from "../../../../public/assets/images/bath2.svg";
import garage from "../../../../public/assets/images/garage2.svg";
import sqft from "../../../../public/assets/images/sq-ft2.svg";
import FlatWidget from "../../../../components/Common/FlatWidget";
import AgentContactBox from "../../../../components/Common/AgentContactBox";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import call from "../../../../public/assets/images/call-icon.svg";
import emailIcon from "../../../../public/assets/images/email-icon.svg";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ApiGet } from "../../../../helper/ApiData";
import Skeleton from "react-loading-skeleton";
import ListingBox from "../../../../components/Common/ListingBox";
import SkeletonListingBox from "../../../../components/Common/skeleton/ListingBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import CustomModal from "../../../../components/Common/CustomModal";
import EnquiryForm from "../../../../components/Common/EnquiryForm";
import { DisplayDate } from "../../../../helper/utils/date.utils";
import { titleToSlug } from "../../../../helper/utils/common.util";
import ImageComponent from "../../../../components/Common/ImageComponent";
import AppraisalForm from "../../../../components/Common/AppraisalForm";
import FacebookIcon from '../../../../components/Common/shareIcons/FaceBookIcon';
import LinkedinIcon from '../../../../components/Common/shareIcons/LinkedinIcon';
import TwitterIcon from '../../../../components/Common/shareIcons/TwitterIcon';
import WhatsappIcon from '../../../../components/Common/shareIcons/WhatsappIcon';
import PinterestIcon from '../../../../components/Common/shareIcons/PinterestIcon';
import EmailIcon from '../../../../components/Common/shareIcons/EmailIcon';
import orderBy from "lodash.orderby";

const PropertyMap = dynamic(
  () => import("../../../../components/PropertyDetails/PropertyMap"),
  {
    ssr: false,
  }
);

const settings = {
  className: "center",
  lazyLoad: "ondemand",
  centerMode: true,
  infinite: true,
  centerPadding: "200px",
  slidesToShow: 1,
  speed: 1000,
  dots: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        centerPadding: "100px",
      },
    },
    {
      breakpoint: 769,
      settings: {
        centerPadding: "50px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        centerPadding: "15px",
      },
    },
  ],
};

function SinglePropertyDetails({ singlePropertyData }) {
  const [relatedData, setRelatedData] = useState();
  const [aucationDate, setAucationDate] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [propertyPhotos, setPropertyPhotos] = useState([]);
  const [fullUrl, setFullUrl] = useState(null)

  useEffect(() => {
    setFullUrl(`https://okaspropertygroup.com.au/${router.asPath}`)
  }, [fullUrl])

  const router = useRouter();
  const sliderRef = useRef(null);
  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal);
  const scrollDown = () => {
    const el = document.getElementById("agent-contact section-scroll")
    el.scrollIntoView({
      behavior: "smooth",
      block: 'center',
    });
  }


  const {
    propertyCategory,
    propertyType,
    propertyId: propertyIdCombined,
  } = router.query;
  const [propertyId, from] = (propertyIdCombined || "").split("-");

  useEffect(() => {
    const fetchOpenHomesData = async (id, lifeId, category, from) => {
      try {
        const openhomesRes = await ApiGet(
          `properties/upcomingOpenHomes/${id}/${category}/${lifeId}?from=${from}`
        );
        let response = openhomesRes.data.data.items
        response = orderBy(response, (val) => new Date(val.start))
        setAucationDate(response);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (singlePropertyData && propertyCategory && from) {
      fetchOpenHomesData(
        singlePropertyData.id,
        singlePropertyData.saleLifeId || singlePropertyData.leaseLifeId,
        propertyCategory,
        from
      );
    }
    if (propertyId) {
      const getRandomIndex = (array) => {
        const max = array.length - 1;
        let randomIndex = [];
        for (let index = randomIndex.length; index < max; index++) {
          const ind = Math.floor(Math.random() * max + 1);
          if (randomIndex.includes(ind) === false && randomIndex.length !== 4) {
            randomIndex.push(ind);
          }
        }
        if (randomIndex.length === 4) {
          const filterData = array.filter((item, i) => randomIndex.includes(i));
          return filterData;
        }
      };

      const relatedData = async () => {
        setLoadingRelated(true);
        try {
          const response = await ApiGet(`properties/${propertyCategory}`);
          if (response.status === 200) {
            const data = response?.data?.data?.items;
            const relatedData = data.filter((item) => item.id !== propertyId);
            if (relatedData) {
              const randomRelatedData = await getRandomIndex(relatedData);
              setRelatedData(randomRelatedData);
            }
          }
          setLoadingRelated(false);
        } catch (error) {
          setLoadingRelated(false);
          console.log("error", error);
        }
      };

      relatedData();
    }
  }, [propertyId, propertyCategory, from, propertyType, singlePropertyData]);

  useEffect(() => {
    setPropertyPhotos([]);
    if (
      singlePropertyData &&
      singlePropertyData.photos &&
      singlePropertyData.photos.length
    ) {
      setPropertyPhotos(singlePropertyData.photos);
    }

    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true);
    }
  }, [singlePropertyData]);

  // const fullUrl = (typeof window !== "undefined" && window.location.href) || null;


  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const handleApplyNow = () => {
    // const json = {
    //   displayAddress: singlePropertyData?.displayAddress,
    //   type: singlePropertyData?.type,
    //   bed: singlePropertyData?.bed,
    //   searchPrice: singlePropertyData?.searchPrice,
    //   bondPrice: singlePropertyData?.bondPrice,
    // }

    // router.push({
    //   pathname: '/rental-application-form',
    //   query: {data: encodeURIComponent(JSON.stringify(json))},

    // })
    // router.push("https://www.2apply.com.au/Agency/okas")
    window.open("https://www.2apply.com.au/Agency/okas", "_blank")
  }

  const handleBookInspection = () => {
    window.open("https://app.inspectrealestate.com.au/External/ROL/QuickWeb.aspx?AgentAccountName=okas&HidePrice=&UsePriceView=&HideAppOffer=&Sort=&HideLogo=", "_blank")
  }

  return (
    <Layout>
      {
        propertyCategory === "sold" ?
          (<CustomModal
            className="appraisal-modal"
            fade
            isOpen={modal}
            toggle={modalToggle}
            size="lg"
            heading="Request an Appraisal"
            subHeading={singlePropertyData?.displayAddress}
          >
            <div className="appraisal-content">
              <AppraisalForm />
            </div>
          </CustomModal>) :
          (<CustomModal
            className="appraisal-modal"
            fade
            isOpen={modal}
            toggle={modalToggle}
            size="xl"
            heading="Make an Enquiry"
            subHeading={singlePropertyData?.displayAddress}
          >
            <div className="appraisal-content">
              <EnquiryForm
                agentContactData={
                  (singlePropertyData?.contactStaff?.length &&
                    singlePropertyData?.contactStaff) ||
                  []
                }
                address={singlePropertyData?.displayAddress}
              />
            </div>
          </CustomModal>)
      }
      <Head>
        <title>{singlePropertyData?.displayAddress} - Okas Property Group</title>
        <meta
          property="og:title"
          content={singlePropertyData?.displayAddress}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta
          property="og:description"
          content={singlePropertyData?.description}
        />
        {/* <meta
          property="og:image"
          content={
            singlePropertyData &&
            singlePropertyData?.photos?.length &&
            singlePropertyData?.photos[0]?.url
          }
        /> */}
        <meta
          property="og:image"
          content={
            singlePropertyData &&
            singlePropertyData?.photos?.length &&
            singlePropertyData?.photos[0]?.thumbnails?.thumb_1024
          }
        />
      </Head>
      <div className="section pt-0 pb-3">
        <Container fluid className="p-0">
          <Script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-61238ce052c7ee45"></Script>
          <div className="single-property-slider">
            {propertyPhotos.length ? (
              <Slider {...settings} ref={sliderRef}>
                {propertyPhotos.map((item) => (
                  <div key={item.id} className={`slider-item ${item.type == "Floorplan" ? "floor-plan-image" : ''}`}>
                    {" "}
                    <ImageComponent
                      width="1600"
                      height="900"
                      layout="responsive"
                      src={item.thumbnails.thumb_1024}
                      unoptimized={true}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </Container>
        <div className="property-detail-info">
          <Container>
            <Row>
              <Col md={12}>
                <Row className="align-items-center">
                  <Col className="left-col">
                    {!singlePropertyData ? (
                      <div className="property-detail">
                        <p>
                          <Skeleton height={20}></Skeleton>
                        </p>
                        <h3>
                          <Skeleton height={30}></Skeleton>
                        </h3>
                      </div>
                    ) : (
                      <div className="property-detail">
                        <p>{singlePropertyData?.heading} </p>
                        <h3>{singlePropertyData?.displayAddress}</h3>
                      </div>
                    )}
                  </Col>
                  <Col className="text-right right-col">
                    {!singlePropertyData ? (
                      <div className="property-list">
                        <ul>
                          <li>
                            <Skeleton width={40} height={35} />
                          </li>
                          <li>
                            <Skeleton width={40} height={35} />
                          </li>
                          <li>
                            <Skeleton width={40} height={35} />
                          </li>
                          <li>
                            <Skeleton width={40} height={35} />
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="property-list">
                        <ul>
                          <li>
                            <Image src={bed} alt="" />{" "}
                            <span>{singlePropertyData?.bed || "-"}</span>{" "}
                          </li>
                          <li>
                            <Image src={bath} alt="" />{" "}
                            <span>{singlePropertyData?.bath || "-"}</span>
                          </li>
                          <li>
                            <Image src={garage} alt="" />{" "}
                            <span>
                              {(singlePropertyData?.garages !== 0
                                ? singlePropertyData?.garages
                                : singlePropertyData?.carports) || "-"}
                            </span>
                          </li>
                          <li>
                            <Image src={sqft} alt="" />{" "}
                            <span>
                              {singlePropertyData &&
                                singlePropertyData.landArea &&
                                singlePropertyData.landArea.value ? (
                                <>
                                  {singlePropertyData.landArea.value} m
                                  <sup>2</sup>
                                </>
                              ) : (
                                "-"
                              )}
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row className="mt-4 mb-4">
            <Col lg={8}>
              <Row>
                <Col md={12}>
                  {!singlePropertyData ? (
                    <div>
                      <span>
                        <Skeleton width={300} height={20} />
                      </span>
                      <h4 className="mt-2">
                        {" "}
                        <Skeleton width={300} height={30} />
                      </h4>
                    </div>
                  ) : (
                    <div className="property-amout mb-4 d-flex align-items-center">
                      <div>
                        {propertyCategory === 'sold' ? <span></span> : propertyCategory === 'lease' ? <span>weekly rent</span> : <span>Price Guide</span>}

                        <h4>
                          {" "}
                          {propertyCategory === "lease"
                            ? '$' + (singlePropertyData?.searchPrice &&
                              singlePropertyData?.searchPrice)
                            : singlePropertyData?.displayPrice ? singlePropertyData?.displayPrice : 'Contact Agent'}{" "}
                        </h4>
                      </div>

                      {propertyCategory === "lease" && (
                        <div className="ml-auto">
                          <Button
                            color="primary"
                            className="text-uppercase rounded-0 ml-3"
                            onClick={handleApplyNow}
                          >
                            <span className="m-0" >Apply Now</span>
                          </Button>
                          <Button
                            color="primary"
                            className="text-uppercase rounded-0 ml-3 book-inspection-btn"
                            onClick={handleBookInspection}
                          >
                            <span className="m-0" >Book Inspection</span>
                          </Button>
                        </div>
                      )}
                      {/* <h6> $123354 - $123354 </h6> */}
                    </div>
                  )}
                </Col>
              </Row>
              <div className="pr-lg-4">
                {!singlePropertyData ? (
                  <div className="about-me about-property  pt-4 mb-5">
                    <h3 className="ml-2">
                      <Skeleton width={200} />
                    </h3>
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                  </div>
                ) : (
                  <>
                    <div className="about-me about-decription border-top pt-4 mb-4">
                      <h3> Description </h3>
                      <p
                        style={{ whiteSpace: "break-spaces" }}
                        dangerouslySetInnerHTML={{
                          __html: singlePropertyData?.description,
                        }}
                      ></p>
                    </div>
                    {singlePropertyData?.features &&
                      singlePropertyData?.features.length ? (
                      <div className="about-me mb-0">
                        <h3>
                          {" "}
                          {singlePropertyData?.address?.streetNumber +
                            " " +
                            singlePropertyData?.address?.street +
                            ", " +
                            singlePropertyData?.address?.suburb?.name}{" "}
                          Features{" "}
                        </h3>
                        <div className="row">
                          {singlePropertyData?.features.map((val, index) => {
                            return (
                              <div className="col-6 col-md-4" key={index}>
                                <span>&#10003;</span> {val.displayName}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </Col>
            <Col lg={4} className="pdetail-right-col">
              {!singlePropertyData ? (
                <div className="sidebar h-100 pl-lg-5">
                  {/* <div className="sticky"> */}
                  <Skeleton height={120} className="mb-2" />
                  <Skeleton height={120} className="mb-2" />
                  <Skeleton height={120} className="mb-2" />
                  <Skeleton height={120} className="mb-2" />
                  {/* </div> */}
                </div>
              ) : (
                <div className="sidebar border-left h-100 pl-lg-5">
                  <div className="sticky flat-widget-row">
                    {propertyCategory === "sold" && (
                      <FlatWidget title="Sold Details">
                        <div className="time">
                          <ul className="property-time">
                            <li className="mb-0">
                              <span>
                                <b>Sold For</b>
                              </span>
                              <span>
                                {singlePropertyData?.saleHistory &&
                                  singlePropertyData?.saleHistory.length &&
                                  singlePropertyData.saleHistory[0]?.showSalePrice == true &&
                                  singlePropertyData.saleHistory[0]?.salePrice
                                  ? "$" +
                                  singlePropertyData.saleHistory[0]?.salePrice?.toLocaleString("en-AU")
                                  : "-"}

                              </span>
                            </li>
                            <li className="mb-0">
                              <span>
                                <b>Sold On</b>
                              </span>
                              <span>
                                {
                                  singlePropertyData?.saleHistory &&
                                    singlePropertyData?.saleHistory.length &&
                                    singlePropertyData.saleHistory[0]
                                      ?.unconditional ?
                                    DisplayDate(singlePropertyData.saleHistory[0]?.unconditional) : "-"
                                }
                              </span>
                            </li>
                          </ul>
                        </div>
                      </FlatWidget>
                    )}
                    <FlatWidget title="Property Details">
                      <div className="time">
                        <ul className="property-time">
                          {propertyCategory === "lease" && (
                            <li className="mb-0">
                              <span>
                                <b>Bond</b>
                              </span>
                              <span>
                                {singlePropertyData?.bondPrice
                                  ? "$" +
                                  singlePropertyData?.bondPrice.toLocaleString(
                                    "en-AU"
                                  )
                                  : null}
                              </span>
                            </li>
                          )}
                          {propertyCategory === "lease" && (
                            <li className="mb-0">
                              <span>
                                <b>Available Date</b>
                              </span>
                              {
                                propertyCategory === 'lease' ?
                                  (
                                    singlePropertyData?.availableDate ?
                                      (new Date(singlePropertyData?.availableDate).getDate() < 10 ? ('0' + new Date(singlePropertyData?.availableDate).getDate()) : new Date(singlePropertyData?.availableDate).getDate()) + '-' + ((new Date(singlePropertyData?.availableDate).getMonth() + 1) < 10 ? ('0' + (new Date(singlePropertyData?.availableDate).getMonth() + 1)) : (new Date(singlePropertyData?.availableDate).getMonth() + 1)) + '-' + new Date(singlePropertyData?.availableDate).getFullYear()
                                      : null
                                  ) : <span>{singlePropertyData?.availableDate ? singlePropertyData?.availableDate : '-'}</span>
                              }
                            </li>
                          )}
                          <li className="mb-0">
                            <span>
                              <b>Property ID</b>
                            </span>
                            <span>{singlePropertyData?.id}</span>
                          </li>
                          <li className="mb-0">
                            <span>
                              <b>Property Type</b>
                            </span>
                            <span>{singlePropertyData?.type?.name}</span>
                          </li>
                          {propertyCategory !== "lease" && (
                            <li className="mb-0">
                              <span>
                                <b>Land Area (approx)</b>
                              </span>
                              {
                                singlePropertyData?.landArea?.value ?
                                  <span>
                                    {singlePropertyData?.landArea?.value} m
                                    <sup>2</sup>
                                  </span> : <span>-</span>
                              }
                            </li>
                          )}
                        </ul>
                      </div>
                    </FlatWidget>
                    {(propertyCategory === "sold" ||
                      propertyCategory === "sale") && (
                        <FlatWidget title="Available Documents">
                          <div className="time">
                            <ul className="property-time">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={singlePropertyData?.soiUrl}
                                download
                              >
                                <li className="mb-0">
                                  <span>
                                    <b>Statement Of Information</b>
                                  </span>
                                  {singlePropertyData?.soiUrl ? (
                                    <span className="fa fa-download"></span>
                                  ) : (
                                    <span>Contact Agent</span>
                                  )}
                                </li>
                              </a>
                            </ul>
                          </div>
                        </FlatWidget>
                      )}
                    {propertyCategory !== "sold" && (
                      <>
                        {" "}
                        <FlatWidget title="Open Times">
                          <div className="time">
                            <ul className="property-time">
                              {aucationDate && aucationDate.length
                                ? aucationDate.map((date, index) => {
                                  return (
                                    <li key={index}>
                                      <span>
                                        <b>
                                          <i className="fa fa-calendar"></i>
                                          {DisplayDate(date.start)}
                                        </b>
                                      </span>
                                      <span className="pt">
                                        {moment(date.start).format("h:mm A") +
                                          " - " +
                                          moment(date.end).format("h:mm A")}
                                      </span>
                                    </li>
                                  );
                                })
                                : (<span className="cursor-pointer" onClick={scrollDown}>Please <b className="text-primary">contact agent</b> to book your private inspection.</span>)}
                            </ul>
                          </div>
                        </FlatWidget>
                        {singlePropertyData &&
                          singlePropertyData?.auctionDetails?.dateTime && (
                            <>
                              {
                                new Date(singlePropertyData?.auctionDetails?.dateTime) > new Date() ?

                                  <FlatWidget title="auction Detail">
                                    <div className="time">
                                      <ul className="property-time">
                                        <li>
                                          <span>
                                            <b>
                                              <i className="fa fa-calendar"></i>{" "}
                                              {DisplayDate(
                                                singlePropertyData.auctionDetails
                                                  .dateTime
                                              )}
                                            </b>
                                          </span>
                                          <span className="pt">
                                            {moment(
                                              singlePropertyData.auctionDetails
                                                .dateTime
                                            ).format("h:mm A")}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </FlatWidget> : null
                              }
                            </>
                          )}
                      </>
                    )}
                    <FlatWidget title="Share this property">
                      <ul className="social-icon">
                        <li>
                          {/* <div className="addthis_inline_share_toolbox"> */}
                          <FacebookIcon url={fullUrl} className="facebook" />
                          {/* </div> */}
                          <LinkedinIcon url={fullUrl} title={singlePropertyData?.displayAddress || ''} description={singlePropertyData?.description || ''} className="linkedin" />
                          <TwitterIcon url={fullUrl} shareText={singlePropertyData?.displayAddress || ''} className="twitter" />
                          <WhatsappIcon url={fullUrl} className="whatsapp" />
                          <PinterestIcon url={fullUrl} media={propertyPhotos[0]?.url} className="pinterest" />
                          <EmailIcon url={fullUrl} subject={singlePropertyData?.displayAddress || ''} className="email" />
                        </li>
                      </ul>
                    </FlatWidget>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
        {singlePropertyData?.geolocation?.latitude && singlePropertyData?.geolocation?.longitude &&
          <Container fluid className="p-0">
            <Row noGutters>
              <Col md={12}>
                <PropertyMap {...singlePropertyData?.geolocation} />
              </Col>
            </Row>
          </Container>}
        <div className="agent-contact section" id="agent-contact section-scroll">
          <Container>
            <Row className="align-items-center">
              <Col md={4} className="office-detail">
                <div className="agency-detail">
                  <div className="agency-name">
                    <Link passHref href={`/office/${from === "1" ? 'derrimut' : 'truganina'}`}>
                      <a>
                        Okas Property Group{" "}
                        {`${from === "1" ? "Derrimut" : "Truganina"}`}
                      </a>
                    </Link>
                    <p>
                      {from === "2" ? (
                        <>
                          <a
                            href="https://goo.gl/maps/eJ2dJbEKbRtSMx1t6"
                            target="_blank"
                            rel="noreferrer"
                          >
                            3/209 Palmers Rd, Truganina VIC 3029
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            href="https://goo.gl/maps/sAerJWiBQXr62T2j7"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Unit 5, 31 Elgar Road, Derrimut, VIC 3026
                          </a>
                        </>
                      )}{" "}
                    </p>
                  </div>
                  <div className="contact details mt-3 mb-5">
                    <ul>
                      <li className="info-box">
                        <div className="icon">
                          <Image width="28" height="20" src={call} alt="call" />{" "}
                        </div>

                        <a href={`tel:${from === "1" ? "03 8390 0699" : "03 7038 6527"}`} target="_blank" rel="noreferrer"><p>{from === "1" ? "03 8390 0699" : "03 7038 6527"}</p></a>

                      </li>
                      <li className="info-box">
                        <div className="icon">
                          <Image
                            width="28"
                            height="20"
                            src={emailIcon}
                            alt="email"
                          />{" "}
                        </div>
                        <a href={`mailto:info@okasre.com.au`} target="_blank" rel="noreferrer"><p>info@okasre.com.au </p></a>
                      </li>
                    </ul>
                  </div>
                  <Button
                    color="primary"
                    className="text-uppercase rounded-0  border-none"
                    style={{ border: 'none' }}
                    onClick={modalToggle}
                  >
                    {
                      propertyCategory === 'sold' ?
                        <span>Request An Appraisal</span> :
                        <span>Ask About This Property</span>
                    }
                  </Button>
                  {/* {propertyCategory === "lease" && (
                    <Button
                      color="primary"
                      className="text-uppercase rounded-0 ml-3"
                    >
                      <span>Apply Now</span>
                    </Button>
                  )} */}
                </div>
              </Col>
              <Col md={8} className="agent-detail-wrapper">
                {propertyCategory === "lease" ? (
                  <Row>
                    <AgentContactBox
                      agentContactData={singlePropertyData}
                      address={singlePropertyData?.displayAddress}
                    />
                  </Row>
                ) : (
                  <Row>
                    <AgentContactBox
                      agentContactData={singlePropertyData}
                      address={singlePropertyData?.displayAddress}
                      category="sale"
                    />
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          {
            <>
              <Row className="justify-content-center mt-5">
                <Col md={12}>
                  <div className="mb-3">
                    {!singlePropertyData ? (
                      <Skeleton width={300} height={25} />
                    ) : (
                      <h5 className="font2 font-weight-bold">
                        {propertyCategory === "sold"
                          ? "Recent sales"
                          : "You Might Also Like"}
                      </h5>
                    )}
                  </div>
                </Col>
              </Row>
              {!relatedData ? (
                <Row>
                  <SkeletonListingBox count={4} grid={3} />
                </Row>
              ) : (
                <Row>
                  <ListingBox
                    propertiesSaleData={relatedData}
                    category={propertyCategory && propertyCategory}
                    displayRecord={8}
                    grid={3}
                    loading={loadingRelated}
                  />
                </Row>
              )}
            </>
          }
        </Container>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  let propertyList = [];
  try {
    const ApiGet = require("../../../../helper/ApiData").ApiGet;
    const response = await ApiGet("properties/allProperties/list");
    propertyList = response.data.data;
  } catch (error) {
    console.log("Error");
  }
  const agencyTypes = {
    Derrimut: 1,
    Truganina: 2,
  };

  return {
    fallback: true,
    paths: propertyList.map(
      ({ id, agency, category, propertyType, displayAddress }) => {
        const idCombined = `${id}-${agencyTypes[agency]}-${titleToSlug(
          displayAddress
        )}`;
        return {
          params: {
            propertyCategory: category,
            propertyType,
            propertyId: idCombined,
          },
        };
      }
    ),
  };
};

export const getStaticProps = async ({ params }) => {
  const {
    propertyCategory,
    propertyType,
    propertyId: propertyIdCombined,
  } = params;
  const [propertyId, from] = propertyIdCombined.split("-");
  try {
    const response = await ApiGet(
      `properties/${propertyCategory === "sold" ? "sale" : propertyCategory
      }/${propertyId}?type=${propertyType}&from=${from}`
    );
    const singlePropertyData = {
      ...response.data?.data,
    };

    if (singlePropertyData.photos && singlePropertyData.photos.length === 1) {
      singlePropertyData.photos = [
        singlePropertyData.photos[0],
        singlePropertyData.photos[0],
      ];
    }
    return {
      props: {
        singlePropertyData,
      },
      revalidate: 60 * 20,
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        singlePropertyData: null,
      },
      revalidate: 60 * 20,
    };
  }
};

export default SinglePropertyDetails;
