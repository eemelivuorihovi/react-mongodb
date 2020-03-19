import React, {useEffect, useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";

export default function Map(props: any) {
    const [viewport, setViewport] = useState({
        latitude: 53.407154,
        longitude: -2.991665,
        width: '50vw',
        height: '50vh',
        zoom: 10
    });

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelected(null);
            }
        }

        window.addEventListener("keydown", listener);
    }, []);

    const merchants = props.merchants;
    return (
        <ReactMapGL {...viewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/eemelivuorihovi/ck7z2hx3r0w3h1im8298ys41a"
                    onViewportChange={(viewport: any) => {
                        setViewport(viewport);
                    }}>
            {merchants.map((merchant: any) => {
                return (
                    <Marker key={merchant.id}
                            latitude={merchant.location.lat}
                            longitude={merchant.location.lng}>
                        <div className={"map-marker"}
                             onClick={
                                 (e) => {
                                     e.preventDefault();

                                     setSelected(merchant);
                                 }
                             }>
                            <i className={"fa fa-map-marker fa-lg"}/>
                        </div>
                    </Marker>
                );
            })}


            {selected && selected.location ? (
                <Popup longitude={selected.location.lng}
                       latitude={selected.location.lat}
                       onClose={() => setSelected(null)}>
                    <div>
                        <h6>{selected.name}</h6>
                        <p>{selected.description}</p>
                        <i className="fa fa-location-arrow"/> {selected.location.postcode}
                    </div>
                </Popup>
            ) : null}
        </ReactMapGL>
    );
}