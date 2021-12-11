import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/UI/Card/Card';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import RenderReservationForm from './RenderReservationForm';
import { Button, Modal } from 'antd';
import AgentContact from '../../../container/Agent/AccountDetails/AgentContact';
import { getAuthor } from 'services/authService';

const CardHeader = ({ authorId, pricePeriodStyle, price, priceStyle }) => {
  const [contact, setContact] = useState(false);

  const [user, setUser] = useState({});

  const getAuthorInfo = async (id) => {
    const response = await getAuthor(id);
    const json = await response.json();
    if(json.statusCode == 200) {
      setUser(json.data);
    }
  }

  useEffect(async () => {
    await getAuthorInfo(authorId);
  }, [authorId])

  return (
    <Fragment>
      <Heading
        content={
          <Fragment>
            {price}$ <Text as="span" content="/ night" {...pricePeriodStyle} />
          </Fragment>
        }
        {...priceStyle}
      />
      <Button type="primary" onClick={() => setContact(true)}>
        Contact hotel
      </Button>
      <Modal
        visible={contact}
        onCancel={() => setContact(false)}
        footer={null}
        width="100%"
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        wrapClassName="review_modal"
      >
        <AgentContact
          fullName={user.fullName ? user.fullName : ''}
          phoneNumber={user.phoneNumber ? user.fullName : ''}
          email={user.email ? user.email : ''}
        />
      </Modal>
    </Fragment>
  );
};

export default function Reservation(props) {
  return (
    <Card
      className="reservation_sidebar"
      header={
        <CardHeader
          authorId={props.authorId}
          price={props.price}
          guest={props.guest}
        />
      }
      content={
        <RenderReservationForm
          authorId={props.authorId}
          room={props.room}
          guest={props.guest}
        />
      }
      footer={
        <p>
          {/* Special offers available. <TextLink to="/#1" content="See details" /> */}
        </p>
      }
    />
  );
}

CardHeader.propTypes = {
  priceStyle: PropTypes.object,
  pricePeriodStyle: PropTypes.object,
  linkStyle: PropTypes.object,
};

CardHeader.defaultProps = {
  priceStyle: {
    color: '#2C2C2C',
    fontSize: '25px',
    fontWeight: '700',
  },
  pricePeriodStyle: {
    fontSize: '15px',
    fontWeight: '400',
  },
  linkStyle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489',
  },
};
