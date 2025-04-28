import Layout from "../components/Layout";
import Topsection from '../components/Common/Topsection'
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import TestimonialBox from "../components/Common/TestimonialBox";
import Image from "next/image";
import aboutImg from '../public/assets/images/about-img.jpg'
import howWeWork from '../public/assets/images/how-we-work-img.jpg'
import ourValue from '../public/assets/images/our-value.jpg'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";
import { useEffect, useState } from "react";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const counter = [
  {
    number: "66,180",
    title: "Homes for sale"
  },
  {
    number: "4,809",
    title: "Open houses"
  },
  {
    number: "30,469",
    title: "Recently sold"
  },
  {
    number: "2,919",
    title: "Price reduced"
  }
]

export default function WhoWeAre() {

  const [metaDetails, setMetaDetails] = useState({
    pageName: "Who We Are"
  })

  //eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const metadetail = await getMetaDetails('Who We Are');
  //   setMetaDetails(metadetail)
  // }, [])

  return (
    <Layout>
      <MetaHandler props={metaDetails} />
      <Topsection titleLight pageTitle="Who We Are" backgroundImage="/assets/images/about-bg.jpg" />
      <div className="section mt-5 mb-5 how-we-work" >
        <Container>
          {/* <Row className="justify-content-center">
            <Col md={10}>
              <div className="heading">
                <h5 className="font2 text-uppercase font-weight-light">Know your Real Estate Agancy</h5>
                <h3>Owning a home is a keystone of wealth</h3>
              </div>
            </Col>
          </Row> */}
          <Row>
            <Col md={6}>
              <div className="about-img wwr-abt-img">
                <Image width="650" height="500" src={aboutImg} alt="" />
              </div>
            </Col>
            <Col md={6} className="about-content wwr-abt-content">
              <div className="content-details">
                <h4>Your selling journey is our speciality.</h4>
                <div>
                  <p>At OKAS we work closely with investors, first-home owners, couples, singles and families just like you to achieve your real estate goals and get you the best outcome.</p>
                  <p>We understand that property is your greatest asset, and the selling process can be emotional and overwhelming at times. That’s why we are here for you every step of the way, to make you feel comfortable and at ease, providing guidance, knowledge, and support. Trusted by homeowners, investment owners, real estate professionals and developers, we are committed to excellence and the highest quality of customer support.</p>
                  <p>OKAS Real Estate has carved a highly successful niche offering unrivalled property investment opportunities in high-growth markets to clients from around the world. Our exceptional approach reflects the long-term commitment towards our clients, ensuring that they capitalize on their investments with us today and tomorrow, whilst reinforcing our commitment to developing landmark townhouses and services that deliver attractive returns to astute investors.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section  bg-gray">
        <Container>
          <Row className="my-5 align-items-center">
            <Col md={6} className="order-2">
              <div className="about-img top-img">
                <Image width="650" height="300" src={howWeWork} alt="" />
              </div>
            </Col>
            <Col md={6} className="about-info">
              <div className="content-details">
                <h3 className="text-primary mb-3">How We Work</h3>
                <p>We are transparent, realistic and honest about the process involved in selling your property which means that together, we develop a genuine relationship of trust with you. Our team will keep you involved in the process throughout the entire campaign, so you are always comfortable and in the loop. Professionalism is a top priority for us, which is why we ensure that your property is respected, and privacy is maintained during all Open Homes, sales and auctions. From market appraisal, to budget-conscious marketing and after-sales service, we have the expertise to help you achieve your goal.</p>
              </div>
            </Col>
          </Row>
          <Row className="my-5 align-items-center">
            <Col md={6}>
              <div className="about-img bottom-img">
                <Image width="650" height="300" src={ourValue} alt="" />
              </div>
            </Col>
            <Col md={6} className="about-info">
              <div className="content-details">
                <h3 className="text-primary mb-3">Our Values</h3>
                <p>Our core values are Integrity and Trust. As your agency you can expect us to deal with you with complete transparency and honesty. We will work hard to ensure your property is presented perfectly in the market and customize a plan to ensure the successful sale or lease of your property.
                  Our Integrity is stemmed from trust, both from our vendors and our purchasers alike. We will work with you to ensure best possible experience for your assets and vow never to break the trust that you provided us. We always keep our focus on you and will never make our customer feel just another number.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="section">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <Row className="my-3">
                {
                  counter.map((data, i) => {
                    return (
                      <Col md={3} key={i}>
                        <div className="counter mb-3">
                          <h3>{data.number}</h3>
                          <p>{data.title}</p>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
            </Col>
          </Row>
        </Container>
      </div> */}
      {/* <div className="section section1  testimonial-bg"> */}
        {/* <Container>
          <Row>
            <Col md={12}>
              <div className="heading">
                <h2 className="mb-3">Our Testimonials</h2>
              </div>
              <Swiper
                spaceBetween={30}
                breakpoints={{
                  992: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
                loop="true"
                className="pb-5"
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <div className="testimonial-box">
                    <div className="testi-meta">
                      <p className="mb-0">{`“ Thank you Thao and Ridhima, you came as a referral, being young, I wasn't sure at first. However your persistent and huge amounts of efforts, you delivered a result beyond my expectations. I can't thank you enough. I wish you both all the best, and will not hesitate to refer friends or family wanting to sell with you. Regards, Karen “`}</p>
                    </div>
                    <div className="testimonial-client-info">
                      <div className="client-info">
                        <h6>Karen Mansbridge</h6>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-box">
                    <div className="testi-meta">
                      <p className="mb-0">{`“ Kuldip is the best! He was thorough and professional and great to work with. He kept us apprised about available appointments and always let us know as soon as a new one came on the market. Kuldip was honest and forthright- no games. After dealing with several other agents in the Truganina area and being disappointed, we felt lucky to find Kuldip “`}</p>
                    </div>
                    <div className="testimonial-client-info">
                      <div className="client-info">
                        <h6>Vendor</h6>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-box">
                    <div className="testi-meta">
                      <p className="mb-0">{`“ 100% Recommended A big thank you to Vish for all his hardwork and patience. He is a friendly person with a proffessional attitude. He delivered us what we wanted and made whole process easy for us. He is very communicative and a perfect negotiator. I would recommend him to everyone! “`}</p>
                    </div>
                    <div className="testimonial-client-info">
                      <div className="client-info">
                        <h6>Stacey Piercy</h6>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-box">
                    <div className="testi-meta">
                      <p className="mb-0">{`“ Neha sold our property last year in first covid lock down. It was our investment property and we are based in Sydney. She helped to organise local company to stage the property at a very reasonable price. We had 16 written offers in 3 days and sold in two weeks. Very happy with results. A life-long customers in case we buy/sale the property in Melbourne. Keep up the good work. “`}</p>
                    </div>
                    <div className="testimonial-client-info">
                      <div className="client-info">
                        <h6>Jigar And Hiral Shah</h6>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-box">
                    <div className="testi-meta">
                      <p className="mb-0">{`“ To start with, thank you Vish for selling my home in no time. I wanted to make a move and I wasn't sure of a couple of things. Not only you helped me in selling my home at the best price , but also guided me on the right road for future plans. Your effective communication and supportive style has a long way to go. The home was sold prior to Auction. The whole process was smooth and seamless. We were aware of everything at every step as vendors. Me and my partner are extremely happy with the results. From marketing to negotiation, you have been astounding. Not only do we have a professional relationship, but also a cordial friendship. We would highly recommend you to all our friends and family for future real estate needs. Good luck! “`}</p>
                    </div>
                    <div className="testimonial-client-info">
                      <div className="client-info">
                        <h6>Sudesh Kumar</h6>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
        </Container> */}
      {/* </div> */}
    </Layout>
  )
}