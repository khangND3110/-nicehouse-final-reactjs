import React, { useContext } from 'react';
import { Button } from 'antd';
import Heading from 'components/UI/Heading/Heading';
import { AgentPictureUploader, FormTitle } from './AccountSettings.style';
import { useState } from 'react/cjs/react.development';
import { Upload } from 'antd';
import { updateAvatar } from 'services/authService';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'context/AuthProvider';

export default function AgentPictureChangeForm() {
  const [avatar, setAvatar] = useState({})
  const [background, setBackground] = useState({})
  const history = useHistory();
  const { isUserLoggedIn } = useContext(AuthContext);

  const onSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const data = new FormData();
    data.append('avatar', avatar);
    data.append('background', background);
    const response = await updateAvatar(token, data);
    const json = await response.json();
    if(json.statusCode = 200) {
      isUserLoggedIn();
      history.push('/');
    }
  }

  const handleChangeAvatar = event => {
    let avatar = event.target.files[0];
    // console.log(event.target.files[0]);
    setAvatar(avatar);
  };

  const handleChangeBackground = event => {
    let background = event.target.files[0];
    setBackground(background);
  };

  const Dragger = Upload.Dragger;

  return (
    <AgentPictureUploader>
      <FormTitle>Profile Images</FormTitle>
      <Heading content="Cover Image" as="h4" />
      <div className="clearfix">
        <input type="file" onChange={handleChangeAvatar} />
      </div>
      <Heading content="Profile Image" as="h4" />
      <div className="clearfix">
        <input type="file" onChange={handleChangeBackground} />
      </div>

      <div className="submit-container">
        <Button htmlType="submit" type="primary" onClick={() => onSubmit()}>
          Save Changes
        </Button>
      </div>
    </AgentPictureUploader>
  );
}
