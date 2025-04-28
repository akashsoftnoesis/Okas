import { useEffect } from 'react';
import Footer from './Footer'
import dynamic from "next/dynamic";
const Header = dynamic(
    () => import("./Header"),
    {
      ssr: false,
    }
  );

export default function Layout(props) {
    useEffect(() => {
        window.document.onload = function(e){ 
            const preLoder = $(".loader");
            preLoder.delay(700).fadeOut(500).addClass('loaded');
        }
    },[])
    return (
        <>
            {/* <div className="loader">
                <span className="spinner"></span>
                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>
            </div> */}
            <Header />
            <div className="main-content">
                {
                    props.children
                }
            </div>
            <Footer />
        </>
    )
}