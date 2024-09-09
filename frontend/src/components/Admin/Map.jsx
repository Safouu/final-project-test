

// import { useEffect } from 'react';

// const Map = () => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.type = 'module';
//     script.src = 'https://unpkg.com/@googlemaps/extended-component-library@0.6';
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return (
//     <div id="place-picker-box">
//       <div id="place-picker-container">
//         {/* <gmpx-api-loader key={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} solution-channel="GMP_GE_Map_v1">
//         </gmpx-api-loader>
//         <gmpx-place-picker placeholder="Enter an address"></gmpx-place-picker> */}
//       </div>
//     </div>
//   );
// };

// export default Map;


import { useEffect, useRef } from 'react';

const Map = ({ onSelect }) => {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
      types: ['geocode'], // Limit results to geographical locations.
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.place_Id && onSelect) {
        onSelect(place); // Pass the place object to the parent component.
      }
    });
  }, [onSelect]);

  return (
    
    <input
      ref={autocompleteRef}
      type="text"
      placeholder="Enter a location"
   
    />
  );
};

export default Map;
