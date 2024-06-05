import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';

function ReadPost({ setIsEdit, targetData, paramsId }) {
  const navigate = useNavigate();
  const signedInUser = useSelector((state) => state.auth.signedInUser);

  //!!: 값을 boolean 형태로
  const [isLoggedIn, setIsLoggedIn] = useState(!!signedInUser);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!signedInUser);
    if (signedInUser) {
      setUserId(signedInUser.id);
    } else {
      setUserId(null);
    }
  }, [signedInUser]);

  const { id, title, content, name, view, date, time, like, tag, image_url } = targetData;

  // 삭제
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    if (!isLoggedIn) return;

    const { error } = await supabase.from('POSTS').delete().eq('id', paramsId);

    if (error) {
      console.log(error);
      alert('다시 시도해주세요');
    } else {
      alert('삭제되었습니다');
      navigate(-1);
    }
  };

  // Like
  const postId = paramsId;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);

  //해당 게시물 해당 유저가 like 했는지 확인
  useEffect(() => {
    const checkLiked = async () => {
      if (isLoggedIn) {
        const { data, error } = await supabase
          .from('LIKES')
          .select('is_liked')
          .eq('post_id', postId)
          .eq('user_id', userId)
          .single();

        if (error) {
          console.log(error);
        } else {
          setLiked(data.is_liked);
        }
      }
    };

    checkLiked();
  }, [isLoggedIn, postId, userId]);

  //like 수 가져오기
  useEffect(() => {
    const fetchLikeCount = async () => {
      if (isLoggedIn) {
        const { data, error } = await supabase.from('POSTS').select('like').eq('id', paramsId).single();

        if (error) {
          console.log(error);
        } else {
          setLikeCount(data.like);
        }
      }
    };

    fetchLikeCount();
  }, [isLoggedIn, liked, paramsId]);

  //like 클릭 이벤트
  // 클릭 시 post id,user id 대조해서 LIKES테이블에 관련 정보가 있으면 업데이트
  //없으면 INSERT
  const isLikedHandler = async () => {
    if (!isLoggedIn) {
      if (confirm('로그인 후 이용 가능합니다, 로그인 하시겠습니까?')) {
        navigate('/login');
      } else {
        return;
      }
    }

    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    const { error } = await supabase
      .from('LIKES')
      .upsert(
        {
          post_id: postId,
          user_id: userId,
          is_liked: newLikedStatus,
        },
        { onConflict: ['post_id', 'user_id'] }
      )
      .select();

    if (error) {
      console.log(error);
    } else {
      const { data: postData, error: postError } = await supabase
        .from('POSTS')
        .select('like')
        .eq('id', paramsId)
        .single();

      if (postError) {
        console.log(postError);
      } else {
        const newLikeCount = newLikedStatus ? postData.like + 1 : postData.like - 1;

        const { data: updatedPostData, error: updateError } = await supabase
          .from('POSTS')
          .update({ like: newLikeCount })
          .eq('id', paramsId)
          .select()
          .single();

        if (updateError) {
          console.log(updateError);
        } else {
          setLikeCount(updatedPostData.like);
        }
      }
    }
  };

  //이미지 관련
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const urls = [];

      if (!targetData.image_url || targetData.image_url.length === 0) {
        setImageUrls([]);
        return;
      }

      for (const imageUrl of targetData.image_url) {
        try {
          const { data, error } = await supabase.storage.from('images').getPublicUrl(imageUrl);

          if (error) {
            console.log(error);
          } else {
            urls.push(data.publicUrl);
          }
        } catch (error) {
          console.log(error);
        }
      }

      setImageUrls(urls);
    };

    getImages();
  }, [targetData.image_url]);

  // View 증가
  useEffect(() => {
    const updateView = async () => {
      try {
        const { error } = await supabase
          .from('POSTS')
          .update({ view: view + 1 })
          .eq('id', paramsId)
          .select();
      } catch (error) {
        console.log(error);
      }
    };

    if (view !== undefined) {
      updateView();
    }
  }, [paramsId, view]);

  return (
    <article className="bg-white overflow-auto whitespace-pre-wrap break-words h-screen">
      <TitleSection className="flex flex-col flex-1 gap-2 justify-center py-4 px-4">
        <h1 className="pl-px text-2xl">{title}</h1>
        <div className="flex justify-between items-center mt-4">
          <p className="pl-3 font-bold text-base">{name}</p>
          <p className="text-base">
            {date} {time}
          </p>
        </div>
      </TitleSection>

      <ContentSection>
        {imageUrls.length > 0
          ? imageUrls.map((url, index) => <img key={index} src={url} alt={`post-image-${index}`} />)
          : null}

        <p>{content}</p>
        <EditButtonDiv $isLogIn={isLoggedIn}>
          <button onClick={() => setIsEdit(true)}>수정</button> | <button onClick={handleDelete}>삭제</button>
        </EditButtonDiv>
      </ContentSection>

      <ReactionSection>
        <ReactionDiv $isLiked={liked}>
          조회수 : {view}
          <FontAwesomeIcon icon="fa-solid fa-heart" className="heart" onClick={isLikedHandler} />
          {likeCount}
        </ReactionDiv>
        {tag && Array.isArray(tag) && tag.length > 0 ? tag.map((t, index) => <span key={index}>#{t} </span>) : null}
      </ReactionSection>

      <ButtonSection>
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        <WriteButton onClick={() => navigate('/create_post')}>글쓰기</WriteButton>
      </ButtonSection>
    </article>
  );
}

const Container = styled.div`
  background-color: white;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const TitleSection = styled.section`
  border-bottom: 1px solid black;
`;
const WriterInfoDiv = styled.div``;

const ContentSection = styled.section`
  height: auto;
  padding: 2rem;
  border-bottom: 1px solid black;
  & p {
    font-size: 1.2rem;
    line-height: 130%;
  }
`;
const EditButtonDiv = styled.div`
  display: ${(props) => (props.$isLogIn ? 'flex' : 'none')};
  justify-content: end;
`;

const ReactionSection = styled.section`
  height: 10vh;
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 2rem;
  border-bottom: 1px solid black;
`;
const ReactionDiv = styled.div`
  flex-direction: row;
  margin-bottom: 1rem;

  & .heart {
    color: ${(props) => (props.$isLiked ? 'red' : 'black')};
    cursor: pointer;
  }
`;

const ButtonSection = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  & button {
    cursor: pointer;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    font-size: 1.8rem;
  }
`;

const BackButton = styled.button``;
const WriteButton = styled.button``;
export default ReadPost;
