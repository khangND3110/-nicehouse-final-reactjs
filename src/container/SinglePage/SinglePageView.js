import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'library/hooks/useLocation';
import Sticky from 'react-stickynode';
import { Row, Col, Modal, Button } from 'antd';
import Container from 'components/UI/Container/Container';
import Loader from 'components/Loader/Loader';
import useWindowSize from 'library/hooks/useWindowSize';
import Description from './Description/Description';
import Amenities from './Amenities/Amenities';
import Location from './Location/Location';
import Review from './Review/Review';
import Reservation from './Reservation/Reservation';
import BottomReservation from './Reservation/BottomReservation';
import TopBar from './TopBar/TopBar';
import SinglePageWrapper, { PostImage } from './SinglePageView.style';
import PostImageGallery from './ImageGallery/ImageGallery';
import useDataApi from 'library/hooks/useDataApi';
import isEmpty from 'lodash/isEmpty';
import { getApartmentDetail } from 'services/apartmentService';
import { APARTMENT_IMAGE_URL, BASE_URL } from 'settings/constant';
import { apartmentImageFisrt } from 'utils/ImageApartmentUtils';

const SinglePage = ({ match }) => {
  const [apartment, setApartment] = useState({});

  const { href } = useLocation();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const { width } = useWindowSize();

  let url = '/data/hotel-single.json';
  if (!match.params.slug) {
    url += match.params.slug;
  }

  console.log(match.params);

  useEffect(async () => {
    await fetchApartmentDetail();
  }, []);

  const fetchApartmentDetail = async () => {
    const id = match.params.slug;
    const response = await getApartmentDetail(id);
    const json = await response.json();
    if (json.statusCode == 200) {
      setApartment(json.data);
      console.log(json.data.authorId);
    }
  }

  const { data, loading } = useDataApi(url);
  if (isEmpty(data) || loading) return <Loader />;
  const {
    reviews,
    rating,
    ratingCount,
    price,
    title,
    gallery,
    location,
    content,
    amenities,
    author,
  } = data[0];

  return (
    <SinglePageWrapper>
      <PostImage>
        <img
          className="absolute"
          src={apartmentImageFisrt(apartment)}
          alt="Listing details page banner"
        />
        <Button
          type="primary"
          onClick={() => setIsModalShowing(true)}
          className="image_gallery_button"
        >
          View Photos
        </Button>
        <Modal
          visible={isModalShowing}
          onCancel={() => setIsModalShowing(false)}
          footer={null}
          width="100%"
          maskStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
          wrapClassName="image_gallery_modal"
          closable={false}
        >
          <Fragment>
            <PostImageGallery images={apartment.images} />
            <Button
              onClick={() => setIsModalShowing(false)}
              className="image_gallery_close"
            >
              <svg width="16.004" height="16" viewBox="0 0 16.004 16">
                <path
                  id="_ionicons_svg_ios-close_2_"
                  d="M170.4,168.55l5.716-5.716a1.339,1.339,0,1,0-1.894-1.894l-5.716,5.716-5.716-5.716a1.339,1.339,0,1,0-1.894,1.894l5.716,5.716-5.716,5.716a1.339,1.339,0,0,0,1.894,1.894l5.716-5.716,5.716,5.716a1.339,1.339,0,0,0,1.894-1.894Z"
                  transform="translate(-160.5 -160.55)"
                  fill="#909090"
                />
              </svg>
            </Button>
          </Fragment>
        </Modal>
      </PostImage>

      <TopBar title={apartment.title} shareURL={href} author={author} media={gallery} />

      <Container>
        <Row gutter={30} id="reviewSection" style={{ marginTop: 30 }}>
          <Col xl={16}>
            <Description
              content={apartment.content}
              title={apartment.title}
              location={location}
              rating={rating}
              ratingCount={ratingCount}
            />
            <Amenities amenities={apartment.amenities} />
            <Location location={apartment} />
          </Col>
          <Col xl={8}>
            {width > 1200 ? (
              <Sticky
                innerZ={999}
                activeClass="isSticky"
                top={202}
                bottomBoundary="#reviewSection"
              >
                <Reservation
                  price={apartment.price}
                  room={apartment.bedRoom}
                  guest={apartment.guest}
                  authorId={apartment.authorId}
                />
              </Sticky>
            ) : (
              <BottomReservation
                title={apartment.title}
                price={apartment.price}
                guest={apartment.guest}
                rating={rating}
                authorId={apartment.authorId}
                ratingCount={ratingCount}
              />
            )}
          </Col>
        </Row>
        <Row gutter={30}>
          <Col xl={16}>
            <Review
              apartmentId={match.params.slug}
              reviews={reviews}
              ratingCount={ratingCount}
              rating={rating}
            />
          </Col>
          <Col xl={8} />
        </Row>
      </Container>
    </SinglePageWrapper>
  );
};

export default SinglePage;
