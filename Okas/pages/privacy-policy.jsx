import { Col, Row, Container } from "reactstrap";
import Layout from "../components/Layout";
import Topsection from "../components/Common/Topsection";


export default function PrivacyPolicy() {
    return (
        <Layout>
            <Topsection titleLight pageTitle="Privacy Policy" backgroundImage="/assets/images/policy-bg.jpg" />
            <div className="section properties-wrap">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div className="privacy-policy">
                                {/* <h4 className="font2">Privacy Policy for Okas Property Group</h4> */}

                                <p><b className="bold">OKAS Real Estate</b> is committed to providing quality services to you and this policy outlines our ongoing obligations to you in respect of how we manage your Personal Information.</p>

                                <p>We have adopted the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth) (the Privacy Act). The NPPs govern the way in which we collect, use, disclose, store, secure and dispose of your Personal Information.</p>

                                <p>A copy of the Australian Privacy Principles may be obtained from the website of The Office of the Australian Information Commissioner at www.aoic.gov.au</p>

                                <h4 className="font2"><b>What is Personal Information and why do we collect it?</b></h4>

                                <p>Personal Information is information or an opinion that identifies an individual. Examples of Personal Information we collect include: names, addresses, email addresses, phone and facsimile numbers.</p>

                                <p>This Personal Information is obtained in many ways including <b className="bold"> interviews, correspondence, by telephone and facsimile, by email, via our website www.yourbusinessname.com.au, from your website, from media and publications, from other publicly available sources, from cookies- delete all that aren’t applicable</b> and from third parties. We don’t guarantee website links or policy of authorised third parties.</p>

                                <p>
                                    We collect your Personal Information for the primary purpose of providing our services to you, providing information to our clients and marketing. We may also use your Personal Information for secondary purposes closely related to the primary purpose, in circumstances where you would reasonably expect such use or disclosure. You may unsubscribe from our mailing/marketing lists at any time by contacting us in writing.
                                </p>
                                <p>
                                    When we collect Personal Information we will, where appropriate and where possible, explain to you why we are collecting the information and how we plan to use it.
                                </p>

                                <h4 className="font2"><b>Sensitive Information</b></h4>

                                <p>Sensitive information is defined in the Privacy Act to include information or opinion about such things as an individual's racial or ethnic origin, political opinions, membership of a political association, religious or philosophical beliefs, membership of a trade union or other professional body, criminal record or health information.</p>

                                <p>Sensitive information will be used by us only:</p>
                                <ul>
                                    <li>For the primary purpose for which it was obtained</li>
                                    <li>For a secondary purpose that is directly related to the primary purpose</li>
                                    <li>With your consent; or where required or authorised by law.</li>
                                </ul>

                                <h4 className="font2"><b>Third Parties</b></h4>

                                <p>Where reasonable and practicable to do so, we will collect your Personal Information only from you. However, in some circumstances we may be provided with information by third parties. In such a case we will take reasonable steps to ensure that you are made aware of the information provided to us by the third party.</p>

                                <ul>
                                    <li>Third parties where you consent to the use or disclosure; and</li>
                                    <li>Where required or authorised by law.</li>
                                </ul>
                                <h4 className="font2"><b>Security of Personal Information</b></h4>

                                <p>Your Personal Information is stored in a manner that reasonably protects it from misuse and loss and from unauthorized access, modification or disclosure.</p>

                                <p>When your Personal Information is no longer needed for the purpose for which it was obtained, we will take reasonable steps to destroy or permanently de-identify your Personal Information. However, most of the Personal Information is or will be stored in client files which will be kept by us for a minimum of 7 years.</p>

                                <h4 className="font2"><b>Access to your Personal Information</b></h4>

                                <p>You may access the Personal Information we hold about you and to update and/or correct it, subject to certain exceptions. If you wish to access your Personal Information, please contact us in writing.</p>
                                <p><b className="bold">OKAS Real Estate</b> will not charge any fee for your access request, but may charge an administrative fee for providing a copy of your Personal Information.</p>
                                <p>In order to protect your Personal Information, we may require identification from you before releasing the requested information.</p>

                                <h4 className="font2"><b>Maintaining the Quality of your Personal Information</b></h4>

                                <p>It is an important to us that your Personal Information is up to date. We  will  take reasonable steps to make sure that your Personal Information is accurate, complete and up-to-date. If you find that the information we have is not up to date or is inaccurate, please advise us as soon as practicable so we can update our records and ensure we can continue to provide quality services to you.</p>

                                <h4 className="font2"><b>Policy Updates</b></h4>

                                <p>This Policy may change from time to time and is available on our website.</p>

                                <h4 className="font2"><b>Privacy Policy Complaints and Enquiries</b></h4>

                                <p>If you have any queries or complaints about our Privacy Policy please contact us at:</p>
                                <p>Request that a business that collects a consumer&apos;s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
                                <p>Request that a business delete any personal data about the consumer that a business has collected.</p>
                                <p>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data.</p>
                                <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

                                <h4 className="font2"><b>GDPR Data Protection Rights</b></h4>
                                <p className="space"><b className="bold">OKAS Real Estate</b></p>
                                <p className="space"><b className="bold"><a className="bold" href="tel:+61370386527">03 7038 6527</a></b></p>
                                <p className="space"><b className="bold"><a className="bold" href="mailto:info@okasre.com.au">info@okasre.com.au</a></b></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}
