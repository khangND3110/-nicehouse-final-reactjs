import React, { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { BASE_URL } from 'settings/constant';
import { getImagePath } from 'utils/ImageApartmentUtils';
import ImageGalleryWrapper from './ImageGallery.style';

const images = [
  {
    original: '/images/post-image-1.jpg',
    thumbnail: '/images/post-thumb-1.jpg',
  },
  {
    original: '/images/post-image-2.jpg',
    thumbnail: '/images/post-thumb-2.jpg',
  },
];

const PostImageGallery = (props) => {
  const { images } = props;
  const formatImage = () => {
    let arr = [];
    images.map(item => {
      arr.push({
        original: getImagePath(item),
        thumbnail: getImagePath(item),
      })
    });
    return arr;
  }

  useEffect(() => {
    console.log(formatImage());
  });

  return (
    <ImageGalleryWrapper>
      <ImageGallery
        items={formatImage()}
        showPlayButton={false}
        showFullscreenButton={false}
        showIndex={true}
        lazyLoad={true}
        slideDuration={550}
      />
    </ImageGalleryWrapper>
  );
};

export default PostImageGallery;
