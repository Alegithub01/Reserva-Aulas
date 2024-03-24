import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledColumnResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > div:first-child {
    flex: ${(props) => props.firstChildPercentage ? `0 0 ${props.firstChildPercentage}%` : '0 0 50%'};
    ${'' /* background-color: yellow; */}
  }

  > div:last-child {
    flex: ${(props) => props.firstChildPercentage ? `0 0 ${100 - props.firstChildPercentage}%` : '0 0 50%'};
    ${'' /* background-color: green; */}
  }

  @media (max-width: 900px) {
    height: auto;
    
    > div {
      flex: 0 0 auto;
    }
  }
`;

const ColumnResponsiveContainer = ({ children, firstChildPercentage }) => {
  return (
    <StyledColumnResponsiveContainer firstChildPercentage={firstChildPercentage}>
      {children}
    </StyledColumnResponsiveContainer>
  );
};

ColumnResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
  firstChildPercentage: PropTypes.number,
};

export default ColumnResponsiveContainer;
