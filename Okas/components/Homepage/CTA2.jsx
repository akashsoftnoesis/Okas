import { Container, Button, Row, Col } from 'reactstrap';
import CustomModal from "../Common/CustomModal";
import AppraisalForm from "../Common/AppraisalForm";
import { useState } from 'react';

export default function CTA2(props) {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);
    return (
        <>
            <CustomModal className="appraisal-modal" fade isOpen={modal} toggle={modalToggle} size="lg" heading="Request an Appraisal" subHeading="OKAS PROPERTY GROUP">
                <div className="appraisal-content">
                    <AppraisalForm />
                </div>
            </CustomModal>
            <div className="cta-sectoin2">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={12} className="text-center">
                            <h3 className="mb-3 text-white font2">A Tradition of Excellence, Integrity & Knowledge</h3>
                            <p className="text-white leading-normal mb-0">Trusted by homeowners, investment owners, real estate professionals and developers, we are committed to excellence and the highest quality of customer support.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}