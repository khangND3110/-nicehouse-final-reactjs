import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosStar } from 'react-icons/io';
import { Button, Input, Divider, Modal } from 'antd';
import CommentCard from 'components/UI/CommentCard/CommentCard';
import Heading from 'components/UI/Heading/Heading';
import ReviewForm from './ReviewForm';
import ReviewWrapper, {
  HeaderSection,
  RatingStatus,
  RatingSearch,
  ModalTitle,
} from './Review.style';
import { Element } from 'react-scroll';
import { getReviews } from 'services/reviewService';

const Search = Input.Search;
const CommentBox = (props) => {
  const { reviews } = props;
  return reviews && reviews.length !== 0
    ? reviews.map((item) => {
        return (
          <Fragment key={item.id}>
            <Divider />
            <CommentCard singleReview={item} />
          </Fragment>
        );
      })
    : 'No Review Found';
};

const Review = (props) => {
  const {
    apartmentId,
    ratingCount,
    statusHeadingStyle,
  } = props;

  const [state, setState] = useState({
    review: false,
    language: false,
  });

  const [reviews, setReviews] = useState([]);

  const handleModalOpen = (key) => {
    setState({ ...state, [key]: true });
  };
  const handleModalClose = (key) => {
    setState({ ...state, [key]: false });
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const fetchReviews = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await getReviews(token, apartmentId);
    const json = await response.json();
    setReviews(json.data);
    console.log(json.data);
  }

  useEffect(() => {
    fetchReviews();
  }, [])

  return (
    <Element name="reviews" className="reviews">
      <ReviewWrapper>
        <HeaderSection>
          <RatingStatus>
            <Heading
              content={`${ratingCount} Reviews`}
              {...statusHeadingStyle}
            />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
          </RatingStatus>
          <RatingSearch>
            <Button type="primary" onClick={() => handleModalOpen('review')}>
              Write a Review
            </Button>
            <Modal
              visible={state.review}
              onCancel={() => handleModalClose('review')}
              footer={null}
              width="100%"
              maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              wrapClassName="review_modal"
            >
              <ModalTitle>Write your review here</ModalTitle>
              <ReviewForm apartmentId={apartmentId} />
            </Modal>
          </RatingSearch>
        </HeaderSection>
        <CommentBox reviews={reviews} />
      </ReviewWrapper>
    </Element>
  );
};

Review.propTypes = {
  statusHeadingStyle: PropTypes.object,
  filterHeadingStyle: PropTypes.object,
  ratingLabelStyle: PropTypes.object,
  ratingCountStyle: PropTypes.object,
};

Review.defaultProps = {
  statusHeadingStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    mr: '10px',
  },
  filterHeadingStyle: {
    color: '#2C2C2C',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '1.2',
    mb: '0.5em',
  },
  ratingLabelStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#2c2c2c',
    flex: '1',
  },
  ratingCountStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#2c2c2c',
    ml: '8px',
  },
};

export default Review;
