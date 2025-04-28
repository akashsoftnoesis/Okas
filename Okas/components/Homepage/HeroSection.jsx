import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropertySearch from '../Common/PropertySearch';

export default function HeroSection() {
    const scrollDown =()=> {
       const el = document.getElementById("sell-buy")
       el.scrollIntoView({behavior: "smooth"});
    }
    return (
        <>
        <div className="hero-section">

            {/* <Swiper
                loop="true"  
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <Image src={HeroBG} alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={HeroBG} alt=""/>
                </SwiperSlide>
            </Swiper> */}
            {/* <ReactPlayer width="100%" height="100%" url="./assets/images/banner-video-3.mp4" playing={true} loop={true} muted/> */}
            {/* <video id="herovideo" muted playsinline autoPlay preload="auto" loop width="100%" height="100%"> */}
            {/* <video id="herovideo" muted autoPlay loop autobuffer playsinline  width="100%" height="100%">
                <source src="./assets/images/banner-video-3.mp4" type="video/mp4" />
            </video> */}
            <div className="herovideo-wrapper" dangerouslySetInnerHTML={{ __html: `
                <video id="herovideo" muted autoplay loop webkit-playsinline playsinline width="100%" height="100%">
                    <source src="./assets/images/banner-video-3.mp4" type="video/mp4" />
                </video>
            ` }}></div> 
            <div className="banner-wrap">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={10}>
                            <div className="text-center">
                                <span className="font2 text-uppercase font-weight-light">We know how to get more for your Property</span>
                                <h1 className="text-capitalize">Let Us Help You Find Your Next Home</h1>
                            </div>
                            <PropertySearch/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <span className="down" onClick={scrollDown}>
                <span className="mouse"><span></span></span>
            </span>
        </div>
        </>
    )
}