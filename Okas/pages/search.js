import orderBy from "lodash.orderby";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ListingBox from "../components/Common/ListingBox";
import SkeletonListingBox from "../components/Common/skeleton/ListingBox";
import Topsection from "../components/Common/Topsection";
import Layout from "../components/Layout";
import { ApiGet } from "../helper/ApiData";
import SortingFilter from "./sortingFilter";

function Search() {
  const [searchData, setSearchData] = useState();
  const [filterData, setFilterData] = useState();
  const [sortData, setSortData] = useState("newestListings");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { category, type, search } = router.query;

  const getPath = () => {
    switch (category) {
      case "sale":
        return "properties/sale";
      case "lease":
        return "properties/lease";
      case "sold":
        return "properties/sold";
      default:
        break;
    }
  };

  const getFilterOption = (item) => {
    if (category && type && search) {
      const address = item.address.suburb;
      return (
        item.class.internalName.toLowerCase() === type.toLowerCase() &&
        (address.name.toLowerCase().includes(search.toLowerCase()) ||
          address.postcode.toLowerCase().includes(search.toLowerCase()) ||
          item.displayAddress.toLowerCase().includes(search.toLowerCase()))
      );
    } else if (category && type) {
      return item.class.internalName.toLowerCase() === type.toLowerCase();
    } else if (category && search) {
      const address = item.address.suburb;
      return (
        address.name.toLowerCase().includes(search.toLowerCase()) ||
        address.postcode.toLowerCase().includes(search.toLowerCase()) ||
        item.displayAddress.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const prefixesByCategory = {
    sale: "For Sale",
    rent: "For Rent",
    sold: "",
  }

  const headTitleByCategory = (category, propertyCount) => {
    switch (category) {
      case "sale":
        return `Found ${propertyCount} Properties For Sale`;
      case "lease":
        return `Found ${propertyCount} Properties For Rent`;
      case "sold":
        return `Found ${propertyCount} Sold Properties`
      default:
        return '';
    }
  }

  useEffect(() => {
    const path = getPath();
    if (path) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await ApiGet(path);
          if (response.status === 200) {
            let array = response.data?.data?.items;
            const filterData =
              category && !search && !type
                ? array
                : array.filter((item) => getFilterOption(item));
            const fieldToSort = category === 'lease' ? 'inserted': 'publishedToWeb';
            array = orderBy(
              filterData,
              [(obj) => new Date(obj[fieldToSort])],
              ["desc"]
            );
            setSearchData(array);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log("error", error);
        }
      };
      fetchData();
    }
  }, [category, type]);

  const getFilter = (data) => setFilterData(data);
  const getSort = (data) => setFilterData(data);
  const headerTitle = headTitleByCategory(category, (filterData || searchData || []).length );
  
  return (
    <Layout>
      <Topsection
        titleLight
        pageTitle={headerTitle}
        backgroundImage="/assets/images/feedback-bg.jpg"
      />
      <div className="section properties-wrap">
        <Container>
          {category ? (
            <Row>
              <Col xl={3} lg={4}>
                {/* <SidebarFilter
                  propertiesData={searchData}
                  onSidebarFilter={getFilter}
                  sortData={sortData}
                  filterOption={filterOption}
                  filterClose={setFilterOptionToggle}
                /> */}
              </Col>
              <Col xl={12} lg={12}>
                <SortingFilter
                  propertiesData={filterData || searchData}
                  onSorting={getSort}
                  sortData={sortData}
                  setSortData={setSortData}
                />
                {!searchData ? (
                  <Row>
                    <SkeletonListingBox count={8} grid={3} />
                  </Row>
                ) : (
                  <Row>
                    {
                      <ListingBox
                        propertiesSaleData={filterData || searchData}
                        category={category}
                        loading={loading}
                        grid={3}
                      />
                    }
                  </Row>
                )}
              </Col>
            </Row>
          ) : (
            <div className="no-data">
              <h3>No data fould</h3>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
}

export default Search;
