import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';

function EditPost({ targetData, setTargetData, setIsEdit, postId }) {
  const navigate = useNavigate();
  const { title, content, tag } = targetData;

  const onChangeHandler = (e) => {
    if (e.target.name === 'tag') {
      const tags = e.target.value.split(',').map((tag) => tag.trim());
      setTargetData({ ...targetData, [e.target.name]: tags });
    } else {
      setTargetData({ ...targetData, [e.target.name]: e.target.value });
    }
  };

  const editHandler = async () => {
    const { error } = await supabase
      .from('POSTS')
      .update({
        title: title,
        content: content,
        tag: tag,
      })
      .eq('id', postId);
    if (error) {
      console.error(error);
      alert('수정 실패. 잠시 후 다시 시도해주세요');
    } else {
      alert('수정되었습니다');
      setIsEdit(false);
    }
  };
  return (
    <div>
      <input type="text" value={title} name="title" onChange={onChangeHandler} />
      <textarea type="text" value={content} name="content" onChange={onChangeHandler} />
      <input
        type="text"
        value={tag}
        name="tag"
        onChange={onChangeHandler}
        placeholder="태그는 ,를 기준으로 하나씩 작성 부탁드립니다"
      />
      <button onClick={editHandler}>수정 완료</button>
      <button onClick={() => setIsEdit(false)}>취소</button>
    </div>
  );
}

export default EditPost;
