import styled from "styled-components";

export const HashTagWrap = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:flex-end;
`

export const Btn = styled.button`
  border-radius: 7px;
  padding:10px;
`
export const TagBtn = styled(Btn)`
  &:hover{
    background-color:#CCC;
    transition:all 0.2s;
  }
`
export const TagSpan = styled.span`
  padding:5px 10px;
  background-color:white;
  border-radius:5px;
`