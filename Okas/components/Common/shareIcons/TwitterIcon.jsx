import React from 'react'
import Image from "next/image";
import twitter from '../../../public/assets/images/twitter.svg';

export default function TwitterIcon(props) {
    return (
        <a
            href={`https://twitter.com/intent/tweet/?text=${props.shareText}&url=${props.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className={props.className}
        >
            <Image loading="eager" src={twitter} alt="" height="35" width="35" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path strokeWidth="2px" strokeLinejoin="round" strokeMiterlimit="10" d="M23.407 4.834c-.814.363-1.5.375-2.228.016.938-.562.981-.957 1.32-2.019-.878.521-1.851.9-2.886 1.104-.827-.882-2.009-1.435-3.315-1.435-2.51 0-4.544 2.036-4.544 4.544 0 .356.04.703.117 1.036-3.776-.189-7.125-1.998-9.366-4.748-.391.671-.615 1.452-.615 2.285 0 1.577.803 2.967 2.021 3.782-.745-.024-1.445-.228-2.057-.568l-.001.057c0 2.202 1.566 4.038 3.646 4.456-.666.181-1.368.209-2.053.079.579 1.804 2.257 3.118 4.245 3.155-1.944 1.524-4.355 2.159-6.728 1.881 2.012 1.289 4.399 2.041 6.966 2.041 8.358 0 12.928-6.924 12.928-12.929l-.012-.588c.886-.64 1.953-1.237 2.562-2.149z" />
            </svg> */}
        </a>
    )
}
