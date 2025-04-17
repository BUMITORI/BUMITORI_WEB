// DropDown.jsx
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 90px;
  background: #f8f8f8;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  font-family: sans-serif;
  appearance: none;
  cursor: pointer;

  /* 드롭다운 화살표 스타일 제거 후 커스텀 */
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;

  @media (min-width: 800px) {
    display: none;
  }
`;

const Dropdown = () => {
  return (
    <StyledSelect defaultValue="B동 4층">
      <option>B동 4층</option>
      <option>A동 2층</option>
      <option>A동 3층</option>
      <option>B동 3층</option>
    </StyledSelect>
  );
};

export default Dropdown;
