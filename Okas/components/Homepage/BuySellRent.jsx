import { Button, Col, Container, Row } from "reactstrap";
import buyImg from "../../public/assets/images/buy-img.jpg"
import sellImg from "../../public/assets/images/sell-img.jpg"
import rentImg from "../../public/assets/images/rent-img.jpg"
import ImageComponent from "../Common/ImageComponent";
import ScrollAnimation from 'react-animate-on-scroll';

const helpBox = [
    {
        image: buyImg,
        title: "Buy",
        desc: "Serving all your real estate needs with confidence.",
        url: '/buy'
    },
    {
        image: sellImg,
        title: "Sell",
        desc: "Your dreams of sky high sales become a reality at OKAS.",
        url: '/request-appraisal'
    },
    {
        image: rentImg,
        title: "Rent",
        desc: "An end-to-end property management service you can depend on.",
        url: '/rent'
    },
]

const delayByCardIndex = {
    0: 0.5,
    1: 0.7,
    2: 0.9,
}
export default function BuySellRent() {
    return (
        <div className="section" id="sell-buy">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <div className="heading mb-5">
                            <h5 className="font2 text-uppercase font-weight-light">We’re here to help whether you are</h5>
                            <h3>Buying, Selling or Renting a house.</h3>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        helpBox.map((data, i) => {
                            return (
                                <Col md={4} key={i}>
                                        <div className="help-box">
                                            <div className="help-box-img">
                                                <ImageComponent src={data.image} alt="" />
                                            </div>
                                            <div className="help-box-content">
                                                <h3>{data.title}</h3>
                                                <div className="content-box">
                                                    <p>{data.desc}.</p>
                                                    <Button color="secondary" href={data.url}>Learn More</Button>
                                                </div>
                                            </div>
                                        </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}