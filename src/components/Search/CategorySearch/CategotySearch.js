import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import { setStateToUrl, getStateFromUrl } from '../url_handler';
import {
  getDistrict,
} from '../SearchParams';
import CategroySearchWrapper, {

} from './CategorySearch.style';

const CategorySearch = ({ history, location }) => {
  const searchParams = getStateFromUrl(location);
  const state = {
    amenities: searchParams.amenities || [],
    district: searchParams.district || [],
    date_range: searchParams.date_range || {
      setStartDate: null,
      setEndDate: null,
    },
    price: searchParams.price || {
      min: 0,
      max: 100,
      defaultMin: 0,
      defaultMax: 100,
    },
    location: searchParams.location || {
      lat: null,
      lng: null,
    },
    room: parseInt(searchParams.room) || 0,
    guest: parseInt(searchParams.guest) || 0,
  };
  const { amenities, district, date_range, price, room, guest } = state;
  const [countRoom, setRoom] = useState(room);
  const [countGuest, setGuest] = useState(guest);

  const onChange = (value, type) => {
    const query = {
      ...state,
      [type]: value,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const handleRoomGuestApply = () => {
    const query = {
      ...state,
      room: countRoom,
      guest: countGuest,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const handleRoomGuestCancel = () => {
    setRoom(0);
    setGuest(0);
    const query = {
      ...state,
      room: 0,
      guest: 0,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const onSearchReset = () => {
    setRoom(0);
    setGuest(0);
    const search = setStateToUrl({ reset: '' });
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  return (
    <CategroySearchWrapper>
      <ViewWithPopup
        className={district.length ? 'activated' : ''}
        key={getDistrict.id}
        noView={true}
        view={
          <Button type="default">
            {getDistrict.name}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getDistrict.options}
            defaultValue={district}
            onChange={(value) => onChange(value, 'district')}
          />
        }
      />
      <div className="view_with__popup">
        <div className="popup_handler">
          <Button type="default" onClick={onSearchReset}>
            Reset
          </Button>
        </div>
      </div>
    </CategroySearchWrapper>
  );
};

export default CategorySearch;
