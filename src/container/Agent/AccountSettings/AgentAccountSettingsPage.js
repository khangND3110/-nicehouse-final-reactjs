import React, { useContext } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import { Row, Col, Menu, Avatar } from 'antd';
import Container from 'components/UI/Container/Container.style';
import AgentPictureChangeForm from './AgentPictureChangeForm';
import AgentCreateOrUpdateForm from './AgentCreateOrUpdateForm';
import ChangePassWord from './ChangePassWordForm';
import {
  AGENT_IMAGE_EDIT_PAGE,
  AGENT_PASSWORD_CHANGE_PAGE,
  AGENT_PROFILE_PAGE,
  USER_IMAGE_URL,
} from 'settings/constant';
import AccountSettingWrapper, {
  AccountSidebar,
  AgentAvatar,
  SidebarMenuWrapper,
  ContentWrapper,
  AgentName,
  FromWrapper,
} from './AccountSettings.style';
import { AuthContext } from 'context/AuthProvider';

const AccountSettingNavLink = (props) => {
  const { match } = props;
  return (
    <SidebarMenuWrapper>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1">
          <NavLink exact to={`${match.url}`}>
            Edit Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to={`${match.url}${AGENT_IMAGE_EDIT_PAGE}`}>
            Change Photos
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to={`${match.url}${AGENT_PASSWORD_CHANGE_PAGE}`}>
            Change Password
          </NavLink>
        </Menu.Item>
      </Menu>
    </SidebarMenuWrapper>
  );
};

const AccountSettingRoute = (props) => {
  const { match } = props;
  return (
    <FromWrapper>
      <Route exact path={`${match.path}`} component={AgentCreateOrUpdateForm} />
      <Route
        path={`${match.path}${AGENT_IMAGE_EDIT_PAGE}`}
        component={AgentPictureChangeForm}
      />
      <Route
        path={`${match.path}${AGENT_PASSWORD_CHANGE_PAGE}`}
        component={ChangePassWord}
      />
    </FromWrapper>
  );
};

export default function AgentAccountSettingsPage(props) {
  const avatarDefault = `https://i.pinimg.com/564x/6c/d7/fe/6cd7fe3d3a9952e5667e13af9fff0c17.jpg`;
  const userAvatar = () => {
    if(user != null) {
      if(user.id != null && user.avatarImage.avatarUrl != null) {
        const avatar = `${USER_IMAGE_URL}/${user.id}/${user.avatarImage.avatarUrl}`
        return avatar
      } else {
        return avatarDefault;
      }
    } else {
      return avatarDefault;
    }
  }
  const { user } = useContext(AuthContext);
  return (
    <AccountSettingWrapper>
      <Container fullWidth={true}>
        <Row gutter={30}>
          <Col md={9} lg={6}>
            <AccountSidebar>
              <AgentAvatar>
                <Avatar
                  src={userAvatar()}
                  alt="avatar"
                />
                <ContentWrapper>
                  <AgentName>{user.fullName}</AgentName>
                  <Link to={AGENT_PROFILE_PAGE}>View profile</Link>
                </ContentWrapper>
              </AgentAvatar>
              <AccountSettingNavLink {...props} />
            </AccountSidebar>
          </Col>
          <Col md={15} lg={18}>
            <AccountSettingRoute {...props} />
          </Col>
        </Row>
      </Container>
    </AccountSettingWrapper>
  );
}
