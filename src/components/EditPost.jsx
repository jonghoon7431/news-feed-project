import supabase from '../supabaseClient';

function EditPost({ targetData, setTargetData, setIsEdit, postId }) {
  const { title, content, tag } = targetData;

  const onChangeHandler = (e) => {
    setTargetData({ ...targetData, [e.target.name]: e.target.value });
  };

  const editHandler = async () => {
    const { error } = await supabase
      .from('POSTS')
      .update({
        title: title,
        content: content,
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
      <input type="text" value={tag} name="tag" onChange={onChangeHandler} />
      <button onClick={editHandler}>수정 완료</button>
    </div>
  );
}

export default EditPost;
