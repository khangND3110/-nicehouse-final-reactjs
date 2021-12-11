import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, Select, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { FormTitle } from './AccountSettings.style';
import { updateProfile } from 'services/authService';
import { useHistory } from 'react-router-dom';

const AgentCreateOrUpdateForm = () => {
  let history = useHistory();
  const { control, errors, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const token = localStorage.getItem("accessToken");
    const response = await updateProfile(token, data);
    const json = await response.json();
    history.push(`/profile`);
  };
  return (
    <Fragment>
      <FormTitle>Basic Information</FormTitle>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={30}>
          <Col lg={24}>
            <FormControl
              label="Full name"
              htmlFor="fullName"
              error={errors.firstName && <span>This field is required!</span>}
            >
              <Controller
                as={<Input />}
                id="fullName"
                name="fullName"
                defaultValue=""
                control={control}
                rules={{ required: true }}
              />
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col lg={24}>
            <FormControl
              label="Phone number"
              htmlFor="phoneNumber"
              error={
                errors.phoneNumber && (
                  <>
                    {errors.phoneNumber?.type === 'required' && (
                      <span>This field is required!</span>
                    )}
                    {errors.phoneNumber?.type === 'pattern' && (
                      <span>Please enter your valid number!</span>
                    )}
                  </>
                )
              }
            >
              <Controller
                as={<Input />}
                id="phoneNumber"
                name="phoneNumber"
                defaultValue=""
                control={control}
                rules={{
                  required: true,
                  pattern: /^[0-9]*$/,
                }}
              />
            </FormControl>
          </Col>
          <Col lg={24}>
            <FormControl
              label="Describe Yourself (Optional)"
              htmlFor="content"
            >
              <Controller
                as={<Input.TextArea rows={5} />}
                id="content"
                name="content"
                defaultValue=""
                control={control}
              />
            </FormControl>
          </Col>
        </Row>
        <div className="submit-container">
          <Button htmlType="submit" type="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default AgentCreateOrUpdateForm;
