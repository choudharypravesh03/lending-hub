import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

export const BlackButtonLink = styled((props) => <Link {...props} />)`
  background-color: #151515;
  color: #ffffff;
  width: 100%;
  display: block;
  padding: 0.75rem;
  margin: 1rem 0;
  text-align: center;
  border: 1px solid #1c1c1e;
  transition: 0.3s;
  border: 1px solid #1c1c1e;
`

export const BlackButton = styled((props) => <button {...props} />)`
  background-color: #1c1c1e;
  color: #ffffff;
  width: 100%;
  padding: 0.9rem 1rem;
  font-size: 1rem;
  border: 0;
  font-family: 'Poppins Regular';
  transition: 0.3s;
  border: 1px solid #1c1c1e;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: 0;
  .loading-icon {
    height: 55px;
  }
  :hover {
    opacity: 0.8
  }
`

export const BlackButtonInverse = styled(BlackButton)`
  color: #1c1c1e;
  background-color: #ffffff;
  border: 1px solid #1c1c1e;
`

export const UnderlinedLink = styled((props) => <Link {...props} />)`
  text-decoration: underline;
  color: #323131;
`

export const ButtonNoStyle = styled.button`
  background-color: transparent;
  color: #1c1c1e;
  border: 0;
  cursor: pointer;
`

export const InputField = styled.input`
  height: 53px;
  border-radius: 0;
  border: ${(props) =>
    props.isDanger ? `1px solid #f14668` : `1px solid #707070`};
`

export const TextArea = styled.textarea`
  height: 103px;
  border-radius: 0;
  border: ${(props) =>
    props.isDanger ? `1px solid #f14668` : `1px solid #707070`};
`

export const RadioButton = styled.label`
  /* The container */
  & + .radio {
    margin-left: 0;
  }
  position: relative;
  margin-right: 20px;
  padding-left: 26px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  float: left;

  /* Hide the browser's default radio button */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 19px;
    width: 19px;
    border: 1px solid #1c1c1e;
    border-radius: 50%;
  }

  /* When the radio button is checked, add a blue background */
  input:checked ~ .checkmark {
    background-color: #ffffff;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .checkmark:after {
    top: 5px;
    left: 5px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #1c1c1e;
  }
`

export const Checkbox = styled.div`
  display: block;
  margin-bottom: 15px;

  input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
  }

  label {
    position: relative;
    cursor: pointer;
  }

  label:before {
    content: '';
    -webkit-appearance: none;
    background-color: transparent;
    border: 1px solid #707070;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 8px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 1rem;
  }

  input:checked + label:after {
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    width: 10px;
    background-color: #1c1c1e;
    border-radius: 50%;
    height: 10px;
  }
`

export const BlockStack = styled.div`
  display: flex;
  min-height: 300px;
  justify-content: center;
  flex-wrap: wrap;
  .p-block {
    background: #fff;
    padding: 5px;
    cursor: pointer;
    border-radius: 2px;
    display: inline-block;
    height: 136px;
    margin: 1rem;
    position: relative;
    width: 136px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 8px;
    :hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
  }
  @media screen and (max-width: 786px) {
    .p-block {
      width: 120px;
      height: 120px;
    }
  }
`

export const SliderContainer = styled.div`
  width: 435px;
  margin: auto;
  .rc-slider-rail {
    background-color: #707070;
    height: 10px;
    border-radius: 6px;
  }
  .rc-slider-handle {
    width: 26px;
    height: 26px;
    margin-top: -8px;
    background-color: #1c1c1e;
    outline: 0;
    border: solid 2px #1c1c1e;
  }
  .rc-slider-track {
    height: 10px;
    background-color: #1c1c1e;
  }
  @media screen and (max-width: 786px) {
    width: 90%;
  }
`

export const BackButton = ({ setStep }) => {
  const BackStyle = styled.div`
    button {
      display: flex;
      align-items: center;
      margin-left: 1rem;
      img {
        width: 25px;
        margin-right: 1rem;
      }
    }
    @media screen and (max-width: 786px) {
      margin-bottom: 2rem;
    }
  `
  return (
    <BackStyle>
      <ButtonNoStyle onClick={setStep}>
        <img src="/img/back-arrow.svg" alt="back-arrow" />
        <p className="title-1">Back</p>
      </ButtonNoStyle>
    </BackStyle>
  )
}

export const FeatureBox = ({ title, subtitle, image }) => {
  const Style = styled.div`
    .item {
      display: flex;
      border-radius: 8px;
      align-items: center;
    border: 1px solid #1c1c1e;
    padding: 8px 20px;
    .img {
      width: 2rem;
      margin-right: 10px;
    }
    .text {
      .head {
        font-size: 1rem;
      }
      .subhead {
        font-size: 0.7rem;
      }
    }
    }
    @media screen and (max-width: 786px) {
      width: 100%;
      .item {
        justify-content: center;
        margin-bottom: 1rem;
        width: 100%;
      }
    }
  `

  return (
    <Style>
      <div className="item">
                      <div className="img">
                        <img src={image} />
                      </div>
                      <div className="text">
                        <div className="head bold">{title}</div>
                        <div className="subhead">{subtitle}</div>
                      </div>
                    </div>
    </Style>
  )
}

export const ToolTip = ({show, title}) => {
  const Style = styled.div`
    .tooltip {
      display: ${props => (props.show ? `inline` : `none`)};
      position: absolute;
      width: 30px;
      height: 30px;
      right: -35px;
      top: 12px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .tooltip:after{
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: center;
      justify-content: center;
      background: #1C1C1E;
      border-radius: 8px;
      color: #fff;
      content: attr(title);
      margin: -61px 21px 0px 49px;
      font-size: 16px;
      padding: 13px;
      width: 220px;
    }
    .tooltip:before{
      border: solid;
      border-color: #1C1C1E transparent;
      border-width: 10px 6px 0px 6px;
      content: "";
      right: -21px;
      bottom: 12px;
      transform: rotate(90deg);
      position: absolute;
    }
  `

  return (
    <Style show={show}>
      <a href="#" title={title} className="tooltip"><img src="/img/tooltip.png" /></a>
    </Style>
  )
}