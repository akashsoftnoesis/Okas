/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import ReactMapGL, { FullscreenControl, Marker } from "react-map-gl";

// const fullscreenControlStyle = {
//     top: 0,
//     left: 0,
//     padding: '10px',
//     float: 'right'
// };

export default function PropertyMap({ latitude, longitude }) {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "500px",
        // The latitude and longitude of the center of London
        latitude: 51.5074,
        longitude: -0.1278,
        zoom: 17
    });

    useEffect(() => {

        try {
            if (longitude && latitude) {
                setViewport(state => ({
                    ...state,
                    longitude,
                    latitude
                }));
            }
        } catch (error) {
            console.log('Error', error);
        }
    }, [longitude, latitude]);

    return (
        <div>

            <ReactMapGL
                {...viewport}
                dragPan={false}
                dragRotate={false}
                scrollZoom={false}
                touchZoom={true}
                touchRotate={true}
                keyboard={true}
                doubleClickZoom={true}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken="pk.eyJ1Ijoib2thc3Byb3BlcnR5Z3JvdXAiLCJhIjoiY2tzY3V3d25vMDJ4dzJ5bnVocnYyeTE4aCJ9.yKIVATUPoDbveS-c30Schg"
                onViewportChange={setViewport}
                mapOptions={{
                    interactive: true
                }}
            >
                {
                    longitude && latitude ?
                        (<Marker
                            longitude={longitude}
                            latitude={latitude}
                            anchor="bottom">
                            <img src="/assets/images/pin.png" alt="" />
                        </Marker>) : ''
                }
                {/* <FullscreenControl style={fullscreenControlStyle} /> */}
            </ReactMapGL>
        </div>
    )
}
