import React, { useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import DragAndDropUploader from 'components/UI/ImageUploader/DragAndDropUploader';
import FormControl from 'components/UI/FormControl/FormControl';
import AddListingAction from './AddListingAction';
import { FormHeader, Title, FormContent, FormAction } from './AddListing.style';

const HotelPhotos = ({ setStep }) => {
  const { register, errors, setValue, handleSubmit } = useForm({
    defaultValues: {
      hotelPhotos: [],
    },
  });

  const { action, state } = useStateMachine(AddListingAction);
  useEffect(() => {
    register({ name: 'hotelPhotos' }, { required: true });
  }, [register]);

  const onSubmit = (data) => {
    action(data);
    setStep(3);
  };

  const handleChangeImages = event => {
    setValue('hotelPhotos', event.target.files)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <FormHeader>
          <Title>Step 2: Hotel Photos</Title>
        </FormHeader>
        <input type='file' multiple id="imageUpload" accept=".png, .jpg, .jpeg" onChange={handleChangeImages}  />
      </FormContent>
      <FormAction>
        <div className="inner-wrapper">
          <Button
            className="back-btn"
            htmlType="button"
            onClick={() => setStep(1)}
          >
            <IoIosArrowBack /> Back
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </FormAction>
    </form>
  );
};

export default HotelPhotos;
