import React, { useState, useContext, useEffect } from 'react';
import Sticky from 'react-stickynode';
import { withRouter } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { Button, Drawer } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import Text from 'components/UI/Text/Text';
import TextLink from 'components/UI/TextLink/TextLink';
import Navbar from 'components/Navbar/Navbar';
import { AuthContext } from 'context/AuthProvider';
import { LayoutContext } from 'context/LayoutProvider';
import useWindowSize from 'library/hooks/useWindowSize';
import { AGENT_PROFILE_PAGE, USER_IMAGE_URL } from 'settings/constant';
import AuthMenu from './AuthMenu';
import MainMenu from './MainMenu';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';
import NavbarSearch from './NavbarSearch';
import HeaderWrapper, {
  MobileNavbar,
  CloseDrawer,
  AvatarWrapper,
  AvatarImage,
  AvatarInfo,
  LogoArea,
} from './Header.style';
import { userAvatar } from 'utils/AvatarUtils';

const avatarDefault = `https://i.pinimg.com/564x/6c/d7/fe/6cd7fe3d3a9952e5667e13af9fff0c17.jpg`;
const LogoIcon = () => (
  <svg width="25" height="27.984" viewBox="0 0 25 27.984">
    <g transform="translate(0 0)">
      <path
        d="M28.88,8.56l-4.61,4.62V5l-6-3L11.73,8.5v2.15L7.57,8.56l-6.5,6.5v17h0V34H34.93V11.59ZM11.73,32.11h-3V11.23l3,1.52Zm10.67,0h-3V4.67l3,1.52V31.85h0Zm10.65,0H30V11.23l3,1.52Z"
        transform="translate(-2 -2.45)"
        fill="#fff"
      />
    </g>
  </svg>
);

export default withRouter(function Header({ location }) {
  const [{ searchVisibility }] = useContext(LayoutContext);
  const { loggedIn, user } = useContext(AuthContext);
  const { width } = useWindowSize();
  const [state, setState] = useState(false);

  const sidebarHandler = () => {
    setState(!state);
  };

  const headerType = location.pathname === '/' ? 'transparent' : 'default';

  return (
    <HeaderWrapper>
      <Sticky
        top={headerType === 'transparent' ? -1 : 0}
        innerZ={10001}
        activeClass="isHeaderSticky"
      >
        {width > 991 ? (
          <Navbar
            logo={
              <>
                {headerType === 'transparent' && <LogoIcon />}
                <Logo
                  withLink
                  linkTo="/"
                  src="/images/logo.svg"
                  title="NiceHouse."
                />
              </>
            }
            navMenu={<MainMenu />}
            authMenu={<AuthMenu />}
            isLogin={loggedIn}
            avatar={<Logo src={userAvatar(user)} />}
            profileMenu={<ProfileMenu avatar={<Logo src={userAvatar(user)} />} />}
            headerType={headerType}
            searchComponent={<NavbarSearch />}
            location={location}
            searchVisibility={searchVisibility}
          />
        ) : (
          <MobileNavbar className={headerType}>
            <LogoArea>
              <>
                {headerType === 'transparent' && <LogoIcon />}
                <Logo
                  withLink
                  linkTo="/"
                  src="/images/logo.svg"
                  title="NiceHouse."
                />
              </>
              <NavbarSearch />
            </LogoArea>
            <Button
              className={`hamburg-btn ${state ? 'active' : ''}`}
              onClick={sidebarHandler}
            >
              <span />
              <span />
              <span />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={sidebarHandler}
              width="285px"
              className="mobile-header"
              visible={state}
            >
              <CloseDrawer>
                <button onClick={sidebarHandler}>
                  <IoIosClose />
                </button>
              </CloseDrawer>
              {loggedIn ? (
                <AvatarWrapper>
                  <AvatarImage>
                    <Logo src={userAvatar(user)} />
                  </AvatarImage>
                  <AvatarInfo>
                    <Text as="h3" content="Nova Scotia" />
                    <TextLink
                      link={AGENT_PROFILE_PAGE}
                      content="View Profile"
                    />
                  </AvatarInfo>
                </AvatarWrapper>
              ) : (
                <AuthMenu className="auth-menu" />
              )}
              <MobileMenu className="main-menu" />
            </Drawer>
          </MobileNavbar>
        )}
      </Sticky>
    </HeaderWrapper>
  );
});
