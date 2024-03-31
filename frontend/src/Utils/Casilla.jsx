import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
  50% {
    transform: scale(0.9);
  }
`;

const CheckboxWrapper = styled.div`
  .inp-cbx {
    display: none;
    visibility: hidden;
  }

  .cbx {
    margin: auto;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .cbx span:first-child {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    transform: scale(1);
    border: 1px solid #9098a9;
    transition: all 0.2s ease;
  }

  .cbx span:first-child svg {
    position: absolute;
    top: 3px;
    left: 2px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }

  .cbx:hover span:first-child {
    border-color: #506eec;
  }

  .inp-cbx:checked + .cbx span:first-child {
    background: #506eec;
    border-color: #506eec;
    animation: ${waveAnimation} 0.4s ease;
  }

  .inp-cbx:checked + .cbx span:first-child svg {
    stroke-dashoffset: 0;
  }

  .inp-cbx:checked + .cbx span:first-child:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #506eec;
    display: block;
    transform: scale(3.5);
    opacity: 0;
    border-radius: 50%;
    transition: all 0.6s ease;
  }
`;

const LabelText = styled.span`
  padding-left: 8px;
`;

function Casilla({ label, name, checked, onCheckboxChange }) {
    const handleChange = (event) => {
        onCheckboxChange({
          target: {
            name: name,
            checked: event.target.checked
          }
        });
      };

    const uniqueId = `cbx-${name}`;

    return (
        <CheckboxWrapper>
        <input
          type="checkbox"
          id={uniqueId}
          className="inp-cbx"
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor={uniqueId} className="cbx">
          <span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
          <LabelText>{label}</LabelText>
        </label>
      </CheckboxWrapper>
  );
}

export default Casilla;