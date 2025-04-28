import { memo, useEffect, useState } from "react";
import { Col,Container,Row } from "reactstrap";
import OfficesBox from "../components/Common/OfficesBox";
import Topsection from "../components/Common/Topsection";
import Widget from "../components/Common/Widget";
import Layout from "../components/Layout";
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";
import officeImage1 from "../public/assets/images/office1.jpg";
import officeImage2 from "../public/assets/images/office2.jpg";

const office = [
  {
    image: officeImage1,
    title: "Derrimut",
    address: "Unit 5, 31 Elgar Road, Derrimut, VIC 3026",
    phone: "03 8390 0699",
    email: "info@okasre.com.au",
    route: "derrimut"
  },
  {
    image: officeImage2,
    title: "Truganina",
    address: "3/209 Palmers Rd, Truganina VIC 3029",
    phone: "03 7038 6527",
    email: "info@okasre.com.au",
    route: "truganina"
  },
];

function Offices() {

  const [metaDetails, setMetaDetails] = useState({
    pageName: "Our Offices"
  })

  //eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const metadetail = await getMetaDetails('Our Offices');
  //   setMetaDetails(metadetail)
  // }, [])

  return (
    <Layout>
      <MetaHandler props={metaDetails} />
      <Topsection
        pageTitle="Our Offices"
        titleLight
        backgroundImage="/assets/images/our-office-hero-bg.jpg"
      />
      <div className="section">
        <Container>
          <Row className="justify-content-center">
            {office.map((data, index) => {
              return (
                <Col md={6} key={index}>
                  <Widget className="office-box-widget pointer mb-4 p-0">
                    <OfficesBox
                      officeImage={data.image}
                      title={data.title}
                      address={data.address}
                      phone={data.phone}
                      email={data.email}
                      route={data.route}
                    />
                  </Widget>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
export default memo(Offices)