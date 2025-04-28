import Image from "next/image";
import listingImg from "../../public/assets/images/listing-01.jpeg";
import bed from "../../public/assets/images/bed.svg";
import bath from "../../public/assets/images/bath.svg";
import garage from "../../public/assets/images/garage.svg";
import sqft from "../../public/assets/images/sq-ft.svg";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperSliderListingBox(props) {
  const { rent, category, propertiesSaleData } = props;
  const router = useRouter();

  const handleSingleProperty = (items) => {
    const type = items?.type?.propertyClass?.internalName;
    router.push({
      pathname: `/properties/${category}/${type}/${items.id}`,
    });
  };

  const checkValueNullOrZero = (value) => value === null || value === 0;
  const areaValue = (item) =>
    checkValueNullOrZero(item?.landArea?.value) ? (
      "-"
    ) : (
      <>
        {" "}
        {item?.landArea?.value} m<sup>2</sup>{" "}
      </>
    );
  const garageValue = (item) =>
    checkValueNullOrZero(item?.garages)
      ? checkValueNullOrZero(item?.carports)
        ? "-"
        : item?.carports
      : item?.garages;

  const getLable = () => {
    if (category === "sale") return <span className="sale">FOR SALE</span>;
    if (category === "lease") return <span className="sale">FOR LEASE</span>;
  };
  if (!propertiesSaleData) {
    return (
      <div className="slider mb-5">
        <Swiper
          spaceBetween={30}
          loop="true"
          className="pb-4"
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              spaceBetween: 15,
              slidesPerView: 2,
            },
            992: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
            1480: {
              slidesPerView: 4,
            },
          }}
        >
          {Array(6).map((index) => {
            return (
              <SwiperSlide key={index} height="200px">
                <Skeleton height={200} />
                <div className="mt-3">
                  <h6>
                    <Skeleton height={15}></Skeleton>
                  </h6>
                  <h6>
                    <Skeleton height={15} width={250}></Skeleton>
                  </h6>
                  <ul className="d-flex mt-3">
                    <div className="mr-2">
                      <Skeleton height={40} width={76}></Skeleton>
                    </div>
                    <div className="mr-2">
                      <Skeleton height={40} width={76}></Skeleton>
                    </div>
                    <div className="mr-2">
                      <Skeleton height={40} width={76}></Skeleton>
                    </div>
                    <div className="mr-2">
                      <Skeleton height={40} width={76}></Skeleton>
                    </div>
                  </ul>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="slider">
      <Swiper
        spaceBetween={30}
        loop="true"
        className="pb-4"
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          576: {
            spaceBetween: 15,
            slidesPerView: 2,
          },
          992: {
            spaceBetween: 30,
            slidesPerView: 3,
          },
          1480: {
            slidesPerView: 4,
          },
        }}
      >
        {propertiesSaleData &&
          propertiesSaleData.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                <div
                  className="listing-box"
                  onClick={() => handleSingleProperty(item)}
                >
                  <div className="listing-img">
                    <a>
                      <Image
                        width={330}
                        height={200}
                        src={item?.photos[0]?.url || listingImg}
                        alt=""
                        layout="fixed"
                      />
                    </a>
                    {props.category === "sold" ? (
                      <div className="sold-property">Sold</div>
                    ) : null}
                    {<div className="category">{getLable()}</div>}
                    {rent && !item?.showCategory && (
                      <div className="category"></div>
                    )}
                    {rent && item?.searchPrice && (
                      <div className="listing-foot">
                        <h6>${item?.searchPrice} p/w</h6>
                      </div>
                    )}
                  </div>
                  <div className="listing-info">
                    <h6>{item?.heading}</h6>
                    <span>{item?.displayAddress}</span>
                    <ul className="listing-features">
                      <li>
                        <Image src={bed} alt="" />{" "}
                        <span>
                          {checkValueNullOrZero(item?.bed) ? "-" : item?.bed}
                        </span>
                      </li>
                      <li>
                        <Image src={bath} alt="" />{" "}
                        <span>
                          {checkValueNullOrZero(item?.bath) ? "-" : item?.bath}
                        </span>
                      </li>
                      <li>
                        <Image src={garage} alt="" />{" "}
                        <span>{garageValue(item)}</span>
                      </li>
                      <li>
                        <Image src={sqft} alt="" />{" "}
                        <span>{areaValue(item)} </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="swiper-button-prev">
        <i className="fa fa-angle-left"></i>
      </div>
      <div className="swiper-button-next">
        <i className="fa fa-angle-right"></i>
      </div>
    </div>
  );
}
