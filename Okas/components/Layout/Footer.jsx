import { Col, Container, Input, Row, Button } from "reactstrap";
import call from '../../public/assets/images/call-icon.svg';
import emailIcon from '../../public/assets/images/email-icon.svg';
import location from '../../public/assets/images/location-icon.svg';
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

const quickLink = [
  {
    link: '/buy',
    menu: "Buy With Us",
  },
  {
    link: '/request-appraisal',
    menu: "Sell With Us",
  },
  {
    link: '/request-appraisal',
    menu: "Rent With Us",
  },
  {
    link: '/sold',
    menu: "Recent Sales",
  },
]
const footerBottomLink = [
  {
    link: '/feedback',
    menu: "Feedback",
  },
  {
    link: '/privacy-policy',
    menu: "Privacy policy",
  },
]
const SocialTruganina = [
  {
    icon: "fa fa-facebook",
    url: "https://www.facebook.com/okastruganinaau",
  },
  {
    icon: "fa fa-youtube",
    url: "https://www.youtube.com/channel/UCzTRelsBbcR_EgaGWbmF2-g",
  },
  {
    icon: "fa fa-instagram",
    url: "https://www.instagram.com/okastruganinaau/",
  },
  {
    icon: "fa fa-linkedin",
    url: "https://www.linkedin.com/company/67814309/",
  },
]

const SocialDerrimut = [
  {
    icon: "fa fa-facebook",
    url: "https://www.facebook.com/okaspropertygroup",
  },
  {
    icon: "fa fa-youtube",
    url: "https://www.youtube.com/channel/UCzTRelsBbcR_EgaGWbmF2-g",
  },
  {
    icon: "fa fa-instagram",
    url: "https://www.instagram.com/okaspropertygroup/",
  },
  {
    icon: "fa fa-linkedin",
    url: "https://www.linkedin.com/company/67814309/",
  },
]

export default function Footer() {
  const [isActive, setActive] = useState(0);
  return (
    <footer>
      <div className="footer-top">
        <Container>
          <Row>
            <Col lg={3} md={6}>
              <div className={`sub-title have-menu ${isActive === 1 && "active"}`} onClick={() => setActive(isActive == 1 ? 0 : 1)}>
                <h5 className="align-title">Truganina Branch</h5>
              </div>
              <div className={`contact details menu-content toggle-slide ${isActive === 2 && "active"}`}>
                <ul>
                  <li className="info-box">
                    <a href={`https://goo.gl/maps/2sBYMb2b4Fzuaz6AA`} className="d-flex" target={`_blank`}>
                      <div className="icon"><Image width="28" height="20" src={location} alt="location" className="location" /> </div>
                      <p>3/209 Palmers Rd, Truganina VIC 3029</p>
                    </a>
                  </li>
                  <li className="info-box">
                    <a href={`https://api.whatsapp.com/send?phone=03 7038 6527`} className="d-flex" target={`_blank`}>
                      <div className="icon"><Image width="28" height="20" src={call} alt="call" /> </div>
                      <p>03 7038 6527 </p>
                    </a>
                  </li>
                  <li className="info-box">
                    <a href={`mailto:info@okasre.com.au`} className="d-flex" target={`_blank`}>
                      <div className="icon"><Image width="28" height="20" src={emailIcon} alt="email" /> </div>
                      <p>info@okasre.com.au </p>
                    </a>
                  </li>
                </ul>
                <ul className="social-media-icon pl-4">
                  {
                    SocialTruganina.map((data, i) => {
                      return (
                        <li key={i}><a href={data.url} target="_blank" rel="noreferrer" ><i className={data.icon} aria-hidden="true"></i></a></li>
                      )
                    })
                  }

                </ul>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className={`sub-title have-menu ${isActive === 2 && "active"}`} onClick={() => setActive(isActive == 2 ? 0 : 2)}>
                <h5 className="align-title">Derrimut Branch</h5>
              </div>
              <div className={`contact details menu-content toggle-slide ${isActive === 1 && "active"}`}>
                <ul>
                  <li className="info-box">
                    <a href={`https://goo.gl/maps/54Gt5XjtEm2Pq39P7`} className="d-flex" target={`_blank`}>
                      <div className="icon"><Image width="28" height="20" src={location} alt="location" className="location" /> </div>
                      <p>Unit 5, 31 Elgar Road, Derrimut, VIC 3026</p>
                    </a>
                  </li>
                  <li className="info-box">
                    <a href={`https://api.whatsapp.com/send?phone=03 8390 0699`} className="d-flex" target={`_blank`}>
                      <div className="icon"><Image width="28" height="20" src={call} alt="call" /> </div>
                      <p>03 8390 0699</p>
                    </a>
                  </li>
                  <li className="info-box">
                    <a href={`mailto:info@okasre.com.au`} className="d-flex" target={`_blank`}>
                      <div className="icon"><Image width="28" height="20" src={emailIcon} alt="email" /> </div>
                      <p>info@okasre.com.au</p>
                    </a>
                  </li>
                </ul>
                <ul className="social-media-icon pl-4">
                  {
                    SocialDerrimut.map((data, i) => {
                      return (
                        <li key={i}><a href={data.url} target="_blank" rel="noreferrer" ><i className={data.icon} aria-hidden="true"></i></a></li>
                      )
                    })
                  }

                </ul>
              </div>
            </Col>
            <Col lg={2} md={6}>
              <div className={`sub-title have-menu ${isActive === 3 && "active"}`} onClick={() => setActive(isActive == 3 ? 0 : 3)}>
                <h5>Quick Links </h5>
              </div>
              <ul  className={`list-ul menu-content toggle-slide ${isActive === 3 && "active"}`}>
                {
                  quickLink.map((data, i) => {
                    return (
                      <li key={i}><Link href={data.link}>{data.menu}</Link></li>
                    )
                  })
                }
              </ul>
            </Col>
            <Col lg={4}>
              <div className="subscribe-bg">
                <div className="sub-title">
                  <h5>Subscribe </h5>
                </div>
                <div className="subscribe-email">
                  <p> We don’t send spam so don’t worry.</p>
                  <div className="footer-email">
                    <Input type="text" autoComplete="off" placeholder="Enter your email" />
                    <Button> Submit </Button>
                  </div>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col md={3}>
              <p className="text-center text-md-left mb-3 mb-md-0">Copyright © 2025 OKAS. All Right Reserved.</p>
            </Col>

            <Col md={4}>
              <div className="footer-menu text-center text-md-right">
                <ul>
                  {
                    footerBottomLink.map((data, i) => {
                      return (
                        <li key={i}><Link href={data.link}>{data.menu}</Link></li>
                      )
                    })
                  }
                </ul>
              </div>
            </Col>
            <Col md={5}>
              <p className="text-center text-md-right mb-3 mb-md-0">Managed by{' '}<Link target="_blank" rel="noreferrer" href="https://www.softnoesis.com.au/" className="text-white font-weight-bold text">Softnoesis Australia Pty. Ltd.</Link></p>
              {/* Design & Developed by Vishwas Dhanani */}
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}
