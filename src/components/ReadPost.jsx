import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';

function ReadPost({ setIsEdit, targetData, postId }) {
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

    const { error } = await supabase.from('POSTS').delete().eq('id', postId);

    if (error) {
      console.log(error);
      alert('다시 시도해주세요');
    } else {
      alert('삭제되었습니다');
      navigate(-1);
    }
  };

  // Like
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
          console.warn(error);
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
        const { data, error } = await supabase.from('POSTS').select('like').eq('id', postId).single();

        if (error) {
          console.error(error);
          alert('좋아요 수를 가져오는데에 일시적 오류가 발생했습니다');
        } else {
          setLikeCount(data.like);
        }
      }
    };

    fetchLikeCount();
  }, [isLoggedIn, liked, postId]);

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
      console.error(error);
    } else {
      const { data: postData, error: postError } = await supabase
        .from('POSTS')
        .select('like')
        .eq('id', postId)
        .single();

      if (postError) {
        console.error(postError);
      } else {
        const newLikeCount = newLikedStatus ? postData.like + 1 : postData.like - 1;

        const { data: updatedPostData, error: updateError } = await supabase
          .from('POSTS')
          .update({ like: newLikeCount })
          .eq('id', postId)
          .select()
          .single();

        if (updateError) {
          console.error(updateError);
          alert('잠시 후 다시 시도해주세요');
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
        const { data, error } = await supabase.storage.from('images').getPublicUrl(imageUrl);

        if (error) {
          console.log(error);
        } else {
          urls.push(data.publicUrl);
        }
      }

      setImageUrls(urls);
    };

    getImages();
  }, [targetData.image_url]);
  console.log(imageUrls);

  // View 증가
  useEffect(() => {
    const updateView = async () => {
      try {
        const { error } = await supabase
          .from('POSTS')
          .update({ view: view + 1 })
          .eq('id', postId)
          .select();
      } catch (error) {
        console.warn(error);
      }
    };

    if (view !== undefined) {
      updateView();
    }
  }, [postId, view]);

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

      <section className="h-auto p-8 border-b border-black">
        {imageUrls.length > 0
          ? imageUrls.map((url, index) => <img key={index} src={url} alt={`post-image-${index}`} />)
          : null}

        <p className="text-lg leading-loose">{content}</p>
        <EditButtonDiv $isLogIn={isLoggedIn}>
          <button onClick={() => setIsEdit(true)}>수정</button> | <button onClick={handleDelete}>삭제</button>
        </EditButtonDiv>
      </section>

      <ReactionSection className="h-[10vh] flex flex-col pt-4 pl-8 pb-0 border-b border-black">
        <ReactionDiv $isLiked={liked}>
          조회수 : {view}
          <FontAwesomeIcon icon="fa-solid fa-heart" className="heart" onClick={isLikedHandler} />
          {likeCount}
        </ReactionDiv>
        {tag && Array.isArray(tag) && tag.length > 0 ? tag.map((t, index) => <span key={index}>#{t} </span>) : null}
      </ReactionSection>

      <section className="h-[10vh] flex justify-center items-center gap-[2vw]">
        <button className="cursor-pointer text-2xl py-2 px-4 text-[1.8rem]" onClick={() => navigate(-1)}>
          뒤로가기
        </button>
        <button className="cursor-pointer text-2xl py-2 px-4 text-[1.8rem]" onClick={() => navigate('/create_post')}>
          글쓰기
        </button>
      </section>
    </article>
  );
}

const TitleSection = styled.section`
  border-bottom: 1px solid black;
`;

const EditButtonDiv = styled.div`
  display: ${(props) => (props.$isLogIn ? 'flex' : 'none')};
  justify-content: end;
`;

const ReactionSection = styled.section`
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
