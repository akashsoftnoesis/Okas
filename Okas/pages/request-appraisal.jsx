import { useEffect, useState } from "react";
import Image from "next/image";
import { Col, Row, Container } from "reactstrap";
import Layout from "../components/Layout";
import Topsection from "../components/Common/Topsection";
import requestAppraisalImg from "../public/assets/images/request-appraisal-img.jpg";
import AppraisalForm from "../components/Common/AppraisalForm";
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";

export default function RequestAppraisal() {

  const [metaDetails, setMetaDetails] = useState({
    pageName: "Request an Appraisal"
  })

  //eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const metadetail = await getMetaDetails('Request an Appraisal');
  //   setMetaDetails(metadetail)
  // }, [])

  return (
    <Layout>
      <MetaHandler props={metaDetails} />
      <Topsection
        titleLight
        pageTitle="Request an Appraisal"
        backgroundImage="/assets/images/request-appraisal-bg.jpg"
      />
      <div className="section properties-wrap">
        <Container>
          <Row className="justify-content-between">
            <Col md={6}>
              <div className="heading text-left mb-4">
                <h2>Free Property Appraisal</h2>
                <p>
                  If you would like a no obligation appraisal of your home,
                  please fill out the form below and we will be in touch
                  shortly.
                </p>
              </div>
              <AppraisalForm />
            </Col>
            <Col md={6}>
              <div className="request-appraisal-img">
                <Image src={requestAppraisalImg} alt="RequestAppraisalImg" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
