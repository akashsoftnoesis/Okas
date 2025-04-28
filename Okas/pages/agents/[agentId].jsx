import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import Link from "next/link";
import dynamic from "next/dynamic";
import ListingBox from "../../components/Common/ListingBox";
import SkeletonListBox from "../../components/Common/skeleton/ListingBox";
import CustomModal from "../../components/Common/CustomModal";
import AppraisalForm from "../../components/Common/AppraisalForm";
import { useRouter } from "next/router";
import { ApiGet } from "../../helper/ApiData";
import { saveAs } from "file-saver";
import { orderBy } from "lodash";
const QRCode = dynamic(() => import("qrcode.react"), {
  ssr: false,
});

function Listingsingle({ agentRes }) {
  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal);
  const [activeTab, setActiveTab] = useState("1");
  const tabToggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    window.scrollBy(0, 1)
  };
  const [agentData, setAgentData] = useState({});
  const router = useRouter();
  const { agentId: agentIdCombined } = router.query;
  const [agentId] = (agentIdCombined || "").split("-");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchAgentData = async (id) => {
  //     setLoading(true);
  //     try {
  //       const agentRes = await ApiGet(`agents/single/${id}`);
  //       setAgentData(agentRes.data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //     }
  //   };
  //   if (agentId) {
  //     fetchAgentData(agentId);
  //   }
  // }, [agentId]);
  
  useEffect(() => {
    setAgentData({});
    if (agentRes) {
      setAgentData(agentRes);
    }
  }, [agentRes, agentId]);

  const mobileNumberObj = agentData?.phoneNumbers?.find(
    (obj) => obj.typeCode === "M"
  );

  const downloadContact = () => {
    const blob = new Blob([agentData.vCard], {
      type: "text/vcard;charset=utf-8",
    });
    const fileName = `${agentData?.firstName} ${agentData?.lastName}| OKAS Property group.vcf`;
    saveAs(blob, fileName);
  };

  const fullUrl = (typeof window !== "undefined" && window.location.href) || null;

  const saleData = orderBy(agentData?.saleProperties, [(obj) => new Date(obj?.publishedToWeb)], "desc") || []
  const leaseData = orderBy(agentData?.leaseProperties, [(obj) => new Date(obj?.inserted)], "desc") || []
  const soldData = orderBy(agentData?.soldProperties, [
    (obj) =>
      new Date(
        obj?.saleDetails?.unconditional ||
          obj?.saleDetails?.publishedToWeb ||
          obj?.inserted
      ),
], "desc") || []

let firstName =  agentData?.firstName ? agentData.firstName.charAt(0)+agentData.firstName.slice(1) : '';
let lastName =  agentData?.lastName ? agentData.lastName.charAt(0)+agentData.lastName.slice(1) : ''; 
let position = agentData?.position ? agentData.position : '';
const title = firstName +' '+ lastName + ' - ' + position + ' - Okas Property Group' ;

console.log('agentData',agentData)

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta
          property="og:title"
          content={title}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta
          property="og:description"
          content={agentData?.description}
        />
        <meta
          property="og:image"
          content={agentData?.photo?.thumb_360}
        />
      </Head>
      <CustomModal
        className="appraisal-modal"
        fade
        isOpen={modal}
        toggle={modalToggle}
        size="lg"
        heading="Request an Appraisal"
        subHeading="OKAS PROPERTY GROUP"
      >
        <div className="appraisal-content">
          <AppraisalForm agentEmail={agentData?.email}/>
        </div>
      </CustomModal>
      <div className="agent-info-wrap">
        <Row noGutters>
          <Col md={6}>
            <div
              className="agent-signle-img"
              style={{ backgroundImage: `url(${agentData?.photo?.original})` }}
            >
              {/* <Image width="960" height="700" src={listingImg} alt="" /> */}
            </div>
          </Col>
          <Col md={6}>
            <div className="single-list-info">
              <div className="single-agent-info">
                <div className="user-detail">
                  <h3>
                    <span>{(agentData?.firstName)?.charAt(0)}</span>{(agentData?.firstName)?.slice(1)} {agentData?.lastName}
                  </h3>
                  {agentData?.position && (
                    <p className="font2 text-uppercase">
                      <span>{agentData?.position}</span>{" "}
                      {/* {agentData?.agency} */}
                    </p>
                  )}
                </div>
                <div>
                  <ul className="social-icon mb-3">
                    {
                      agentData?.facebook_url ?
                        <li>
                          <Link passHref target="_blank" href={agentData?.facebook_url}>
                            <i className="ion-social-facebook" aria-hidden="true"></i>
                          </Link>
                        </li> : null
                    }
                    {
                      agentData?.linkedIn_url ?
                        <li>
                          <Link passHref target="_blank" href={agentData?.linkedIn_url} >
                            <i className="ion-social-linkedin" aria-hidden="true"></i>
                          </Link>
                        </li> : null
                    }
                    {
                      agentData?.instagram_url ?
                        <li>
                          <Link passHref target="_blank" href={agentData?.instagram_url}>
                            <i className="ion-social-instagram" aria-hidden="true"></i>
                          </Link>
                        </li> : null
                    }
                  </ul>
                  <ul>
                    {mobileNumberObj?.number && (
                      <li key="mobile_number">
                        <div className="font2">Mobile:</div>{" "}
                        <p> {mobileNumberObj?.number}</p>{" "}
                      </li>
                    )}
                    {agentData?.agency && (
                      <li key="office_number">
                        <div className="font2">Office:</div>{" "}
                        <p>
                          {" "}
                          {agentData?.agency === "Derrimut"
                            ? "03 8390 0699"
                            : "03 7038 6527"}
                        </p>{" "}
                      </li>
                    )}
                    {agentData?.email && (
                      <li key="email">
                        <div className="font2">Email:</div>{" "}
                        <p> {agentData?.email}</p>{" "}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="d-flex mt-4 mb-5">
                  <Button
                  style={{border:"none"}}
                    color="primary"
                    className="font2 rounded-0"
                    onClick={modalToggle}
                  >
                    Request an appraisal
                  </Button>
                </div>
                <div className="agent-qr-code-box">
                  <div className="agent-qr-code">
                    {agentData?.vCard ? <QRCode value={agentData.vCard} /> : ""}
                  </div>
                  <div className="scan-box">
                    <div className="font2 mb-3 text-white d-flex align-items-center"><span className="arrow">→</span><span>Scan this QR code, or</span></div>
                    <Button
                      color="primary"
                      className="font2 rounded-0"
                      style={{border:"none"}}
                      onClick={downloadContact}
                    >
                      Download Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="section agent-about">
        <Container>
          <Row>
            <Col xs={12} md={8} className="agent-head">
              {
                agentData?.description ?
                  <div className="about-me mb-4 border-0 pt-0 text-center">
                    <h3 className="mb-4">
                      {" "}
                      About {agentData?.firstName} {agentData?.lastName}{" "}
                    </h3>
                    <p>
                      {
                        agentData?.description
                      }
                    </p>
                  </div> : null
              }
            </Col>
          </Row>
          {/* <Row>
            <Col xs={12}>
              {agentData?.vCard ? <QRCode value={agentData.vCard} /> : ""}
            </Col>
          </Row> */}
        </Container>
      </div>
      {
        agentData?.saleProperties?.length || agentData?.soldProperties?.length || agentData?.leaseProperties?.length ?
          <div className="section bg-gray-100">
            <Container>
              <Row>
                <Col xs={12}>
                  <div className="my-listing">
                    <div className="about-me border-0 p-0">
                      <h3 className="mb-0">
                        {" "}
                        {agentData?.firstName}&apos;s Latest Properties{" "}
                      </h3>
                    </div>
                    <Nav tabs className="custom-tab">
                      {
                        agentData?.saleProperties?.length ?
                          <NavItem>
                            <NavLink
                              className={classnames(
                                { active: activeTab === "1" },
                                "font2"
                              )}
                              onClick={() => {
                                tabToggle("1");
                              }}
                            >
                              For Sale
                            </NavLink>
                          </NavItem> : null
                      }
                      {
                        agentData?.leaseProperties?.length ?
                          <NavItem>
                            <NavLink
                              className={classnames(
                                { active: activeTab === "2" },
                                "font2"
                              )}
                              onClick={() => {
                                tabToggle("2");
                              }}
                            >
                              For Rent
                            </NavLink>
                          </NavItem> : null
                      }
                      {
                        agentData?.soldProperties?.length ?
                          <NavItem>
                            <NavLink
                              className={classnames(
                                { active: activeTab === "3" },
                                "font2"
                              )}
                              onClick={() => {
                                tabToggle("3");
                              }}
                            >
                              Recently Sold
                            </NavLink>
                          </NavItem> : null
                      }

                    </Nav>
                  </div>
                  <TabContent className="banner-tab-content" activeTab={activeTab}>
                    <TabPane tabId="1">
                      {loading ? (
                        <Row>
                          <SkeletonListBox count={8} grid={3} />
                        </Row>
                      ) : (
                        <Row>
                          {saleData?.length ? (
                            <ListingBox
                              propertiesSaleData={saleData}
                              category="sale"
                              displayRecord={100}
                              grid={3}
                            />
                          ) : (
                            <Col md={12}>
                              <p className="not-linked font2 mt-4">
                                {agentData?.firstName} {agentData?.lastName} is not
                                linked to any sale listings at this time.
                              </p>
                            </Col>
                          )}
                        </Row>
                      )}
                    </TabPane>
                    <TabPane tabId="2">
                      {loading ? (
                        <Row>
                          <SkeletonListBox count={4} grid={3} />
                        </Row>
                      ) : (
                        <Row>
                          {leaseData?.length ? (
                            <ListingBox
                              propertiesSaleData={leaseData}
                              rent={true}
                              category="lease"
                              displayRecord={100}
                              grid={3}
                            />
                          ) : (
                            <Col md={12}>
                              <p className="not-linked font2 mt-4">
                                {agentData?.firstName} {agentData?.lastName} is not
                                linked to any rent listings at this time.
                              </p>
                            </Col>
                          )}
                        </Row>
                      )}
                    </TabPane>
                    <TabPane tabId="3">
                      {loading ? (
                        <Row>
                          <SkeletonListBox count={8} grid={3} />
                        </Row>
                      ) : (
                        <Row>
                          {soldData?.length ? (
                            <ListingBox
                              propertiesSaleData={soldData}
                              category="sold"
                              displayRecord={100}
                              grid={3}
                            />
                          ) : (
                            <Col md={12}>
                              <p className="not-linked font2 mt-4">
                                {agentData?.firstName} {agentData?.lastName} is not
                                linked to any sold listings at this time.
                              </p>
                            </Col>
                          )}
                        </Row>
                      )}
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Container>
          </div> : null
      }
    </Layout>
  );
}

export const getStaticPaths = async () => {
  let agentList = [];
  try {
    const ApiGet = require("../../helper/ApiData").ApiGet;
    const response = await ApiGet("agents/records");
    agentList = response.data.data;
  } catch (error) {
    console.log("Error");
  }
  return {
    fallback: true,
    paths: agentList.map(
      ({ id, firstName, lastName }) => {
        const idCombined = `${id}-${firstName}-${lastName}`;
        return {
          params: {
            agentId: idCombined,
          },
        };
      }
    ),
  };
};

export const getStaticProps = async ({ params }) => {
  const { agentId: id } = params;
  const [ agentId ] = id.split("-");
  try {
    const response = await ApiGet(`agents/single/${agentId}`);
    return {
      props: {
        agentRes : response?.data?.data || [],
      },
      revalidate: 60 * 20,
    };
  } catch (error) {
    return {
      props: {
        agentRes: null,
      },
      revalidate: 60 * 20,
    };
  }
};

export default Listingsingle;
