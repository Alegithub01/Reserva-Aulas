import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledResponsiveContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${'' /* height: 100vh; */}
  height: calc(100vh - 64px);
  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
  }
  > div {
    &:first-child {
      flex: 0 0 60%;
      ${'' /* background-color: red; */}
    }
    &:last-child {
      flex: 0 0 40%;
      ${'' /* background-color: blue; */}
    }
    @media (max-width: 900px) {
      flex: 0 0 100%;
    }
  }
`;

const ResponsiveContainer = ({ children }) => {
  return <StyledResponsiveContainer>{children}</StyledResponsiveContainer>;
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResponsiveContainer;
