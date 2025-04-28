import Image from "next/image";
import { Col, Container, Row } from "reactstrap";
import benefits1 from '../../public/assets/images/benefits-1.jpg'
import benefits2 from '../../public/assets/images/benefits-2.jpg'
import benefits3 from '../../public/assets/images/benefits-3.jpg'
import benefits4 from '../../public/assets/images/benefits-4.jpg'

const benefitsList = [
    {
        image: benefits1,
        title: "An in-depth evaluation of your property",
        desc: `The agent will take a look at your property and identify its main selling points.  They will look at your property’s size, number of bedrooms and bathrooms, condition of the property, its fixtures and fittings and the quality of any renovations.`
    },
    {
        image: benefits2,
        title: "Property location analysis",
        desc: `An evaluation of your property's appeal to potential buyers in terms of its proximity to amenities, schools, shops, and desirable settings.`
    },
    {
        image: benefits3,
        title: "Sales of local real estate",
        desc: `Analysis of the current local market, what similar properties are for sale and what are sold in the last 90 days - and for how much.`
    },
    {
        image: benefits4,
        title: "Local buyer insights",
        desc: `Your local Okas Sales Agents know what local buyers want and what they are prepared to pay for. During their visit to your home, they would love to discuss this, along with specific ways in which you can add value to your property.`
    }
]

export default function AppraisalBenefits() {
    return (
        <div className="section pb-4">
            <Container>
                <Row className="justify-content-center">
                    <Col md={9}>
                        <div className="heading mb-5">
                            <h5 className="font2 text-uppercase font-weight-light">WHAT YOU GET IN A PROPERTY APPRAISAL?</h5>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        benefitsList.map((data, i) => {
                            return (
                                <Col md={12} lg={6} key={i}>
                                        <div className="benefits-box">
                                            <div className="benefits-image">
                                                <Image src={data.image} height="250" width="250" alt="" />
                                            </div>
                                            <div className="benefits-content">
                                                <h5 className="font2">{data.title}</h5>
                                                <p>{data.desc}</p>
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