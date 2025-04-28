import { Col, Row, Container } from "reactstrap";
import Layout from "../components/Layout";
import Topsection from "../components/Common/Topsection";


export default function TermsAndCondition() {
    return (
        <Layout>
            <Topsection titleLight pageTitle="Terms And Conditions" backgroundImage="/assets/images/policy-bg.jpg" />
            <div className="section properties-wrap">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div className="terms-and-condition">
                                <h4 className="font2 mb-4">Privacy &amp; Tenant Declaration</h4>

                                <h5 className="font2">1. Privacy - 1form</h5>

                                <p><strong>Current application:</strong> 1form collects the information you have entered into our system and discloses it to the real estate agent/manager (or their inspection scheduling service provider) for the current application (and may so the same for future applications).</p>

                                <p><strong>Future applications: </strong>1form may also use your personal information to promote the services of 1form, its related parties and selected third parties.</p>

                                <p><strong>Other use(s) and disclosure(s):</strong> {`1form's`} Collection Statement and Privacy Policy further explains how 1form collects, uses and discloses personal information and how to access, correct or complain about the handling of personal information.</p>

                                <h5 className="font2">2. Privacy - agent/manager</h5>

                                <p><strong>Assessing your application:</strong>The personal information received by the agent/manager may be used for the purposes of identifying you and assessing your application.</p>

                                <p><strong>Other use(s) and disclosure(s): </strong> The agent/ manager may also use or disclose your personal information to: </p>

                                <ul>
                                    <li>(a) assess your application information (e.g. contacting the landlord, your referees, etc.);</li>
                                    <li>(b) assess your tenancy history (e.g. contacting bond authorities, financial institutions, tenancy databases, etc.);</li>
                                    <li>(c) schedule your inspections (e.g. contacting scheduling providers);</li>
                                    <li>(d) document and register your lease (e.g. contacting lawyers, tenancy databases, real estate institutes, etc.);</li>
                                    <li>(e) help you move in and get connected (e.g. contacting tradespeople, connections services, utilities providers, etc.); and</li>
                                    <li>(f) perform other services or activities.</li>
                                </ul>

                                <p> <strong>Agent/manager privacy policy:</strong> The agent/manager may have its own privacy policy. You may request this from the agent/manager directly.</p>

                                <p><strong>1form does not control the agent/manager or third parties: </strong> The agent/manager is separate from 1form, so 1form cannot and does not control the {`agent's/manager's`} processes or actions. Likewise, 1form and the agent/manager do not control third parties who may receive information.</p>
                                
                                <p><strong>Contacting the agent/manager: </strong> If you have any query, concern or special requirements about how the agent/manager will use or disclose your personal information (or how it has used or disclosed your personal information), you should contact the agent/manager directly. You should also contact the agent/manager directly if you wish to access, correct or delete the information held by them.</p>

                                <p><strong>Limiting use of your personal information:</strong> You can ask to limit how your information is used and/or disclosed. If your personal information is not provided to the agent/manager and/or you do not consent to the use of your personal information as specified above, the agent/manager may not be able to assist you with your application.</p>

                                <h5 className="font2">3. Your declaration</h5>

                                <p>By submitting your application, you acknowledge and agree that:</p>

                                <p>(a) (<strong>{`you are applying for the Property`}</strong>) you are applying to lease the property listed on the application (Property) and you offer to rent the Property under a lease or rental agreement prepared on behalf of the Property owner;</p>

                                <p>(b) (<strong>{`you've told the truth`}</strong>) everything you have said and submitted in the application is true and up to date and you have not omitted any detail that might be relevant to assessing the application;</p>

                                <p>(c) (<strong>{`the truth is important`}</strong>) the agent/manager and Property owner rely on you telling the truth;</p>

                                <p>(d) (<strong>{`it's the Property owner's call`}</strong>) your applicationis subject to the Property {`owner's`} approval and the availability of the Property;</p>

                                <p>(e) (<strong>others named in the application have consented</strong>) where you have provided information identifying another person in this application, that person consents to the information being submitted;</p>

                                <p>(f) (<strong>the application may take time</strong>) it may take time to process your application (two business days or more);</p>

                                <p>(g) (<strong>you understand the rental agreement</strong>) you have been given an opportunity to review the lease or rental agreement and get advice or ask a question about any issue or aspect that you do not understand;</p>

                                <p>(h) (<strong>you will pay the rent and bond</strong>) you are able to pay the advertised rent and bond for the Property and will be able to do so for the life of the rental agreement;</p>
                                
                                <p>(i) (<strong>defaults will have consequences</strong>) if you default under a rental agreement, the agent/manager may (subject to the law) terminate the lease and may disclose details of any such default to any person whom the agent/manager reasonably considers has an interest in receiving such information;</p>

                                <p>(j) (<strong>1form is not the agent/manager</strong>) you acknowledge that 1form does not and cannot control the agent or property manager and you will not hold 1form responsible for actions or omissions outside {`1form's`} control; and</p>

                                <p>(k) (<strong>{`you've`} double checked key details</strong>) you have reviewed, checked and approved the email address of the agent/manager;</p>

                                <p>(l) (<strong>you authorise 1form to send the application</strong>) you authorise 1form to send the application and its contents as described by 1form.</p>

                                <h5>4. Tenancy Database</h5>

                                <p>The agent/manager may utilise any of the following residential tenancy database companies to check the tenancy history of applicants. If you wish to contact these organisations, their details are below:</p>

                                <table>
                                    <tbody>
                                        <tr>
                                            <td>{`Equifax's`} National Tenancy Database</td>
                                            <td>1300 563 826</td>
                                            <td>
                                                <a target="_blank" rel="noreferrer" href="http://www.tenancydatabase.com.au">
                                                    www.tenancydatabase.com.au
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TICA</td>
                                            <td>1902 220 346</td>
                                            <td>
                                                <a target="_blank" rel="noreferrer" href="http://www.tica.com.au">
                                                    www.tica.com.au
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>RP DATA</td>
                                            <td>1300 734 318</td>
                                            <td>
                                                <a target="_blank" rel="noreferrer" href="http://www.rpdata.com">
                                                    www.rpdata.com
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>BARCLAY MIS</td>
                                            <td>1300 883 916</td>
                                            <td>
                                                <a target="_blank" rel="noreferrer" href="http://www.barclaymis.com.au">
                                                    www.barclaymis.com.au
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TRA</td>
                                            <td>02 9363 9244</td>
                                            <td>
                                                <a target="_blank" rel="noreferrer" href="http://www.tradingreference.com">
                                                    www.tradingreference.com
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p>I acknowledge that I have chosen of my own free will to send my application to the agent/landlord/property manager listed in this application and their associated principals, agents and employees. I also acknowledge that I have reviewed, checked and approved the email address of the intended recipient being the agent/landlord/property manager and their associated principals, agents and employees and authorise 1form.com to send all of the details contained in this
                                   application, including any documents that I attach, to this email address for the purposes of making an application for tenancy. I acknowledge that once the information contained in this application has been sent to this email address, that 1form.com in no circumstance
                                   shall be liable for any damages arising out of or in any way connected with the manner in which this information is used. I also acknowledge that in no circumstance shall 1form.com be liable for any damages arising out of or in any way connected with my use of 1form.com and
                                   its associated websites.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}
