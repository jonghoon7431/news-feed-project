import styled from 'styled-components';
import PostItem from '../components/PostItem';
import api from '../api/api';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const [myPosts, setMyPosts] = useState([]);
  // const [myIcon, setMyIcon] = useState();

  // const handleChangeImg = (e) => {
  //   const file = e.target.files[0];

  //   setMyIcon();

  //   // 클릭해서 파일 업로드하면 supabase에 올라가고, 동시에 그걸 내 프로필 사진으로 등록해 줘야 함< 1번 문제
  // };

  const user = useSelector((state) => state.auth.signedInUser);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const showMyPosts = async () => {
  //     if (!user) {
  //       navigate('/');
  //     }
  //     const posts = await api.posts.getMyPosts(user.id);
  //     setMyPosts(posts);
  //   };
  //   showMyPosts();
  // }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!user) {
        navigate('/');
      }

      const posts = await api.posts.getMyPosts(user.email);
      setMyPosts(posts);
    };

    fetchMyPosts();
  }, []);

  return (
    <>
      <MyPageArea>
        <ProfileArea>
          <ProfileIcon>
            <label htmlFor="profileFileUpload" id="profileFileUploadBtn">
              파일 업로드
            </label>
            <input type="file" id="profileFileUpload" style={{ display: 'none' }} />
            <img src="../assets/profile.png" />
          </ProfileIcon>
          <ProfileInfo>
            <ProfileId>{user && user.email}</ProfileId>
            <BlackHr1px />
            <ProfilePreview>내가 쓴 글 {myPosts.length}개</ProfilePreview>
          </ProfileInfo>
        </ProfileArea>
        <PostArea>
          {myPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </PostArea>
      </MyPageArea>
    </>
  );
}

const MyPageArea = styled.div`
  min-width: 100%;
  max-width: 100%;
  height: 100vh
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  width: 40%;
`;

const ProfileId = styled.div`
  padding: 0 0 0 3%;
  font-size: 35px;
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

const PostArea = styled.div`
  min-width: 100%;
  max-width: 100%;
  margin-top: 80px;
  background: #f3f4f6;
`;

export default MyPage;
