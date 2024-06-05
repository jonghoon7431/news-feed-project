import styled from 'styled-components';
import PostItem from '../components/PostItem';
import api from '../api/api';
import Header from '../components/Header';
import { useState, useEffect } from 'react';

function MyPage() {
  const [myPosts, setMyPosts] = useState([]);
  const [myIcon, setMyIcon] = useState();

  const handleChangeImg = (e) => {
    const file = e.target.files[0];

    setMyIcon();

    // 클릭해서 파일 업로드하면 supabase에 올라가고, 동시에 그걸 내 프로필 사진으로 등록해 줘야 함< 1번 문제
  };

  useEffect(() => {
    async () => setMyPosts(await api.posts.getMyPosts());
  }, []);

  return (
    <MyPageCon>
      <MyPageArea>
        <Header />
        <ProfileArea>
          <ProfileIcon>
            <label htmlFor="profileFileUpload" id="profileFileUploadBtn">
              파일 업로드
            </label>
            <input type="file" id="profileFileUpload" style={{ display: 'none' }} onChange={handleChangeImg} />
            <img src="../assets/profile.png" />
          </ProfileIcon>
          <ProfileInfo>
            <ProfileId>아이디abc</ProfileId>
            <BlackHr1px />
            <ProfilePreview>내가 쓴 글 1개</ProfilePreview>
          </ProfileInfo>
        </ProfileArea>
        <BlackHr1px />
        <div className="postArea">
          <PostItem
            post={{
              title: 'a',
              view: 5,
              like: 10,
            }}
          />
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

const ProfileArea = styled.div`
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
