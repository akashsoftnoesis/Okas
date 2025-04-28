import { Container, Button, Row, Col } from 'reactstrap';
import CustomModal from "../Common/CustomModal";
import AppraisalForm from "../Common/AppraisalForm";
import { useState } from 'react';

export default function CTA(props) {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);
    return (
        <>
            <CustomModal className="appraisal-modal" fade isOpen={modal} toggle={modalToggle} size="lg" heading="Request an Appraisal" subHeading="OKAS PROPERTY GROUP">
                <div className="appraisal-content">
                    <AppraisalForm />
                </div>
            </CustomModal>
            <div className="cta-sectoin fixed-bg overlay-bg" style={{
                backgroundImage: (`url(${props.backgroundImage})` || null)
            }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={7}>
                            <h3 className="mb-0">Curious to know what your place is worth?</h3>
                            {/* <p>{`Find out it's real value from real experts in 24 hours.`}</p> */}
                        </Col>
                        <Col md={5} className="text-md-right">
                            <Button color="white" className="font2" onClick={modalToggle}>Request an Appraisal</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}