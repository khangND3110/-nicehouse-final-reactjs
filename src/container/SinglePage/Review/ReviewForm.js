import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, Rate, Checkbox, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import RadioGroup from 'components/UI/RadioGroup/RadioGroup';
import DragAndDropUploader from 'components/UI/ImageUploader/DragAndDropUploader';
import { Form, Label, GroupTitle, Description } from './Review.style';
import { createReview } from 'services/reviewService';

const ReviewForm = (props) => {
  const [photos, setPhotos] = useState([]);
  const { control, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      reviewPhotos: [],
    },
  });

  const onSubmit = async (data) => {
    const {
      ratings,
      reviewTitle,
      reviewDetails,
      serviceRatings,
      roomsRatings,
      cleanlinessRatings,
      foodRatings,
    } = data;

    const formData = new FormData();
    formData.append('apartmentId', props.apartmentId);
    formData.append('title', reviewTitle);
    formData.append('text', reviewDetails);
    formData.append('ratings', ratings);
    formData.append('serviceRatings', serviceRatings);
    formData.append('roomsRatings', roomsRatings);
    formData.append('cleanlinessRatings', cleanlinessRatings);
    formData.append('foodRatings', foodRatings);

    for (let i = 0; i < photos.length; i++) {
      formData.append(`images`, photos[i])
    }

    const token = localStorage.getItem("accessToken");
    const response = await createReview(token, formData);
    const json = await response.json();

    console.log(json);
  };

  const handleChangeImages = event => {
    setPhotos([...event.target.files])
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label="Overall Rating"
        htmlFor="ratings"
        error={errors.ratings && <span>This field is required!</span>}
      >
        <Controller
          as={<Rate />}
          id="ratings"
          name="ratings"
          defaultValue=""
          control={control}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl
        label="Title of your review"
        htmlFor="reviewTitle"
        error={errors.reviewTitle && <span>This field is required!</span>}
      >
        <Controller
          as={<Input />}
          id="reviewTitle"
          name="reviewTitle"
          defaultValue=""
          control={control}
          placeholder="Summarize your visit  or highlight an interesting details"
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl
        label="Details of your review"
        htmlFor="reviewDetails"
        error={errors.reviewDetails && <span>This field is required!</span>}
      >
        <Controller
          as={<Input.TextArea rows={5} />}
          id="reviewDetails"
          name="reviewDetails"
          defaultValue=""
          control={control}
          placeholder="Tell people about your experience: your room, location, amenities?"
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <Row type="flex" justify="space-between">
        <Col>
          <FormControl label="Service" htmlFor="serviceRatings">
            <Controller
              as={<Rate />}
              id="serviceRatings"
              name="serviceRatings"
              defaultValue=""
              control={control}
            />
          </FormControl>
        </Col>
        <Col>
          <FormControl label="Rooms" htmlFor="roomsRatings">
            <Controller
              as={<Rate />}
              id="roomsRatings"
              name="roomsRatings"
              defaultValue=""
              control={control}
            />
          </FormControl>
        </Col>
        <Col>
          <FormControl label="Cleanliness" htmlFor="cleanlinessRatings">
            <Controller
              as={<Rate />}
              id="cleanlinessRatings"
              name="cleanlinessRatings"
              defaultValue=""
              control={control}
            />
          </FormControl>
        </Col>
        <Col>
          <FormControl label="Food" htmlFor="foodRatings">
            <Controller
              as={<Rate />}
              id="foodRatings"
              name="foodRatings"
              defaultValue=""
              control={control}
            />
          </FormControl>
        </Col>
      </Row>
      <FormControl label="Do You have photos to share? (Optional)">
        <input type='file' multiple id="imageUpload" accept=".png, .jpg, .jpeg" onChange={handleChangeImages} />
      </FormControl>
      <FormControl>
        <Controller
          name="termsAndCondition"
          onChange={([e]) => {
            return e.target.checked;
          }}
          as={
            <Checkbox><p>
              I certify that this review is based on my own experience and
              I do not have any personal or business relationship with the
              hotel or have any incentive to provide it with a favourable review.
              Neither do I receive any payment from the facility for which this
              review was written. A fake review does not count toward NiceHouse's
              zero-tolerance policy.</p>
            </Checkbox>
          }
          control={control}
        />
      </FormControl>
      <FormControl className="submit-container">
        <Button htmlType="submit" type="primary" size="large">
          Submit Your Review
        </Button>
      </FormControl>
    </Form>
  );
};

export default ReviewForm;
