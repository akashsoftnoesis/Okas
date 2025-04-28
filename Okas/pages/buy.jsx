import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Head from 'next/head'
import Topsection from "../components/Common/Topsection";
import Layout from "../components/Layout";
import ListingBox from "../components/Common/ListingBox";
import SkeletonListBox from "../components/Common/skeleton/ListingBox";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { ApiGet } from "../helper/ApiData";
import SidebarFilter from "./sidebarFilter";
import SortingFilter from "./sortingFilter";
import orderBy from "lodash.orderby";
import MetaHandler from "../helper/utils/commonMetaApi";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Buy() {
  const [propertiesSaleData, setPropertiesSaleData] = useState();
  const [filterOption, setFilterOption] = useState(false);
  const [filterData, setFilterData] = useState();
  const [sortData, setSortData] = useState("newestListings");
  const [onCLickPageValue, setOnCLickPageValue] = useState(1);
  const [currentPage] = useState(100);
  const [loading, setLoading] = useState(false);
  const [filterLoader, setFilterLoader] = useState(false);
  const [metaDetails, setMetaDetails] = useState({
    pageName: "Buy"
  })

  //eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const metadetail = await getMetaDetails('Buy');
  //   setMetaDetails(metadetail)
  // }, [])

  const setFilterOptionToggle = loader => {
    if (!filterOption) {
      document.body.classList.add('filter-open')
    } else {
      document.body.classList.remove('filter-open')
      if (loader) {
        setFilterLoader(true);
        setTimeout(() => {
          setFilterLoader(false);
        }, 1000);
      }
    }
    setFilterOption(!filterOption)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiGet(
          `properties/sale?page=${onCLickPageValue}&pagesize=${currentPage}&status=listing&sort=inserted&sortOrder=desc`,
          {
            params: {
              status: "listing",
            },
          }
        );
        if (response.status === 200) {
          let array = response.data?.data?.items;
          array = orderBy(
            array,
            [(obj) => new Date(obj.publishedToWeb)],
            ["desc"]
          );
          setPropertiesSaleData(array);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const getFilter = (data) => setFilterData(data);
  const getSort = (data) => setFilterData(data);

  return (
    <Layout>
      <MetaHandler props={metaDetails} />
      <Topsection
        titleLight
        pageTitle="Selection of Finest Properties For Sale"
        backgroundImage="/assets/images/buy-bg.jpg"
      />
      <SidebarFilter
        propertiesData={propertiesSaleData}
        onSidebarFilter={getFilter}
        sortData={sortData}
        filterOption={filterOption}
        filterClose={setFilterOptionToggle}
      />
      <div className="section properties-wrap">
        <Container>
          <Row>
            <Col md={12}>
              <SortingFilter
                propertiesData={filterData || propertiesSaleData}
                onSorting={getSort}
                sortData={sortData}
                setSortData={setSortData}
                onChangeClass={setFilterOptionToggle}
                category="buy"
              />
              {(!propertiesSaleData || filterLoader) ? (
                <Row>
                  <SkeletonListBox count={9} grid={3} />
                </Row>
              ) : (
                <Row>
                  {
                    <ListingBox
                      propertiesSaleData={filterData || propertiesSaleData}
                      category="sale"
                      loading={loading}
                      grid={3}
                    />
                  }
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
