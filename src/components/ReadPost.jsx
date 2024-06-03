import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigationType } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';

function ReadPost({ setIsEdit, targetData, paramsId }) {
  const isLogin = false;

  const { title, content, name, view, date, time, like, tag } = targetData;

  const navigate = useNavigationType();

  //삭제
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    if (!isLogin) return;

    const { error } = await supabase.from('POSTS').delete().eq('id', paramsId);

    if (error) {
      console.log(error);
      alert('다시 시도해주세요');
    } else {
      alert('삭제되었습니다');
      navigate(-1);
    }
  };

  // let tagArr = [...tag];
  // console.log(tagArr);
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
        <p>{content}</p>
        {/* TODO 로그인 상태 연결 */}
        <EditButtonDiv $isLogIn={true}>
          <button onClick={() => setIsEdit(true)}>수정</button> | <button onClick={handleDelete}>삭제</button>
        </EditButtonDiv>
      </ContentSection>

      <ReactionSection>
        <ReactionDiv>
          조회수 : {view} <button>like</button>
          <FontAwesomeIcon icon="fa-regular fa-heart" />
          {like}
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
