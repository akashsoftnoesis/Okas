import { useEffect, useState } from "react";
import classnames from "classnames";
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import FeatureListing from "./FeatureListing";
import PropertiesRent from "./PropertiesRent";
import ListingBox from "../Common/ListingBox";
import SkeletonListingBox from '../Common/skeleton/ListingBox'
import { ApiGet } from "../../helper/ApiData";
import orderBy from "lodash.orderby";

export default function PropertyListing() {
  const [activeTab, setActiveTab] = useState("1");
  const tabToggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      window.scrollBy(0, 1)
    };
  };
  const [loading, setLoading] = useState(false);
  const [soldData, setSoldData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiGet(`properties/sold`);
        if (response.status === 200) {
          let array = response?.data?.data?.items;

          array = orderBy(
            array,
            [(obj) => new Date(obj?.saleDetails?.unconditional)],
            ["desc"]
          );

          setSoldData(array);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="section pb-4">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="my-listing">
              <div className="about-me border-0 p-0">
                <h3> Latest Properties </h3>
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
            <TabContent className="banner-tab-content pt-3" activeTab={activeTab}>
              <TabPane tabId="1">
                <FeatureListing />
              </TabPane>
              <TabPane tabId="2">
                <PropertiesRent />
              </TabPane>
              <TabPane tabId="3">
                {!soldData ? (
                  <SkeletonListingBox count={4} grid={3} />
                ) : (
                  <Row>
                    <ListingBox
                      showCategory="true"
                      propertiesSaleData={soldData} // Exclude property with id 27948171
                      displayRecord={8}
                      category="sold"
                      sold
                      grid={3}
                      loading={loading}
                    />
                  </Row>
                )}
              </TabPane>

            </TabContent>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
