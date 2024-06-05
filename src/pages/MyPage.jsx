import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../api/api';
import DefaultProfileUrl from '../assets/profile.png';
import PostItem from '../components/PostItem';
import SignOutBtn from '../components/SignOutBtn';
import supabase from '../supabaseClient';
import styled from 'styled-components';

function MyPage() {
  const [, setProfileImg] = useState([]);
  const [userId, setUserId] = useState('');
  const [myPosts, setMyPosts] = useState([]);
  const [profileUrl, setProfileUrl] = useState('');
  const refFileUploader = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUserData();
  }, []);

  const handleProfileImage = async (files) => {
    if (files.length === 0) {
      alert('파일을 선택해 주세요.');
      return;
    }

    const profile = files[0]; // 첫 번째 파일만 업로드하도록 설정
    const fileExt = profile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: storageError } = await supabase.storage.from('profileimg').upload(filePath, profile);

    if (storageError) {
      console.error('Storage error:', storageError.message);
      alert('잘못된 접근입니다: ' + storageError.message);
      return;
    }

    const { data, error: urlError } = supabase.storage.from('profileimg').getPublicUrl(filePath);

    if (urlError) {
      console.error('URL error:', urlError.message);
      alert('잘못된 접근입니다: ' + urlError.message);
      return;
    }

    const profileUrl = data.publicUrl;

    const { error: dbError } = await supabase
      .from('USER_PROFILE')
      .insert([{ profile_url: profileUrl, user_id: userId }]);

    if (dbError) {
      console.error('Database error:', dbError.message);
      alert('잘못된 접근입니다: ' + dbError.message);
    } else {
      alert('저장이 완료되었습니다');
      setProfileImg([]);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleProfileImage(files);
  };
  const contextUser = useSelector((state) => state.auth.signedInUser);
  const user = contextUser ?? {};

  useEffect(() => {
    const showMyPosts = async () => {
      const posts = await api.posts.getMyPosts(user.id);
      setMyPosts(posts);
    };
    showMyPosts();

    (async () => {
      const profileUrl = await api.profile.getMyProfile(user.id);
      if (profileUrl) {
        setProfileUrl(profileUrl);
      }
    })();
  }, [contextUser]);

  const handleRequestFileUpload = () => {
    refFileUploader.current.click();
  };

  return (
    <MyPageCon>
      <MyPageArea>
        <ProfileArea>
          <ProfileIcon className={`bg-[url('${DefaultProfileUrl}')]`}>
            {profileUrl ? (
              <img src={profileUrl} className="rounded-full" />
            ) : (
              <>
                <img
                  src={DefaultProfileUrl}
                  onClick={handleRequestFileUpload}
                  className="rounded-full cursor-pointer"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={refFileUploader}
                  className="invisible"
                />
              </>
            )}
          </ProfileIcon>
          <ProfileInfo>
            <ProfileId>
              {user.email}
              <SignOutBtn />
            </ProfileId>
            <BlackHr1px />
            <ProfilePreview>내가 쓴 글 {myPosts.length}개</ProfilePreview>
          </ProfileInfo>
        </ProfileArea>
        <BlackHr1px />
        <div className="postArea">
          {myPosts.map((myPost) => {
            <PostItem post={myPost} />;
          })}
        </div>
      </MyPageArea>
    </MyPageCon>
  );
}

// 라벨은 테일윈드로 원하는 디자인 처리

const MyPageCon = styled.div`
  color: black;
`;
// 추후 정리되는 대로 삭제

const MyPageArea = styled.div`
  min-width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffff;
`;

const ProfileArea = styled.form`
  min-width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: gray;
  margin: 0 5% 0 12%;
`;
// W/H 26% 씩으로 해도 됨.

const ProfileInfo = styled.div`
  width: 35%;
`;

const ProfileId = styled.div`
  padding: 0 0 0 3%;
  font-size: 40px;
  font-weight: 600;
`;

const ProfilePreview = styled.div`
  padding: 0 0 0 3%;
  font-size: 20px;
  font-weight: 550;
`;

const BlackHr1px = styled.div`
  margin: 10px 0 10px 0;
  background: #000;
  height: 1px;
  border: none;
`;

export default MyPage;

// 확인하고 싶을 때 주소/my_page
