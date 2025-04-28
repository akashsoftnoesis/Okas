import 'bootstrap/dist/css/bootstrap.min.css';
// import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
import '../styles/fonts.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // const { pathname } = useRouter();

  // useLayoutEffect(() => {
  //   const body = document.body;
  //   const scrollUp = "scroll-up";
  //   const scrollDown = "scroll-down";
  //   body.classList.remove(scrollUp);
  //   body.classList.remove(scrollDown);
  // }, [pathname])

  useEffect(() => {

    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      body.classList.remove(scrollUp);
      body.classList.remove(scrollDown);
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 100) {
        body.classList.remove(scrollUp);
        return;
      }
      if (currentScroll <= 0) {
        body.classList.remove(scrollUp);
        return;
      }

      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        // down
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
      } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
        // up
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }
      lastScroll = currentScroll;
    });

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-XXB40S591T');

    return () => {
      body.classList.remove(scrollUp);
      body.classList.remove(scrollDown);
    };

  }, [])
  return <>
    <Head>
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.4.0/mapbox-gl.css" rel="stylesheet" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXB40S591T" ></script>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
