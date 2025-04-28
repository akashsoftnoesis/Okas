import React from 'react'
import Image from "next/image";
import facebook from '../../../public/assets/images/facebook.svg';

export default function FaceBookIcon(props) {
    return (
        <a
            href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={props.className}
        >
            <Image loading="eager" src={facebook} alt="" height="35" width="35" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24px" height="24px" x="0px" y="0px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlSpace="preserve">
                <g>
                    <path d="M18.768,7.465H14.5V5.56c0-0.896,0.594-1.105,1.012-1.105s2.988,0,2.988,0V0.513L14.171,0.5C10.244,0.5,9.5,3.438,9.5,5.32 v2.145h-3v4h3c0,5.212,0,12,0,12h5c0,0,0-6.85,0-12h3.851L18.768,7.465z" />
                </g>
            </svg> */}
        </a>

    )
}
