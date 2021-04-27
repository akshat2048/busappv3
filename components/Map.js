import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import Platform from 'react-native'

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
  var points = {}

const Map = (props) => {

  const mapContainerRef = useRef(null);
  const [coords, setCoords] = useState(props.propState.coords)
  const [lng, setLng] = useState(-88.08955);
  const [lat, setLat] = useState(43.078780);
  const [zoom, setZoom] = useState(13);

  //Setting the points
  if (true) {
    var geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }]
    };
    geojson.features.pop()
    geojson.features.pop()
    var counter = 0
    console.log(props.propState.reorderedStops)

    props.propState.reorderedStops.forEach((element, index) => {

      if (true) {
        counter++;
      }

      var featureObject = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.',
          'marker-color': '#ffd800',
          'marker-symbol': '1'
        }
      }

      featureObject.geometry.coordinates = [element.longitude, element.latitude]
      featureObject.properties.title = counter
      featureObject.properties.description = element.name
      featureObject.properties['marker-symbol'] = counter
      geojson.features.push(featureObject)

    });

    points = geojson
    console.log(points.features[points.features.length-1])
  }

  //Destructure coords from route params
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

      map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': points.features
        }
      })
      
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
          'line-width': 4
        }

      });

      // map.addLayer({
      //   'id': 'points',
      //   'type': 'circle',
      //   'source': 'points',
      //   'paint': {
      //     'circle-color': '#ffd800',
      //     'circle-radius': 10
      //   }
      // });

      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Red_pog.svg/8px-Red_pog.svg.png', function(error, image) {
        map.addImage('pointMarker', image)
        map.addLayer({
          'id': 'pointMarker',
          'type': 'symbol',
          'source': 'points',
          'layout': {
            'icon-image': 'pointMarker',
            'icon-size': 2.5,
            'icon-allow-overlap': true,
            'icon-rotate': 0,
            'text-field': ['get', 'title'],
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 0],
            'text-anchor': 'center',
            'text-size': 12
          },
          'paint': {
            'text-color': '#FFFFFF',
          }
        });
      })
      
      map.addSource('point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
            'features': [
              {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [points.features[points.features.length-1].geometry.coordinates[0], points.features[points.features.length-1].geometry.coordinates[1]]
              }
            }
          ]
        }
      });

      map.addSource('finalNumber', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
            'features': [
              {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [points.features[points.features.length-1].geometry.coordinates[0], points.features[points.features.length-1].geometry.coordinates[1]]
              }
            }
          ]
        }
      });

      // map.addLayer({
      //   'id': 'point',
      //   'type': 'circle',
      //   'source': 'point', // reference the data source
      //   'paint': {
      //     'circle-color': '#ffd800',
      //     'circle-radius': 20
      //   }
      // });

      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Simpleicons_Places_flag-map-marker-1.svg/1200px-Simpleicons_Places_flag-map-marker-1.svg.png', function(error, image) {
        map.addImage('custom-marker', image)
        map.addLayer({
          'id': 'finalNumber',
          'type': 'symbol',
          'source': 'finalNumber',
          'layout': {
            'icon-image': 'custom-marker',
            'icon-size': 0.05,
            'text-field': '',
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 0],
            'text-anchor': 'center'
          }
        });
      })
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Distance: {props.propState.distanceToBeTravelled} miles
        </div>
        <div>
          Time: {props.propState.time} min
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;