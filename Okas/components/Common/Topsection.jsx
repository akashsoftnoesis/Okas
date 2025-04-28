import { Container, Row, Col } from 'reactstrap';

export default function Topsection(props) {
    return (
        <div className="top-section" style={{
            backgroundImage: (`url(${props.backgroundImage})` || null)
        }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <div className="text-center">
                            <h1 className={`mb-0 ${props.titleLight && 'text-white'}`}>{props.pageTitle}</h1>
                            {props.children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
