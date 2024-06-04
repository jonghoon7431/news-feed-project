import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';

function ReadPost({ setIsEdit, targetData, paramsId }) {
  // 로그인 상태 임시지정(true)
  const isLogIn = true;

  const { id, title, content, name, view, date, time, like, tag, image_url = '' } = targetData;

  const navigate = useNavigate();

  // 삭제
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    if (!isLogIn) return;

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
  // user_id 임시지정
  const userId = '1c0a7dce-a433-4150-9acd-feaf9b51f218';
  const postId = paramsId;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);

  useEffect(() => {
    const checkLiked = async () => {
      //upsert로 변경?
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
    };

    if (isLogIn) {
      checkLiked();
    }
  }, [isLogIn, postId, userId]);

  useEffect(() => {
    const fetchLikeCount = async () => {
      const { data, error } = await supabase.from('POSTS').select('like').eq('id', paramsId).single();

      if (error) {
        console.log(error);
      } else {
        setLikeCount(data.like);
      }
    };

    fetchLikeCount();
  }, [liked, postId]);

  const isLikedHandler = async () => {
    if (!isLogIn) return alert('로그인 후 이용 가능합니다');

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
  // 즉시 적용은 안 되고, 새로고침하거나 다른 페이지로 이동하면 적용됨
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
    <Container>
      <TitleSection>
        <h1>{title}</h1>
        <WriterInfoDiv>
          <p>{name}</p>
          <p>
            {date} {time}
          </p>
        </WriterInfoDiv>
      </TitleSection>

      <ContentSection>
        {imageUrls.length > 0
          ? imageUrls.map((url, index) => <img key={index} src={url} alt={`post-image-${index}`} />)
          : null}

        <p>{content}</p>
        <EditButtonDiv $isLogIn={isLogIn}>
          <button onClick={() => setIsEdit(true)}>수정</button> | <button onClick={handleDelete}>삭제</button>
        </EditButtonDiv>
      </ContentSection>

      <ReactionSection>
        <ReactionDiv $isLiked={liked}>
          조회수 : {view}
          <FontAwesomeIcon icon="fa-solid fa-heart" className="heart" onClick={isLikedHandler} />
          {likeCount}
        </ReactionDiv>
        {/* TODO 태그 저장 방식 변경해야함 */}#{tag}
      </ReactionSection>

      <ButtonSection>
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        <WriteButton onClick={() => navigate('/create_post')}>글쓰기</WriteButton>
      </ButtonSection>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const TitleSection = styled.section`
  height: 10vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid black;
  & h1 {
    font-size: 2rem;
    font-weight: bold;
  }
  & p {
    font-size: 1rem;
  }
`;
const WriterInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

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
