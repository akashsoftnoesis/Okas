import { Container, Row, Col } from 'reactstrap';
import WhyChooseListing from '../Common/WhyChooseListing'
import Trusted from '../../public/assets/images/trusted (1).png'
import wideRange from '../../public/assets/images/wideRrenge (1).png'
import financing from '../../public/assets/images/financing (1).png'
import neighborhoods from '../../public/assets/images/neighborhoods (1).png'
import ScrollAnimation from 'react-animate-on-scroll';

const whyChooseListing = [
    {
        img: Trusted,
        title: "Trusted By Thousands",
        desc: "With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home."
    },
    {
        img: wideRange,
        title: "Wide Range Of Properties",
        desc: "With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home."
    },
    {
        img: financing,
        title: "Financing Made Easy",
        desc: "With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home."
    },
    {
        img: neighborhoods,
        title: "Neighborhoods",
        desc: "With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home."
    }
]
const delayByCardIndex = {
    0: 0.55,
    1: 0.65,
    2: 0.75,
    3: 0.85,
}

export default function WhyToChoose(props) {
    return (
        <div className="section pb-4 bg-light-gray"  style={{
            backgroundImage: (`url(${props.backgroundImage})` || null)
        }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <div className="heading mb-5 mt-2">
                            <h5 className="font2 text-uppercase font-weight-light">We provide exceptional services at every step</h5>
                                <h3 className="mb-3">Why Choose Okas Property Group</h3>
                                <p className="leading-normal">We understand that property is your greatest asset, and the selling process can be emotional and overwhelming at times. That’s why we are here for you at every step of the way, to make you feel comfortable and at ease, providing guidance, right knowledge, and full support.</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        whyChooseListing.map((data, index) => {
                            return (
                                <Col md={3} sm={6} key={index}>
                                        <WhyChooseListing 
                                            image={data.img}
                                            title={data.title}
                                            />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}