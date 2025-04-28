import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Alert } from "reactstrap";
import Topsection from "../components/Common/Topsection";
import Layout from "../components/Layout";
import { ApiPost } from "../helper/ApiData";
import Step1, {findPropertyData, newspaperDetails, websiteDetails} from "./RentalApplicationStep/Step1";
import Step2 from "./RentalApplicationStep/Step2";
import Step3 from "./RentalApplicationStep/Step3";
import Step5 from "./RentalApplicationStep/Step5";
import Step6 from "./RentalApplicationStep/Step6";
import Step7 from "./RentalApplicationStep/Step7";
import moment from "moment";
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";
import Step8, { relationship } from "./RentalApplicationStep/Step8";
import Step9 from "./RentalApplicationStep/Step9";

export default function RentalApplicationForm() {
  const [activeStep, setActiveStep] = useState(1);
  const [rentalApplicationData, setRentalApplicationData] = useState({
    step1: { data: {}, valid: false },
    step2: { data: {}, valid: false },
    step3: { data: {}, valid: false },
    step4: { data: {}, valid: false },
    step5: { data: {}, valid: false },
    step6: { data: {}, valid: false },
    step8: { data: {}, valid: false },
    step9: { data: {}, valid: false }
  });
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [showStepError, setShowStepError] = useState({
    step1: false,
    step2: false,
    step3: false,
    step6: false,
    step8: false,
    step9: false,
  })
  const [metaDetails, setMetaDetails] = useState({
    pageName: "Rental Application"
  })

  //eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const metadetail = await getMetaDetails('Rental Application');
  //   setMetaDetails(metadetail)
  // }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [activeStep]);

  const steps = [
    "Property details",
    "Occupant",
    "Rental History",
    "Employment",
    "Agent questions",
    "Identification",
    "Declaration",
    "Review",
  ];

  const handleApplicationData = (step, data, valid) => {
    const rentalApplicationDataCopy = { ...rentalApplicationData };
    rentalApplicationDataCopy[step] = { data, valid };
    setRentalApplicationData(rentalApplicationDataCopy);
  };

  const validateForm = () => {
    if (!rentalApplicationData.step1.valid) return 'step1'
    if (!rentalApplicationData.step2.valid) return 'step2'
    if (!rentalApplicationData.step3.valid) return 'step3'
    if (!rentalApplicationData.step6.valid) return 'step6'
    if (!rentalApplicationData.step8.valid) return 'step8'
    if (!rentalApplicationData.step9.valid) return 'step9'
  }

  const getLabelFromArray = (dataArray, value) => {
    const filteredData = dataArray.filter(elem => elem?.value === value)
    return filteredData[0]?.label
  }

  const onFinalSubmit = async () => {
    const notValidForm = validateForm();
    setLoading(true)
    if (notValidForm) {
      setShowStepError({
        ...showStepError,
        [notValidForm]: true
      })
      setTimeout(() => {
        setShowStepError({
          ...showStepError,
          [notValidForm]: false
        })
      }, 2000);
      window.scrollTo({ top: 0, behavior: 'smooth', })
      return true
    }
    setSuccess(null)
    const images = rentalApplicationData?.step5?.data?.images?.map(({ name, value, ...item }) => item);
    const json = {
      ...rentalApplicationData.step1.data,
      ...rentalApplicationData.step2.data,
      ...rentalApplicationData.step3.data,
      ...rentalApplicationData.step8.data,
      ...rentalApplicationData.step9.data,
      images,
      template_name: 'rentalApplicationForm',
      subject: 'Enquiry for property',
    };
    json['currentDate'] = moment(new Date()).format('DD-MM-YYYY')
    json["send_to"] = "ire@okaspropertygroup.com.au"
    if (json["findProperty"]) {
      json["findProperty"] = getLabelFromArray(findPropertyData,json["findProperty"]) || json["findProperty"]
    }
    if (json["Newspaper"]) {
      json["Newspaper"] = getLabelFromArray(newspaperDetails,json["Newspaper"]) || json["Newspaper"]
    }
    if (json["Website"]) {
      json["Website"] = getLabelFromArray(websiteDetails,json["Website"]) || json["Website"]
    }
    if (json["refRelation1"]) {
      json["refRelation1"] = getLabelFromArray(relationship,json["refRelation1"]) || json["refRelation1"]
    }
    if (json["refRelation2"]) {
      json["refRelation2"] = getLabelFromArray(relationship,json["refRelation2"]) || json["refRelation2"]
    }
    if (json["refRelation3"]) {
      json["refRelation3"] = getLabelFromArray(relationship,json["refRelation3"]) || json["refRelation3"]
    }
    if (json["refRelation3"]) {
      json["refRelation3"] = getLabelFromArray(relationship,json["refRelation3"]) || json["refRelation3"]
    }
    if (json["persons"]) {
      const personsArray = json["persons"]
      personsArray.forEach(person => {
        person["personRelationship"] = getLabelFromArray(relationship,person["personRelationship"]) || person["personRelationship"]
      });
      json["persons"] = personsArray
    }

console.log('json', json)
    try {
      const res = await ApiPost(`send/mail`, json);
      if (res) {
        setLoading(false)
        setSuccess('success')
      } else {
        setLoading(false)
        setSuccess('fail')
      }
    } catch (error) {
      setLoading(false)
      setSuccess('fail')
    }
    // setTimeout(() => {
    //   setSuccess(null);
    // }, 2000);
    window.scrollTo({ top: 0, behavior: 'smooth', })
    setLoading(false)
  }

  const getSteps = (activeStep) => {
    switch (activeStep) {
      case 1:
        return (
          <Step1
            rentalApplicationData={rentalApplicationData.step1.data}
            handleApplicationData={handleApplicationData}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2
            rentalApplicationData={rentalApplicationData.step2.data}
            handleApplicationData={handleApplicationData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 5:
        return (
          <Step3
            rentalApplicationData={rentalApplicationData.step3.data}
            handleApplicationData={handleApplicationData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 6:
        return (
          <Step5
            rentalApplicationData={rentalApplicationData.step5.data}
            handleApplicationData={handleApplicationData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 7:
        return <Step6
          rentalApplicationData={rentalApplicationData.step6.data}
          handleApplicationData={handleApplicationData}
          handleNext={handleNext}
          handleBack={handleBack}
        />;
      case 8:
        return <Step7 handleBack={handleBack} onFinalSubmit={onFinalSubmit} loading={loading} success={success} />;
      case 3:
        return <Step8 handleBack={handleBack} handleNext={handleNext} rentalApplicationData={rentalApplicationData.step8.data}
          handleApplicationData={handleApplicationData} loading={loading} success={success} />;
      case 4:
        return <Step9 handleBack={handleBack} handleNext={handleNext} rentalApplicationData={rentalApplicationData.step9.data}
          handleApplicationData={handleApplicationData} loading={loading} success={success} />;
    }
  };

  const handleNext = () => {
    const next = activeStep + 1;
    setActiveStep(next);
  };

  const handleBack = () => {
    const back = activeStep - 1;
    setActiveStep(back);
  };

  const handleStep = (index) => {
    setActiveStep(index + 1);
  };

  return (
    <Layout>
      <MetaHandler props={metaDetails} />
      {showStepError.step1 && <Alert color="danger">Please Fill Property Details</Alert>}
      {showStepError.step2 && <Alert color="danger">Please Fill Occupancy</Alert>}
      {showStepError.step3 && <Alert color="danger">Please Fill Agent Questions</Alert>}
      {showStepError.step6 && <Alert color="danger">Please Fill Declaration</Alert>}
      {showStepError.step8 && <Alert color="danger">Please Fill Rental history</Alert>}
      {showStepError.step9 && <Alert color="danger">Please Fill Employment</Alert>}
      <Topsection
        pageTitle="Rental Application Form"
        titleLight
        backgroundImage="/assets/images/rental-application-bg.jpg"
      />
      <div className="section">
        <Container>
          <Row className="justify-content-center">
            <Col md={3}>
              <div className="steps application-form-tab">
                <ul>
                  {steps &&
                    steps.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={activeStep === index + 1 ? "active" : ""}
                          onClick={() => handleStep(index)}
                        >
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Col>
            <Col md={9}>
              <div className="step-content">{getSteps(activeStep)}</div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
