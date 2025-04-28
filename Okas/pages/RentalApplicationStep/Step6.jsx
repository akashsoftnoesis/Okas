import { FormGroup, Label, Row, Button, Input, Col } from "reactstrap";
import { useEffect, useState } from "react";

export default function Step6({ handleNext, handleBack, handleApplicationData, rentalApplicationData }) {

  const [checkDetails, setCheckDetails] = useState({
    tenacystatement: { check: false, error: '' },
    nationaltenacystatement: { check: false, error: '' },
    connationservice: { check: false, error: '' },
  })

  useEffect(() => {
    if(Object.keys(rentalApplicationData).length) setCheckDetails(rentalApplicationData);
  }, [rentalApplicationData])

  const validateForm = () => {
    if (!checkDetails.tenacystatement.check) return 'tenacystatement'
    if (!checkDetails.nationaltenacystatement.check) return 'nationaltenacystatement'
    if (!checkDetails.connationservice.check) return 'connationservice'
  }

  const onSubmit = () => {
    const notValidForm = validateForm();
    if (notValidForm) {
      setCheckDetails({
        ...checkDetails,
        [notValidForm]: { ...checkDetails[notValidForm], error: 'Accept Terms & conditions' }
      })
      return true
    }
    handleNext();
    handleApplicationData('step6', checkDetails, true);
  }

  const handleGoBack = () => {
    handleBack();
  };

  const checkHandler = e => {
    setCheckDetails({
      ...checkDetails,
      [e.target.name]: { check: e.target.checked, error: '' }
    })
  };

  return (
    <form>
      <div className="form-section">
        <h3 className="mb-4">Declaration</h3>
        <div>
          <h5>Tenancy Disclosure Statement</h5>
          <p>The information on this form is being collected by Okas Property Group Pty Ltd. It is a condition of
            application for tenancy that you consent to the collection and use of your personal information by Okas
            Property Group Pty Ltd. We require this information so that we may consider your application to
            tenant/lease a property. We may provide any or information provided to us by any party to any third‐party
            including landlords, landlord agents and solicitors and various government or statutory authorities in the
            interests of openness and transparency between all parties concerned. We may also contact personal and
            credit referees you nominate and exchange personal information according to normal commercial practice.
            Your personal information will be added to our database and may be used for the secondary purpose of
            providing you with further information about properties and services offered by Okas Property Group Pty
            Ltd. It is your responsibility to ensure information you provide is correct at all times.</p>
          <FormGroup check className="mb-4">
            <Input
              type="checkbox"
              name="tenacystatement"
              id="tenacystatement"
              onChange={checkHandler}
              checked={checkDetails.tenacystatement?.check}
            />
            <Label for="tenacystatement" check>
              <p>
                {`I Accept Tenancy Disclosure Statement`}
              </p>
              {checkDetails.tenacystatement?.error && <small className="text-danger ml-1">{checkDetails.tenacystatement?.error}</small>}
            </Label>
          </FormGroup>
        </div>
        <div>
          <h5>National Tenancy Database Disclosure Statement</h5>
          <p>You can contact the National Tenancy Database Pty Ltd, ABN 26 000 602 862 by means of;</p>
          <div>
            <Row>
              <Col md={6}>
                <p>Address: P.O Box 1321650 George St, Brisbane QLD 4003</p>
              </Col>
              <Col md={6}>
                <p>Phone: 03 8629 1608</p>
              </Col>
              <Col md={6}>
                <p>Website: www.ntd.net.au</p>
              </Col>
              <Col md={6}>
                <p>Fax: 03 8629 1650</p>
              </Col>
            </Row>
          </div>
          <div>
            <p className="mb-2">
              Primary Purpose ‐ NTD collects your personal information to provide its members and others listed below, historical
              tenancy and public record information on individuals and companies who/which lease residential and commercial
              property from or through licensed real estate agent members of NTD. NTD also provides credit information on
              companies/directors applying for commercial leases. The real estate/property manager will advise NTD of your
              conduct throughout the lease/tenancy, and the information will form part of your tenant history.
            </p>
          </div>
          <div>
            <p>NTD usually disclosed information to:</p>
            <ul className="national-tenancy-ul mb-2">
              <li>Licensed real estate agent members</li>
              <li>NTD’s parent company, collection house limited</li>
              <li>Credit bureaus</li>
            </ul>
          </div>
          <div>
            <p>If your personal information is not provided o NTD the real estate agent/property manager will not be able to carry
              out their professional responsibilities and will not be able to provide you with a lease/tenancy of the premises.</p>
          </div>
          <FormGroup check className="mb-4">
            <Input
              type="checkbox"
              name="nationaltenacystatement"
              id="nationaltenacystatement"
              onChange={checkHandler}
              checked={checkDetails.nationaltenacystatement?.check}
            />
            <Label for="nationaltenacystatement" check>
              <p>
                {`I Accept National Tenancy Database Disclosure Statement`}
              </p>
              {checkDetails.nationaltenacystatement?.error && <small className="text-danger ml-1">{checkDetails.nationaltenacystatement?.error}</small>}
            </Label>
          </FormGroup>
        </div>
        <div className="mb-4">
          <h5>Declaration Statement</h5>
          <div>
            <p>I acknowledge that;</p>
            <ul className="national-tenancy-ul mb-2">
              <li>{`This an application to lease this property and that my application is subject to the owner's approval and the
                  availability of the premises on the due date. No action will be taken against the landlord or agent if the
                  application is unsuccessful or should the premises not be available for occupation on the due date for
                  whatever reason; and`}</li>
              <li>{` I am responsible for connection and payment of gas, electricity, telephone and water consumption. I
                  acknowledge that I am responsible to turn the main power switch off before power is connected. Okas
                  Property Group Pty Ltd cannot confirm that any telephone line to the property is operable or able to be
                  reconnected. It is the tenant's responsibility to check with the telephone provided to confirm the line
                  arrangements and pay for line connection; and`}</li>
              <li>{`That the premises are a ‘Smoke Free Zone’ and will ensure that they and their invitees do not smoke inside
                  the premises.`}</li>
            </ul>
          </div>
        </div>
        <div className="mb-3">
          <h5>Utility Connection Services</h5>
          <div>
            <p>Connect now, call 1300 889 598 or visit www.connectnow.com.au</p>
            <p>Connect now is dedicated to helping you move home more easily. We can connect our utilities including electricity,
              gas, phone, internet and pay TV to a broad choice of leading provides. We can also organise your disconnection and
              offer a range of additional services, such as cleaning and food services, revivalists and vehicle hire. It’s a free service,
              standard service provider connection fees and charges still apply.</p>
            <p>By signing this form, you consent and agree to the following – Connect now Pty Ltd, ABN 79 097 398 682, will collect, use and
              disclose your personal information to contact you about providing moving, connection and disconnection services and to inform you about
              products and services offered by its related companies and third party suppliers. These other companies may also use your details to contact
              you directly about their products and services, see connect now’s privacy policy for further details, including your rights to access and correct
              the information held about you at www.connectnow.com.au. Third part service providers, who may transfer your data overseas, may have
              their own privacy policy which you can request from them. You consent to connect now to continuing to market to you unless you opt out,
              including by emailing privacy@connectnow.com.au. To the extent permitted by law, connect now is not responsible or liable for delayed or
              failed connections or the service providers connection charges which you must pay to them directly. Connect now may be a fee by service
              providers and may pay a fee to real estate agents relating to services provided to you. If you nominate an alternative contact person on this
              application, you authorise them to act on your behalf to arrange moving, connect and disconnection services, including accepting third party
              terms. You warrant that you are authorised to make this application on behalf of all applications and alternative contact persons listed and
              that each person has consented and agreed to the handling of their personal information on the same terms as you have.</p>
          </div>
          <FormGroup check className="mb-4">
            <Input
              type="checkbox"
              name="connationservice"
              id="connationservice"
              onChange={checkHandler}
              checked={checkDetails.connationservice?.check}
            />
            <Label for="connationservice" check>
              <p>
                {`Yes, I accept the terms. Please call me to connect my new home services`}
              </p>
              {checkDetails.connationservice?.error && <small className="text-danger ml-1">{checkDetails.connationservice?.error}</small>}
            </Label>
          </FormGroup>
        </div>
        {/* <FormGroup>
          <h5>
            <em>{`vishwas dhanani`}</em>
          </h5>
        </FormGroup>
        <FormGroup check className="mb-4">
          <Input
            type="checkbox"
            name="check"
            id="exampleCheck"
            onChange={checkHandler}
          />
          <Label for="exampleCheck" check>
            <p>
              {`I acknowledge that I have Read, Understood and Agree with the above
            Tenancy Privacy Statement / Collection Notice & Tenant Declaration
            and I authorise the use of the image above to represent my digital
            signature for the purpose of this application`}
            </p>
            {errors?.check?.message && <small className="text-danger ml-1">{errors.check.message}</small>}
          </Label>
        </FormGroup> */}
        {/* <h5>{`Tenancy database`}</h5>
        <FormGroup>
          <p>
            <small>
              {`The agent/manager may utilise any of the following residential
            tenancy database companies to check the tenancy history of
            applicants. If you wish to contact these organisations, their
            details are below:`}
            </small>
          </p>
        </FormGroup>
        <div className="tenancy_database_notification">
          <FormGroup>
            <p className="tenancy_database-title">
              {`Equifax’s National Tenancy Database`}
            </p>
            <p>{`www.tenancydatabase.com.au`}</p>
            <p>{`1300 563 826`}</p>
          </FormGroup>
          <FormGroup>
            <p className="tenancy_database-title">TICA</p>
            <p>{`www.tica.com.au`}</p>
            <p>1902 220 346</p>
          </FormGroup>
          <FormGroup>
            <p className="tenancy_database-title">RP DATA</p>
            <p>{`www.rpdata.com`}</p>
            <p>1300 734 318</p>
          </FormGroup>
          <FormGroup>
            <p className="tenancy_database-title">BARCLAY MIS</p>
            <p>{`www.barclaymis.com.au`}</p>
            <p>1300 883 916</p>
          </FormGroup>
          <FormGroup>
            <p className="tenancy_database-title">TRA</p>
            <p>{`www.tradingreference.com`}</p>
            <p>02 9363 9244</p>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" name="check" id="notice" />
            <Label for="notice" check>
              <p>{`I confirm that I have been notified of the tenancy database contact details & the reasons for use.`}</p>
            </Label>
          </FormGroup>
        </div> */}
        <div className="step-btn">
          <Button color="secondary" onClick={handleGoBack} >
            Back
          </Button>
          <Button color="secondary ml-auto" onClick={onSubmit} >
            Save & Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
