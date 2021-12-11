import React, { useState, useEffect } from 'react';
import { Popover } from 'antd';
import moment from 'moment';
import LikeDislike from './LikeDislike';
import Rating from '../Rating/Rating';
import { userAvatar, userAvatarUrl } from 'utils/AvatarUtils';
import { getAvatar } from 'services/authService';

const App = (props) => {
  const [imgAvatar, setImgAvatar] = useState('');

  const { singleReview } = props;
  const authorName = singleReview.user.fullName;
  const content = singleReview ? singleReview.text : '';
  const reviewTitle = singleReview ? singleReview.title : '';
  const commentDate = singleReview ? singleReview.createdAt : '';
  const postTime = new Date(commentDate).getTime();
  const reviewRating = singleReview ? singleReview.reviewFields : '';
  const authorRating = singleReview ? singleReview.ratings : 0;

  const getUserAvatar = async () => {
    const response = await getAvatar(singleReview.user.id);
    const json = await response.json();
    const path = json.data ? json.data.avatarUrl : '';
    setImgAvatar(userAvatarUrl(singleReview.user.id, path));
  }

  const reviewField = () => {
    let reviewArr = [];
    reviewArr.push({
      ratingFieldName: 'Cleanliness',
      rating: singleReview.reviewFields.cleanlinessRatings,
    });
    reviewArr.push({
      ratingFieldName: 'Food',
      rating: singleReview.reviewFields.foodRatings,
    });
    reviewArr.push({
      ratingFieldName: 'Rooms',
      rating: singleReview.reviewFields.roomsRatings,
    });
    reviewArr.push({
      ratingFieldName: 'Service',
      rating: singleReview.reviewFields.serviceRatings,
    });
    return reviewArr;
  }

  useEffect(() => {
    getUserAvatar()
  }, [])

  return (
    <div className="comment-area">
      <div className="comment-wrapper">
        <div className="comment-header">
          <div className="avatar-area">
            <div className="author-avatar">
              <img src={imgAvatar} alt={authorName} />
            </div>
            <div className="author-info">
              <h3 className="author-name">{authorName}</h3>
              {authorRating && (
                <div className="rating-widget">
                  <Rating
                    rating={authorRating}
                    type="individual"
                  />
                </div>
              )}
              <div className="comment-date">
                <Popover
                  placement="bottom"
                  content={moment(commentDate).format(
                    'dddd, MMMM Do YYYY, h:mm:ss a'
                  )}
                >
                  <span>Reviewd - {moment(postTime).fromNow()}</span>
                </Popover>
              </div>
            </div>
          </div>
          <div className="rating-area">
            <LikeDislike />
          </div>
        </div>
        <div className="comment-body">
          <h4>{reviewTitle}</h4>
          <p>{content}</p>
        </div>
        <div className="comment-rating">
          {reviewField() && reviewField().length !== 0
            ? reviewField().map((singleReviewRating, i) => {
              return (
                <div className="rating-widget" key={i}>
                  <Rating
                    key={i}
                    rating={singleReviewRating.rating}
                    ratingFieldName={singleReviewRating.ratingFieldName}
                    type="individual"
                  />
                </div>
              );
            })
            : ''}
        </div>
      </div>
    </div>
  );

}

export default App;
