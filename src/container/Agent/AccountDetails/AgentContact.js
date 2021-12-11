import React, {  } from 'react';
import { Row, Col } from 'antd';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import ContactForm from 'components/ContactForm/ContactFrom';
import { AgentContactWrapper, ContactDetails } from './AgentDetails.style';

const AgentContact = (props) => {
  return (
    <AgentContactWrapper>
      <Heading content="Send Message" />
      <Row gutter={30}>
        <Col lg={16}>
          <ContactForm email={props.email} />
        </Col>
        <Col lg={8}>
          <ContactDetails>
          <Heading as="h3" content="Full name" />
            <Text content={props.fullName} />
            <Heading as="h3" content="Phone No" />
            <Text content={props.phoneNumber} />
            <Heading as="h3" content="Email" />
            <Text content={props.email} />
          </ContactDetails>
        </Col>
      </Row>
    </AgentContactWrapper>
  );
};

export default AgentContact;
