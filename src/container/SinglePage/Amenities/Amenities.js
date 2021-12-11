import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import { FaWifi, FaCarAlt, FaSwimmer, FaAirFreshener } from 'react-icons/fa';
import IconCard from 'components/IconCard/IconCard';
import AmenitiesWrapper, { AmenitiesArea } from './Amenities.style';
import { TextButton } from '../SinglePageView.style';
import { Element } from 'react-scroll';

const Amenities = ({ titleStyle, linkStyle, amenities }) => {
  return (
    <Element name="amenities" className="Amenities">
      <AmenitiesWrapper>
        <Heading as="h2" content="Amenities" {...titleStyle} />
        <AmenitiesArea>
          {amenities.map((item) => {
            if (item == 'airCondition') {
              return <IconCard icon={<FaAirFreshener />} title="Air Freshener" />
            }
            if (item == 'pool') {
              return <IconCard icon={<FaSwimmer />} title="Free pool" />
            }
            if (item == 'parking') {
              return <IconCard icon={<FaCarAlt />} title="Free parking" />
            }
            if (item == 'wifiAvailability') {
              return <IconCard icon={<FaWifi />} title="Free wifi" />
            }
          })}
        </AmenitiesArea>
      </AmenitiesWrapper>
    </Element>
  );
};

Amenities.propTypes = {
  titleStyle: PropTypes.object,
  linkStyle: PropTypes.object,
};

Amenities.defaultProps = {
  titleStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: ['14px', '20px', '30px'],
  },
  linkStyle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489',
  },
  amenities: [],
};

export default Amenities;
