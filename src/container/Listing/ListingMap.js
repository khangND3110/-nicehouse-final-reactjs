import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Map from 'components/Map/Map';
import useDataApi from 'library/hooks/useDataApi';
import { FixedMap } from './Listing.style';

const ListingMap = (props) => {
  return (
    <FixedMap>
      <Map location={props.data} multiple={true} />
    </FixedMap>
  );
};

export default ListingMap;
