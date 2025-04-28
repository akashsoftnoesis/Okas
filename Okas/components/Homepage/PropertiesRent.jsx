import { Container, Row } from "reactstrap";
import ListingBox from "../Common/ListingBox";
import SkeletonListingBox from "../Common/skeleton/ListingBox";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { useEffect, useState } from "react";
import { ApiGet } from "../../helper/ApiData";
import orderBy from "lodash.orderby";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function PropertiesRent() {
  const [propertiesRentData, setPropertiesRentData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiGet(
          `properties/lease?status=management,listing&propertyClass=residential&availableOnly=true`
        );
        if (response.status === 200) {
          let array = response.data?.data?.items;
          array = orderBy(array, [(obj) => new Date(obj.inserted)], ["desc"]);
          setPropertiesRentData(array);
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
        {!propertiesRentData ? (
          <Row>
            <SkeletonListingBox count={4} grid={3} />
          </Row>
        ) : (
          <Row>
            <ListingBox
              propertiesSaleData={propertiesRentData}
              category="lease"
              displayRecord={8}
              rent={true}
              loading={loading}
              grid={3}
            />
          </Row>
        )}
      </Container>
    </div>
  );
}
