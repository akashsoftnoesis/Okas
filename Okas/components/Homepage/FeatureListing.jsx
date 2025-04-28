import { Container, Row, Col, Button } from "reactstrap";
import ListingBox from "../Common/ListingBox";
import SkeletonListingBox from "../Common/skeleton/ListingBox";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { useEffect, useState } from "react";
import { ApiGet } from "../../helper/ApiData";
import SwiperSliderListingBox from "../Common/SwiperSliderListingBox";
import orderBy from "lodash.orderby";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function FeatureListing() {
  const [forSelProperty, setForSelProperty] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiGet(`properties/sale?status=listing`, {
          params: {
            status: "listing",
          },
        });
        if (response.status === 200) {
          let array = response.data?.data?.items;
          array = orderBy(
            array,
            [(obj) => new Date(obj.publishedToWeb)],
            ["desc"]
          );
          setForSelProperty(array);
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
    <div>
      <Container>
        {/* <Row className="justify-content-center">
                    <Col md={10}>
                        <div className="heading mb-5">
                            <h2>Latest Properties for sale</h2>
                        </div>
                    </Col>
                </Row> */}
        {!forSelProperty ? (
          <Row>
            <SkeletonListingBox count={8} grid={3}/>
          </Row>
        ) : (
          <Row>
            <ListingBox
              propertiesSaleData={forSelProperty}
              category="sale"
              displayRecord={8}
              loading={loading}
              grid={3}
            />
          </Row>
        )}

        {/* <Row>
                    <Col md={12} className="text-center">
                        <Button color="primary">View All Properties for Sale</Button>
                    </Col>
                </Row> */}
      </Container>
    </div>
  );
}
