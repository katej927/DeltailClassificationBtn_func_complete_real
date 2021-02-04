import React from "react";
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import "./ClassificationBoxCheckbox.scss";

export default function ClassificationBoxCheckbox({
  categories,
  state,
  isCheckedCategoryName,
  checkedNames,
}) {
  const matchedAllBtn = checkedNames.some((name) => {
    return name === "전체 보기";
  });
  return (
    <ClassificationBoxCheckboxWrapper>
      <Label>
        <input
          type="checkbox"
          value="전체 보기"
          name="seeAllCategories"
          onClick={isCheckedCategoryName}
          id="전체 보기"
        />
        <DataLabel for="전체 보기">
          <IconDiv>
            {matchedAllBtn && <AiOutlineCheck size={10} color="#006633" />}
          </IconDiv>
        </DataLabel>
        <CheckboxText>전체 보기</CheckboxText>
      </Label>

      {categories.map((category) => {
        const matchedCheckbox = checkedNames.filter((name) => {
          return name === category.name;
        });
        return (
          <Label>
            <input
              type="checkbox"
              value={category.name}
              // name={"subcategoryCheckboxId" + category.subcategory_id}
              name="subcategoryCheckboxId1"
              onClick={isCheckedCategoryName}
              id={category.name}
            />
            <DataLabel for={category.name} isMatch={matchedCheckbox}>
              <IconDiv>
                {category.name == matchedCheckbox && (
                  <AiOutlineCheck size={10} color="#006633" />
                )}
              </IconDiv>
            </DataLabel>
            <CheckboxText>{category.name}</CheckboxText>
          </Label>
        );
      })}
    </ClassificationBoxCheckboxWrapper>
  );
}

const ClassificationBoxCheckboxWrapper = styled.section`
  border: 1px solid orange;
  margin-top: 20px;
`;

// 체크박스 묶음
const Label = styled.label`
  position: relative;
`;

const DataLabel = styled.label`
  border: 1px solid #006633;
  display: inline-block;
  margin: 0 10px 0px;
  width: 12px; /* 체크박스의 너비를 지정 */
  height: 12px; /* 체크박스의 높이를 지정 */
  line-height: 21px; /* 세로정렬을 위해 높이값과 일치 */
  text-align: center;
  border: 1px solid #ddd;
  background-color: "white";
`;

const IconDiv = styled.div`
  // border: 1px solid blue;
  position: absolute;
  left: -2px;
  top: -5px;
  display: inline-block;
  width: 13px;
  height: 13px;
`;

const CheckboxText = styled.span`
  font-size: 14px;
`;
