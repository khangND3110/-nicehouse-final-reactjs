import React, { useContext, Fragment } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import {
  IoLogoFacebook,
  IoIosAdd,
} from 'react-icons/io';
import { Menu, Popover } from 'antd';
import Container from 'components/UI/Container/Container';
import Image from 'components/UI/Image/Image';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import { ProfilePicLoader } from 'components/UI/ContentLoader/ContentLoader';
import Loader from 'components/Loader/Loader';
import AuthProvider, { AuthContext } from 'context/AuthProvider';
import AgentItemLists from './AgentItemLists';
import AgentFavItemLists from './AgentFavItemLists';
import AgentContact from './AgentContact';
import useDataApi from 'library/hooks/useDataApi';
import {
  ADD_HOTEL_PAGE,
  AGENT_PROFILE_FAVOURITE,
  AGENT_PROFILE_CONTACT,
} from 'settings/constant';
import AgentDetailsPage, {
  BannerSection,
  UserInfoArea,
  ProfileImage,
  ProfileInformationArea,
  ProfileInformation,
  SocialAccount,
  NavigationArea,
} from './AgentDetails.style';
import { userAvatar, userBackground } from 'utils/AvatarUtils';

const ProfileNavigation = (props) => {
  const { match, className } = props;
  const { loggedIn } = useContext(AuthContext);
  return (
    <NavigationArea>
      <Container fluid={true}>
        <Menu className={className}>
          <Menu.Item key="0">
            <NavLink exact to={`${match.url}`}>
              Listing
            </NavLink>
          </Menu.Item>
          <Menu.Item key="1">
            <NavLink to={`${match.url}${AGENT_PROFILE_FAVOURITE}`}>
              Favourite
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to={`${match.url}${AGENT_PROFILE_CONTACT}`}>
              Contact
            </NavLink>
          </Menu.Item>
        </Menu>

        {loggedIn && (
          <Link className="add_card" to={ADD_HOTEL_PAGE}>
            <IoIosAdd /> Add Hotel
          </Link>
        )}
      </Container>
    </NavigationArea>
  );
};

const ProfileRoute = (props) => {
  const { match } = props;
  return (
    <Container fluid={true}>
      <Route exact path={`${match.path}`} component={AgentItemLists} />
      <Route
        path={`${match.path}${AGENT_PROFILE_FAVOURITE}`}
        component={AgentFavItemLists}
      />
      <Route
        path={`${match.path}${AGENT_PROFILE_CONTACT}`}
        component={AgentContact}
      />
    </Container>
  );
};

const AgentProfileInfo = (props) => {
  const { data, loading } = useDataApi('/data/agent.json');
  if (isEmpty(data) || loading) return <Loader />;
  const {
    first_name,
    last_name,
    content,
    profile_pic,
    cover_pic,
    social_profile,
  } = data[0];

  return (
    <Fragment>
      <BannerSection>
        {props.backgroundUrl != null ? (
          <Image className="absolute" src={props.backgroundUrl} alt="Profile cover" />
        ) : (
          <Image className="absolute" src={'http://s3.amazonaws.com/redqteam.com/tripfinder-images/coverpic2.png'} alt="Profile cover" />
        )}
      </BannerSection>
      <UserInfoArea>
        <Container fluid={true}>
          <ProfileImage>
            {props.avatarUrl != null ? (
              <Image src={props.avatarUrl} alt="Profile" />
            ) : (
              <ProfilePicLoader />
            )}
          </ProfileImage>
          <ProfileInformationArea>
            <ProfileInformation>
              <Heading content={props.fullName} />
              <Text content={props.content} />
            </ProfileInformation>
            <SocialAccount>
              <Popover content="Facebook">
                <a
                  href={'https://www.facebook.com/profile.php?id=100006469144967'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoFacebook className="facebook" />
                </a>
              </Popover>
            </SocialAccount>
          </ProfileInformationArea>
        </Container>
      </UserInfoArea>
    </Fragment>
  );
};

export default function AgentDetailsViewPage(props) {
  const { user } = useContext(AuthContext);

  return (
    <AgentDetailsPage>
      <AuthProvider>
        <AgentProfileInfo
          fullName={user.fullName}
          content={user.content}
          avatarUrl={userAvatar(user)}
          backgroundUrl={userBackground(user)}
        />
        <ProfileNavigation {...props} />
        <ProfileRoute {...props} />
      </AuthProvider>
    </AgentDetailsPage>
  );
}
