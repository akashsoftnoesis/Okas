import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
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
import Image from "next/image";
import ListingBox from "../../components/Common/ListingBox";
import CustomModal from "../../components/Common/CustomModal";
import AppraisalForm from "../../components/Common/AppraisalForm";
import { useRouter } from "next/router";
import orderBy from "lodash.orderby";
import { ApiGet } from "../../helper/ApiData";
import location from "../../public/assets/images/location-icon.svg";
import officeImg from "../../public/assets/images/office-about-img.jpg";
import AgentBox from "../../components/Common/AgentBox";
import SkeletonAgentBox from "../../components/Common/skeleton/AgentBox";
import SkeletonListingBox from "../../components/Common/skeleton/ListingBox";

export default function Office() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);

  const modalToggle = () => setModal(!modal);

  const [activeTab, setActiveTab] = useState("1");
  const tabToggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    window.scrollBy(0, 1)
  };

  const router = useRouter();
  const { office } = router.query;

  const [agents, setAgents] = useState([]);
  const [saleProperties, setSaleProperties] = useState([]);
  const [leaseProperties, setLeaseProperties] = useState([]);
  const [soldProperties, setSoldProperties] = useState([]);
  const [loadingForSale, setLoadingForSale] = useState(false);
  const [loadingForRent, setLoadingForRent] = useState(false);
  const [loadingForSold, setLoadingForSold] = useState(false);

  useEffect(() => {
    try {
      async function getAgents() {
        const agentsResponse = await ApiGet(
          `agents/list?from=${office === "derrimut" ? 1 : 2}`
        );
        setAgents(
          orderBy(
            agentsResponse.data.data.items,
            [(obj) => obj.agent_priority],
            "asc"
          )
        );
      }
      async function getSaleProperties() {
        setLoadingForSale(true);
        const saleProperties = await ApiGet(
          `properties/sale?from=${office === "derrimut" ? 1 : 2}`
        );
        if (saleProperties.data.data) {
          setLoadingForSale(false);
        }
        setSaleProperties(
          orderBy(
            saleProperties.data.data.items,
            [(obj) => new Date(obj?.publishedToWeb)],
            // [(obj) => new Date(obj?.publishedToWeb || obj?.inserted)],
            "desc"
          )
        );
      }
      async function getLeaseProperties() {
        setLoadingForRent(true);
        const leaseProperties = await ApiGet(
          `properties/lease?from=${office === "derrimut" ? 1 : 2}`
        );
        if (leaseProperties.data.data) {
          setLoadingForRent(false);
        }
        setLeaseProperties(
          orderBy(
            leaseProperties.data.data.items,
            [(obj) => new Date(obj?.inserted)],
            // [(obj) => new Date(obj?.publishedToWeb || obj?.inserted)],
            "desc"
          )
        );
      }
      async function getSoldProperties() {
        setLoadingForSold(true);
        const soldProperties = await ApiGet(
          `properties/sold?from=${office === "derrimut" ? 1 : 2}`
        );
        if (soldProperties.data.data) {
          setLoadingForSold(false);
        }
        setSoldProperties(
          orderBy(
            soldProperties.data.data.items,
            [
              (obj) =>
                new Date(
                  obj?.saleDetails?.unconditional ||
                    obj?.saleDetails?.publishedToWeb ||
                    obj?.inserted
                ),
            ],
            "desc"
          )
        );
      }
      Promise.all([
        getAgents(),
        getSaleProperties(),
        getLeaseProperties(),
        getSoldProperties(),
      ]);
      // getAgents();
    } catch (error) {
      console.log("error", error);
    }
  }, [office]);
  return (
    <Layout>
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
          <AppraisalForm />
        </div>
      </CustomModal>
      <div
        className="office-info-wrap"
        style={{
          backgroundImage: `url(https://livinspaces.net/wp-content/uploads/2020/02/Star-Engineers_Office_Factory_11_Studio-VGA.jpg)`,
        }}
      >
        <Container>
          <Row className="align-items-end">
            <Col md={6}>
              <div className="office-title">
                <h2 className="font2">OKAS PROPERTY GROUP {office}</h2>
                <div className="office-address">
                  <Image
                    width="28"
                    height="20"
                    src={location}
                    alt="location"
                    className="location"
                  />
                  <span>
                    {office === "derrimut"
                      ? "Unit 5, 31 Elgar Road, Derrimut, VIC 3026"
                      : "3/209 Palmers Rd, Truganina VIC 3029"}
                  </span>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="office-info-btn">
                <Button
                  color="primary"
                  className="font2 rounded-0"
                  onClick={modalToggle}
                >
                  {" "}
                  Request an appraisal{" "}
                </Button>
                <Button color="primary" className="font2 rounded-0" onClick={() => {
                  window.open(office === "derrimut" ? "https://goo.gl/maps/sAerJWiBQXr62T2j7" : "https://goo.gl/maps/eJ2dJbEKbRtSMx1t6", "_blank")
                }}>
                  {" "}
                  View on Google Maps{" "}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="office-about">
        <Container>
          <Row>
            <Col md={8}>
              <div className="office-about-info about-me border-0">
                <h3 className="mb-4">WHO WE ARE</h3>
                <p>
                  {`Occupying over 8,000 square feet, perched over 1,100 feet in the air with absolutely breathtaking panoramic 360-degree views of all of New York City and the surrounding tri-state area, The 82nd Floor at 432 Park Avenue has been completely reimagined by one of the most sought-after design houses in London and represents an utterly unique opportunity to own a globally significant property. Occupying over 8,000 square feet, perched over 1,100 feet in the air with absolutely breathtaking panoramic 360-degree views of all of New York City and the surrounding tri-state area, The 82nd Floor at 432 Park Avenue has been completely reimagined by one of the most sought-after design houses in London and represents an utterly unique opportunity to own a globally significant property.`}{" "}
                </p>
                <p>{`The residence is comprised of 5 bedrooms, 2 master bathrooms, 4 on-suite guest bathrooms, 2 powder rooms, 2 offices, 2 dressing rooms, a media room, an oversized eat-in gourmet chef's kitchen, and a sprawling 1,100 square-foot Great Room perfectly situated in the prime southwest corner of the floor.`}</p>
              </div>
            </Col>
            <Col md={4}>
              <div
                className="office-image h-100"
                style={{ backgroundImage: `url(${officeImg.src})` }}
              ></div>
            </Col>
          </Row>
        </Container>
      </div> */}
      <div className="section bg-gray-100 pb-0">
        <Container>
          <Row>
            <Col md={12}>
              <h3 className="text-center font2 mb-4 pb-3">Our Agents</h3>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {!agents.length ? (
                <ul className="agents-list">
                  <SkeletonAgentBox count={10} />
                </ul>
              ) : (
                <ul className="agents-list">
                  {agents.map((agent) => {
                    return (
                      <li className="mb-4" key={agent.id}>
                        <AgentBox agent={agent} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="my-listing">
                <div className="about-me border-0 p-0">
                  <h3 className="mb-0">Our Latest Properties</h3>
                </div>
                <Nav tabs className="custom-tab">
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
                  </NavItem>
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
                  </NavItem>
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
                  </NavItem>
                </Nav>
              </div>
              <TabContent className="banner-tab-content" activeTab={activeTab}>
                <TabPane tabId="1">
                  {loadingForSale ? (
                    <Row>
                      <SkeletonListingBox count={4} grid={3} />
                    </Row>
                  ) : (
                    <Row>
                      {saleProperties?.length ? (
                        <ListingBox
                          propertiesSaleData={saleProperties}
                          category="sale"
                          displayRecord={500}
                          grid={3}
                        />
                      ) : (
                        <p className="not-linked font2 mt-4 mx-auto">
                          {office} office does not have any listed properties
                          for sale.
                        </p>
                      )}
                    </Row>
                  )}
                </TabPane>
                <TabPane tabId="2">
                  {loadingForRent ? (
                    <Row>
                      <SkeletonListingBox count={4} grid={3} />
                    </Row>
                  ) : (
                    <Row>
                      {leaseProperties?.length ? (
                        <ListingBox
                          propertiesSaleData={leaseProperties}
                          rent={true}
                          category="lease"
                          displayRecord={500}
                          grid={3}
                        />
                      ) : (
                        <p className="not-linked font2 mt-4 mx-auto">
                          {office} office does not have any listed properties
                          for rent.
                        </p>
                      )}
                    </Row>
                  )}
                </TabPane>
                <TabPane tabId="3">
                  {loadingForSold ? (
                    <Row>
                      <SkeletonListingBox count={4} grid={3} />
                    </Row>
                  ) : (
                    <Row>
                      {soldProperties?.length ? (
                        <ListingBox
                          propertiesSaleData={soldProperties}
                          category="sold"
                          displayRecord={500}
                          grid={3}
                        />
                      ) : (
                        <p className="not-linked font2 mt-4 mx-auto">
                          {office} office does not sold any property recently.
                        </p>
                      )}
                    </Row>
                  )}
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
