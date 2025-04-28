import Layout from "../components/Layout";
import Topsection from "../components/Common/Topsection";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import ListingBox from "../components/Common/ListingBox";
import SkeletonListingBox from "../components/Common/skeleton/ListingBox";
import { useEffect, useState } from "react";
import { ApiGet } from "../helper/ApiData";
import { DisplayDate } from "../helper/utils/date.utils";
import classnames from "classnames";
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";
import orderBy from "lodash.orderby";

export default function Inspections() {
  const [inspection, setInspection] = useState({});
  const [loading, setLoading] = useState(false);

  const [filterData, setFilterData] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [metaDetails, setMetaDetails] = useState({
    pageName: "Buy-Open Home"
  })

  //eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const metadetail = await getMetaDetails('Buy-Open Home');
  //   setMetaDetails(metadetail)
  // }, [])

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await ApiGet(`properties/upcomingOpenHomes?type=sale`);

      let keysArray = Object.keys(res.data.data) // get all date key from response
      keysArray = orderBy(keysArray, (val) => new Date(val)) // sort keys date wise

      // rearrange response by date key
      const sortByDate = keysArray.reduce((obj, item) => {
        obj[item] = res.data.data[item]
        return obj;
      }, {});
      setInspection(sortByDate);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const byDefaultSelectDate = inspection && Object.keys(inspection).length && Object.keys(inspection)[0]
    const byDefaultSelectData = inspection[byDefaultSelectDate]?.map((val) => val.property_details)
    setFilterData(byDefaultSelectData)
    setActiveTab(byDefaultSelectDate)

  }, [inspection])

  const handleChangeDate = (e) => {
    const propertiesSaleData = inspection[e].map((val) => val.property_details)
    setFilterData(propertiesSaleData)
    setActiveTab(e)
  }

  return (

    <Layout>
       <MetaHandler props={metaDetails} />
      <Topsection
        titleLight
        pageTitle="Open For Inspection"
        backgroundImage="/assets/images/inspection-bg.jpg"
      />
      <div className="section bg-gray-100">
        <Container>
          <Row>
            <Col xs={12}>
              {
                filterData && filterData.length ?
                  (<>
                    <div className="my-listing new-myListing">
                      <Nav tabs className="custom-tab mx-auto">
                        {
                          inspection && Object.keys(inspection) && Object.keys(inspection).length ?
                            (
                              Object.keys(inspection).map((date, index) => {
                                return (
                                  <NavItem key={index}>
                                    <NavLink
                                      className={date === activeTab ? 'active font2' : 'font2'}
                                      onClick={() => handleChangeDate(date)}
                                    >
                                      {DisplayDate(date)}
                                    </NavLink>
                                  </NavItem>
                                )
                              })
                            ) : null
                        }
                      </Nav>
                    </div>
                    <div>
                      {
                        loading ?
                          <Row>
                            <SkeletonListingBox grid={3} count={4} />
                          </Row>
                          :
                          <Row className="justify-content-center my-5" >
                            <ListingBox
                              showCategory="true"
                              displayRecord={8}
                              category="sale"
                              grid={3}
                              propertiesSaleData={filterData}
                            />
                          </Row>
                      }
                    </div>
                  </>) : <h4 className="text-center pt-4 font2">No properties found</h4>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
