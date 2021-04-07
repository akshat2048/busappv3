import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import RouteHandler from './resources/apiusage/RouteHandler';


mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = (props) => {

  console.log("Rendering Component")

  const mapContainerRef = useRef(null);
  const [coords, setCoords] = useState(props.propState.coords)
  const [lng, setLng] = useState(-88.08955);
  const [lat, setLat] = useState(43.078780);
  const [zoom, setZoom] = useState(13);

  //Destructure coords from route params
  //console.log(props.propState.stops)
  console.log("The geometry inside Map.js is " + coords)
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // map.on('move', () => {
    //   setLng(map.getCenter().lng.toFixed(4));
    //   setLat(map.getCenter().lat.toFixed(4));
    //   setZoom(map.getZoom().toFixed(2));
    // });
    map.on('load', function () {
      map.addSource('route', {
          'type': 'geojson',
          'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                  'type': 'LineString',
                  'coordinates': coords
              }
          }
      });
      map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
              'line-join': 'round',
              'line-cap': 'round'
          },
          'paint': {
              'line-color': '#66A4D9',
              'line-width': 2
          }
      
      });
  });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;