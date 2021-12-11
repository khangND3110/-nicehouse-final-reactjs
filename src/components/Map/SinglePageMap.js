import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import HotelInfoWindow from './MapInfoWindow';
import MakerImage from './hotelMapMarker.png';
import { apartmentImageFisrt } from 'utils/ImageApartmentUtils';

const SingleMapDisplay = ({ location }) => {
  let hotelData = [];
  const [isOpen, setIsOpen] = useState(false);
  const [markerIndex, setMarkerIndex] = useState(0);

  const infoWindowToggle = (index) => {
    setIsOpen(!isOpen);
    setMarkerIndex(index);
  };

  const [apartment, setApartment] = useState({});

  useEffect(() => {
    setApartment(location);
    console.log(location)
  }, [location]);

  hotelData.push({
    lat: 10.810583,
    lng: 106.709145,
    id: location?.id,
    title: location?.title,
    thumbUrl: apartmentImageFisrt(location),
    formattedAddress: location.locationDescription,
    price: location?.price,
    rating: location?.rating,
    ratingCount: location?.ratingCount,
  });

  return hotelData.map((singlePostLoaction, index) => {
    return (
      <Marker
        key={index}
        icon={MakerImage}
        position={singlePostLoaction}
        onClick={() => {
          infoWindowToggle(singlePostLoaction.id);
        }}
      >
        {isOpen && markerIndex === singlePostLoaction.id ? (
          <HotelInfoWindow
            data={singlePostLoaction}
            onCloseClick={() => {
              infoWindowToggle(singlePostLoaction.id);
            }}
          />
        ) : (
          ''
        )}
      </Marker>
    );
  });
};

const HotelMapMarkerSingle = (props) => {
  return <SingleMapDisplay {...props} />;
};

export default HotelMapMarkerSingle;
