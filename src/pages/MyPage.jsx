import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import api from '../api/api';
import DefaultProfileUrl from '../assets/profile.png';
import PostList from '../components/PostList';
import supabase from '../supabaseClient';

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
    const fetchMyPosts = async () => {
      const posts = await api.posts.getMyPosts(user.email);
      setMyPosts(posts);
    };

    fetchMyPosts();

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
    <>
      <div className="min-w-full max-w-full flex items-center justify-center flex-col">
        <div className="min-w-full max-w-full max-h-20vh flex items-center justify-center">
          <div className="w-1/4 h-1/4 flex items-center justify-center rounded-full my-0 mr-5 ">
            {profileUrl ? (
              <img src={profileUrl} className="rounded-full h-full w-full" />
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
          </div>
          <div className="w-2/5">
            <div className="font-semibold text-4xl">{user && user.email}</div>
            <div className="bg-black h-0.5 mt-3 mb-1" />
            <div className="font-semibold text-xl">내가 쓴 글 {myPosts.length}개</div>
          </div>
        </div>
        <div className="min-w-full max-w-full min-h-70vh mt-20">
          <PostList title="내가 작성한 글" list={myPosts} />
        </div>
      </div>
    </>
  );
}

export default MyPage;
