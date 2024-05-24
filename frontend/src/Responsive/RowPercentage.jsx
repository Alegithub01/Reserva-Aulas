import styled from "styled-components";
import PropTypes from "prop-types";

const StyledRowPercentage = styled.div.attrs(props => ({
  gap: props.gap || "0px",
}))`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${(props) => props.gap};
  background-color: ${(props) => props.backgroundColor || "transparent"};  // Usamos 'backgroundColor' directamente en el CSS
  > div:first-child {
    flex-grow: 1;
  }
  > div:last-child {
    width: ${(props) =>
      props.firstChildPercentage ? `${props.firstChildPercentage}%` : "50%"};
  }
`;

const RowPercentage = ({
  children,
  firstChildPercentage,
  gap,
  backgroundColor,
}) => {
  return (
    <StyledRowPercentage
      firstChildPercentage={firstChildPercentage}
      gap={gap}
      backgroundColor={backgroundColor}
    >
      {children}
    </StyledRowPercentage>
  );
};

RowPercentage.propTypes = {
  children: PropTypes.node.isRequired,
  firstChildPercentage: PropTypes.number,
  gap: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default RowPercentage;
