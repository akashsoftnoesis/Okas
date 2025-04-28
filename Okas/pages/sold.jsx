import Layout from "../components/Layout";
import Topsection from "../components/Common/Topsection";
import { Container, Row } from "reactstrap";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import ListingBox from "../components/Common/ListingBox";
import SkeletonListBox from "../components/Common/skeleton/ListingBox";
import { useEffect, useState } from "react";
import { ApiGet } from "../helper/ApiData";
import orderBy from "lodash.orderby";
import MetaHandler, { getMetaDetails } from "../helper/utils/commonMetaApi";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Sold() {
  const [soldData, setSoldData] = useState();
  const [loading, setLoading] = useState(false);
  const [metaDetails, setMetaDetails] = useState({
    pageName: "Sold"
  })

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
          console.log(array, "array");

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
    <Layout>
      <MetaHandler props={metaDetails} />
      <Topsection
        titleLight
        pageTitle="Recently Sold Properties"
        backgroundImage="/assets/images/sold-bg.jpg"
      />
      <div className="section pb-70">
        <Container>
          {!soldData ? (
            <Row className="justify-content-center mb-5">
              <SkeletonListBox count={8} grid={3} />
            </Row>
          ) : (
            <Row className="justify-content-center mb-5">
              <ListingBox
                showCategory="true"
                propertiesSaleData={soldData} // Exclude property with id 27948171
                category="sold"
                sold
                loading={loading}
                grid={3}
              />
            </Row>
          )}

        </Container>
      </div>
    </Layout>
  );
}
