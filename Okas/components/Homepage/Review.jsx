import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
export default function Review() {
  return (
    <>
      <ul id="review_slider" >
        <Slider
          // slidesToShow={4}
          slidesToScroll={1}
          dots={true}
          autoplay={true}
          // focusOnSelect={true}
          pauseOnHover={true}
          speed={800}
          // touchThreshold={500}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                //   slidesToShow: 4,
                slidesToScroll: 1,
                speed: 500,
              },
            },
            {
              breakpoint: 600,
              settings: {
                //   slidesToShow: 3,
                slidesToScroll: 1,
                speed: 500,
              },
            },
            {
              breakpoint: 480,
              settings: {
                //   slidesToShow: 3,
                slidesToScroll: 1,
                speed: 500,
              },
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 1,
                speed: 200,
              },
            },
          ]}
        >
          <li className="review_silder  1">
            <div className="review_box">
              <div className="quotes_image">
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/Ellipse 13.png" alt="agent" /> */}
                    <Image
                      src="/assets/images/Ellipse 13.png"
                      alt="agent"
                      width={150}
                      height={400}
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                    />
                  </div>
                  <h2>Vish Safi</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    Professional
                  </h3>
                  <p>
                    Vish Safi made our property buying experience seamless and stress-free. With excellent communication and market expertise, he ensured we found our dream home at a great deal. Highly recommended.
                  </p>
                  <span>- Buyer</span>
                </div>
              </div>
            </div>

          </li>
          <li className="review_silder  2">
            <div className="review_box">
              <div className="quotes_image">
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/Ellipse 13.png" alt="agent" /> */}
                    <Image src="/assets/images/Ellipse 13.png" alt="agent 1" width={150}
                      height={400} />
                  </div>
                  <h2>Vish Safi</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    Man of action
                  </h3>
                  <p>
                    Vish is amazing, couldn't recommend him enough. Went to above and beyond to ensure the sale of our property. Even though we had some pitfalls which were our of his control he worked meticulously to ensure we got a result we were happy with in a timely fashion. If your looking for an agent who walks the talk. Vish is your man.
                  </p>
                  <span>- Seller</span>
                </div>
              </div>
            </div>

          </li>
          <li className="review_silder  3">
            <div className="review_box">
              <div className="quotes_image">
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/mehul agent.png" alt="agent" /> */}
                    <Image src="/assets/images/mehul agent.png" alt="agent 2" width={150}
                      height={400} />

                  </div>
                  <h2>Mehul Ahir</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    Excellent
                  </h3>
                  <p>
                    Good service, can do any time communication, genuine advance, and humble person.
                  </p>
                  <span>- Buyer</span>
                </div>
              </div>
            </div>

          </li>
          <li className="review_silder  4">
            <div className="review_box">
              <div className="quotes_image">
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/mehul agent.png" alt="agent 4" /> */}
                    <Image src="/assets/images/mehul agent.png" alt="agent 4" width={150}
                      height={400} />
                  </div>
                  <h2>Mehul Ahir</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    SOLD IN NO TIME
                  </h3>
                  <p>
                    I am very happy to provide review for the work Mehul did in getting this done in just first week of listing. He did very good work on making me and buyer both agreed and happy on this sale. i would highly recommend Mehul for the sales.
                  </p>
                  <span>- Seller</span>
                </div>
              </div>
            </div>

          </li>
          <li className="review_silder  5">
            <div className="review_box">
              <div className="quotes_image">
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/priyanka.png" alt="agent 5" /> */}
                    <Image src="/assets/images/priyanka.png" alt="agent 5" width={150}
                      height={400} />
                  </div>
                  <h2>Priyanka Parmar</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    Very Accommodating and Nice
                  </h3>
                  <p>
                    Priyanka and her team did a great job in assisting our journey as new tenant. We are new in Australia, and this is the first time that we are renting a property. But this super fabulous team made it smooth and easy for us.
                  </p>
                  <span>- Tenant</span>
                </div>
              </div>
            </div>

          </li>
          <li className="review_silder  6">
            <div className="review_box">
              <div className="quotes_image">
                {/* <img src="/assets/images/Group 18.png" alt="quotes_image" /> */}
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/priyanka.png" alt="agent" /> */}
                    <Image src="/assets/images/priyanka.png" alt="agent 6" width={150}
                      height={400} />
                  </div>
                  <h2>Priyanka Parmar</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    Excellent communication and service
                  </h3>
                  <p>
                    Priyanka and her team has been fantastic to deal with and have been managing the property pro-actively. They provide great value and are easy to deal with.
                  </p>
                  <span>- Landlord</span>
                </div>
              </div>
            </div>

          </li>
          <li className="review_silder  7">
            <div className="review_box">
              <div className="quotes_image">
                {/* <img src="/assets/images/Group 18.png" alt="quotes_image" /> */}
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/priyanka.png" alt="agent" /> */}
                    <Image src="/assets/images/Nirali.png" alt="agent 6" width={150}
                      height={400} />
                  </div>
                  <h2>Nirali Desai</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    Above and beyond service
                  </h3>
                  <p>
                    Exceptional service from Nirali! Achieved a fantastic price for my property and orchestrated a quick sale. Her expertise and dedication truly made the selling process seamless. Highly recommend!
                  </p>
                  <span>- Seller</span>
                </div>
              </div>
            </div>
          </li>
          <li className="review_silder  8">
            <div className="review_box">
              <div className="quotes_image">
                {/* <img src="/assets/images/Group 18.png" alt="quotes_image" /> */}
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/priyanka.png" alt="agent" /> */}
                    <Image src="/assets/images/Nirali.png" alt="agent 6" width={150}
                      height={400} />
                  </div>
                  <h2>Nirali Desai</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    Best in business
                  </h3>
                  <p>
                    We are with OKAS since 2021 and we haven't looked back. They are very professional and always provide great customer service. Nirali is amazing at building relationships and always responds to our query. I am at peace of mind for my investment property. Highly recommended.
                  </p>
                  <span>- Landlord</span>
                </div>
              </div>
            </div>
          </li>
          <li className="review_silder  9">
            <div className="review_box">
              <div className="quotes_image">
                {/* <img src="/assets/images/Group 18.png" alt="quotes_image" /> */}
                <Image src="/assets/images/Group 18.png" alt="quotes_image" width={50}
                  height={80} />
              </div>
              <div className="slider_details">
                <div className="agent_image">
                  <div className="agent_image_section">
                    {/* <img src="/assets/images/priyanka.png" alt="agent" /> */}
                    <Image src="/assets/images/Nirali.png" alt="agent 6" width={150}
                      height={400} />
                  </div>
                  <h2>Nirali Desai</h2>
                </div>
                <div className="agent_review">
                  <h3>
                    Excellent
                  </h3>
                  <p>
                    Nirali was very helpful and informative, she knew what we wanted and extremely helpful in trying everything to help us because we bought the house while still living in Queensland.
                    She very kindly took a video of the entire house and sent it to us.
                    I would recommend Nirali to my friends and family.
                  </p>
                  <span>- Buyer</span>
                </div>
              </div>
            </div>
          </li>
        </Slider>
      </ul>
    </>
  );
}
