import React, { Component } from "react";
import styled from "styled-components";
import ProductMap from "../ProductMap/ProductMap";
import NutritionMap from "../NutritionMap/NutritionMap";
import { Icon } from "react-icons-kit";
import { coffee } from "react-icons-kit/fa/coffee";
import "./SubCategory.scss";

export default class SubCategory extends Component {
  render() {
    const {
      currentId,
      categories,
      checkedNames,
      checkedMarkNames,
      copyCategories,
    } = this.props;
    return (
      <div className="subCategory">
        <div className="subCategoryDiv">
          {copyCategories.map((category) => {
            const isAll = checkedNames.includes("전체 보기"); // 26~28 줄: 카테고리 체크박스 선택 시, 데이터 순서대로 보여주는 로직
            const isInclude = checkedNames.includes(category.name);
            if (!isInclude && !isAll) return null;

            // [조건] 상세 분류 버튼 중 무엇을 체크 했는가? -> 부모 이동 가능
            const isNewChecked = checkedMarkNames.includes("신규 출시된 메뉴");
            const isSeasonChecked = checkedMarkNames.includes(
              "한정기간 출시되는 시즌성 메뉴"
            );

            // [조건] products에 1개라도 뉴/시즌이 true냐?
            const atLeastOneIsNewhasTrue = category.products.some(
              (product) => product.isnew === true
            );
            const atLeastOneIsSeasonhasTrue = category.products.some(
              (product) => product.isseason === true
            );

            // [조건] SUBCATEGORY_TITLE 나오면 안되는 경우
            const CheckedIsNewButAllFalse =
              isNewChecked && atLeastOneIsNewhasTrue === false;
            const CheckedIsSeasonButAllFalse =
              isSeasonChecked && atLeastOneIsSeasonhasTrue === false;
            console.log(
              "isNewChecked, isSeasonChecked : ",
              isNewChecked,
              isSeasonChecked,
              "CheckedIsNewButAllFalse, CheckedIsSeasonButAllFalse:",
              CheckedIsNewButAllFalse,
              CheckedIsSeasonButAllFalse
            );

            const MAPPING_OBJ = {
              1: (
                <ProductMap
                  products={category.products}
                  checkedMarkNames={checkedMarkNames}
                />
              ),
              2: <NutritionMap products={category.products} />,
            };

            return (
              <div>
                <SUBCATEGORY_TITLE
                  currentId={currentId}
                  isnewShow={CheckedIsNewButAllFalse}
                  isseasonShow={CheckedIsSeasonButAllFalse}
                >
                  <SubcategoryName>{category.name}</SubcategoryName>
                  <CoffeeDiv>
                    {currentId === 1 && <Icon icon={coffee} size={30} />}
                  </CoffeeDiv>
                  <SubcategoryDesc>
                    {currentId === 1 && category.description}
                  </SubcategoryDesc>
                </SUBCATEGORY_TITLE>
                {MAPPING_OBJ[currentId]}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const SUBCATEGORY_TITLE = styled.div`
  // display: flex;
  display: ${(props) =>
    props.currentId === 1 && (props.isnewShow || props.isseasonShow)
      ? "none"
      : "flex"};
  justify-content: flex-start;
  align-items: center;
  height: 58px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 3px;
  background-color: #f4f4f2;
`;

const SubcategoryName = styled.span`
  margin-right: 10px;
  color: #222;
  font-size: 18px;
  font-weight: bold;
`;

const SubcategoryDesc = styled.span`
  margin-left: 5px;
  color: #444444;
  font-size: 13px;
`;

const CoffeeDiv = styled.div`
  color: #94bb39;
`;
