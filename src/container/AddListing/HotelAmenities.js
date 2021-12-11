import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useStateMachine } from 'little-state-machine';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Radio, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import AddListingAction, { AddListingResetAction } from './AddListingAction';
import {
  FormHeader,
  Title,
  Description,
  FormContent,
  FormAction,
} from './AddListing.style';
// demo data
import { hotelAmenities } from './HotelAmenities.data';
import { createApartment } from 'services/apartmentService';
import { register } from 'services/authService';
import { useHistory } from 'react-router';

const HotelAmenities = ({ setStep }) => {
  const { control, handleSubmit } = useForm();
  const { state } = useStateMachine(AddListingAction);
  const { action } = useStateMachine(AddListingResetAction);
  const history = useHistory();
  const onSubmit = async (data) => {
    const hotelData = { ...state.data, ...convertAmenitiesData(data) };

    const token = localStorage.getItem("accessToken");
    // address
    // const lat = hotelData.locationData[0].lat;
    // const lng = hotelData.locationData[0].lng;
    // const address = hotelData.locationData[0].formattedAddress.split(', ');
    // const street = address[0];
    // const ward = address[1];
    // const district = address[2];
    // const city = address[3];
    // const country = address[4];
    // const locationDescription = hotelData.locationDescription;


    // apartment
    const title = hotelData.hotelName;
    const content = hotelData.hotelDescription;
    const guest = hotelData.guest;
    const bedRoom = hotelData.bed;
    const status = '';
    const price = hotelData.pricePerNight;
    const propertyType = 'hotel';
    const images = hotelData.hotelPhotos;
    const amenities = hotelData.amenities;

    const formData = new FormData();
    // formData.append('lat', lat);
    // formData.append('lng', lng);
    // formData.append('street', street);
    // formData.append('ward', ward);
    // formData.append('district', district);
    // formData.append('city', city);
    // formData.append('locationDescription', locationDescription);

    formData.append('title', title);
    formData.append('content', content);
    formData.append('guest', guest);
    formData.append('bedRoom', bedRoom);
    formData.append('status', status);
    formData.append('price', price);
    formData.append('propertyType', propertyType);

    for (let i = 0; i < images.length; i++) {
      formData.append(`images`, images[i])
    }

    formData.append('amenities', amenities);

    const response = await createApartment(token, formData);
    const json = await response.json();

    console.log(json);
    window.STATE_MACHINE_RESET();

    action({});

    history.push('/');
  };

  const convertAmenitiesData = (data) => {
    let amenitiesArr = [];
    if (data.airCondition == 'yes') {
      amenitiesArr.push('airCondition');
    }
    if (data.extraBed == 'yes') {
      amenitiesArr.push('airCondition');
    }
    if (data.parking == 'yes') {
      amenitiesArr.push('parking');
    }
    if (data.pool == 'yes') {
      amenitiesArr.push('pool');
    }
    if (data.wifiAvailability == 'yes') {
      amenitiesArr.push('wifiAvailability');
    }
    return { amenities: amenitiesArr };
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <FormHeader>
          <Title>
            Step 4: Hotel Amenities <span> (optional)</span>
          </Title>
          <Description>
            Add your hotel amenities , it can help travelers to choose their
            perfect hotel. Thanks.
          </Description>
        </FormHeader>
        <Row gutter={30}>
          {hotelAmenities.map((item) => (
            <Col key={`hotel-amenities--key${item.id}`} md={8}>
              <FormControl label={item.label} labelTag="h3">
                <Controller
                  as={<Radio.Group />}
                  name={item.name}
                  defaultValue={
                    state.data[item.name] !== undefined
                      ? state.data[item.name]
                      : ''
                  }
                  onChange={([e]) => {
                    return e.target.value;
                  }}
                  control={control}
                  options={item.options}
                />
              </FormControl>
            </Col>
          ))}
        </Row>
      </FormContent>
      <FormAction>
        <div className="inner-wrapper">
          <Button
            className="back-btn"
            htmlType="button"
            onClick={() => setStep(3)}
          >
            <IoIosArrowBack /> Back
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </FormAction>
    </form>
  );
};

export default HotelAmenities;
