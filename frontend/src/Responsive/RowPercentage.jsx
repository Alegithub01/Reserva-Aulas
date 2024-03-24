import styled from "styled-components";
import PropTypes from "prop-types";

const StyledRowPercentage = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${(props) => props.gap || "0px"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
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

{
  /* <RowPercentage firstChildPercentage={30} gap="20px">
  <div>Primer hijo (30% del ancho)</div>
  <div>Segundo hijo (70% del ancho restante)</div>
</RowPercentage> */
}
