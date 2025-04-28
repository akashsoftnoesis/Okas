import Image from "next/image"
import user from "../../public/assets/images/user.jpg"

export default function TestimonialBox(props) {
    return (
        <div className="testimonial-box">
            <div className="testi-meta">
                <p className="mb-0">{`“ I believe in lifelong learning and Skola is a great place to learn from experts. I've learned a lot and recommend it to all my friends “`}</p>
            </div>
            <div className="testimonial-client-info">
                {/* <div className="testimonial-img">
                    <Image width="60" height="60" className="rounded-circle m-auto" src={user} alt="user"/>
                </div> */}
                <div className="client-info">
                    <h6>Marvin McKinney</h6>
                    {/* <span>Creative Director</span> */}
                </div>
            </div>
        </div>
    )
}
