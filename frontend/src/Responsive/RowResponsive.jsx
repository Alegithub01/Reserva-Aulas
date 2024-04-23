import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledResponsiveContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 50px);
  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
  }
  > div {
    &:first-child {
      flex: 0 0 ${({ firstChildFlexPercentage }) => firstChildFlexPercentage};
    }
    &:last-child {
      flex: 0 0 ${({ lastChildFlexPercentage }) => lastChildFlexPercentage};
    }
    @media (max-width: 900px) {
      flex: 0 0 100%;
    }
  }
`;

const ResponsiveContainer = ({ children, firstChildFlexPercentage, lastChildFlexPercentage }) => {
  return (
    <StyledResponsiveContainer 
      firstChildFlexPercentage={firstChildFlexPercentage}
      lastChildFlexPercentage={lastChildFlexPercentage}>
      {children}
    </StyledResponsiveContainer>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
  firstChildFlexPercentage: PropTypes.string,
  lastChildFlexPercentage: PropTypes.string
};

ResponsiveContainer.defaultProps = {
  firstChildFlexPercentage: '60%',
  lastChildFlexPercentage: '40%'
};

export default ResponsiveContainer;
