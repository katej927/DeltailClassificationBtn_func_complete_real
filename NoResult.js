import React from "react";
import styled from "styled-components";

export default function NoResult() {
  console.log("NoResult 진입");

  return <NoResultWrapper>검색 결과가 없습니다.</NoResultWrapper>;
}

const NoResultWrapper = styled.section``;
