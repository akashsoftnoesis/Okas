import { useState } from "react";
import Layout from "../../components/Layout";
import MetaHandler from "../../helper/utils/commonMetaApi";
export default function Eminence(props) {
    const [metaDetails, setMetaDetails] = useState({
        pageName: "Projects"
    })
    return (
        <Layout>
            <MetaHandler props={metaDetails} />
            <div>
                {/* video section start */}
                <div className="video-section">
                    <video src="../../assets/Untitled-design.mp4" autoPlay controls />
                    {/* <video autoplay controls src="./images/6 Blake court Truganina final Horizontal mp4.mp4">
      </video> */}
                </div>
                {/* video section End */}
                {/* Property image section start */}
                <div className="property-details">
                    <div className="property-details-heading">
                        <h5>Discover Your Dream Property</h5>
                        <h3>Explore prime locations, modern designs, and exceptional amenities for a perfect home investment.</h3>
                    </div>
                    <div className="property-details-property">
                        <div className="poperty-image">
                            <img src="../../assets/images/DJI_0602U1.jpg" />
                        </div>
                        <div className="poperty-image">
                            <img src="../../assets/images/DJI_0602U2.jpg" />
                        </div>
                        <div className="poperty-image">
                            <img src="../../assets/images/DJI_0602U3.jpg" />
                        </div>
                        <div className="poperty-image">
                            <img src="../../assets/images/DJI_0602U6.jpg" />
                        </div>
                        <div className="poperty-image">
                            <img src="../../assets/images/DJI_0602U7.jpg" />
                        </div>
                        <div className="poperty-image">
                            <img src="../../assets/images/DJI_0602U8.jpg" />
                        </div>
                        <div className="poperty-image">
                            <img src="../../assets/images/DJI_0602U10.jpg" />
                        </div>
                        <div className="poperty-image">
                            <img src="../../assets/images/DJI_0602U4.jpg" />
                        </div>
                    </div>
                </div>
                {/* Property image section End */}
                {/* Download Broacher start */}
                <div className="broacher-download">
                    <h3>Download Brochure Template.</h3>
                    <p>Get all the details you need in our comprehensive brochure. Click below to download now!</p>
                    <a href="../../assets/6-Blake-Court-Brochure.pdf" target="_blank">Download <img src="../../assets/images/Vector.png" alt="Vector" /></a>
                </div>
                {/* Download Broacher End */}
                {/* Contect details start */}
                <div className="contect-details">
                    <h4>many lots and sizes available and please contact Vishal safi.</h4>
                    <div className="contect-agent-name">
                        <h3>Vish Safi</h3>
                        <p>DIRECTOR | LEA</p>
                    </div>
                    <div className="all-contect-detail">
                        <div className="contect-number">
                            <div className="mobile">
                                <label>MOBILE:</label>
                                <span>0449 919 191</span>
                            </div>
                            <div className="office">
                                <label>OFFICE:</label>
                                <span>0449 919 191</span>
                            </div>
                            <div className="email">
                                <label>EMAIL:</label>
                                <span>vish@okasre.com.au</span>
                            </div>
                        </div>
                        <div className="qr-code">
                            <img src="../../assets/images/download_qrcode.png" />
                            <p>SCAN THIS QR CODE</p>
                        </div>
                    </div>
                </div>
                {/* Contect details End */}
            </div>
        </Layout>
    );

}