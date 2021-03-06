import React, { useState } from 'react'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Image from 'gatsby-image'
import { BlackButton } from './common/common'
import GetStartedBlock from './GetStartedBlock'
// import HeroImage from '../../static/img/home-hero-image.png'

const Hero = (props) => {
  const { title, subtitle, imageSrc, blockItems, onSelect, subtitle2 } = props
  const blockTypes = (item) => {
    if (props.type === 'home') {
      return <Block data={item} />
    } else if (props.type === 'cc') {
      return <div className='cta'>
        <BlackButton>
          <img className="image" src="/img/icons/surface1_hover.svg" />
          <div className="cta-text">Get Started</div>
          <img className="image-arrow" src="/img/icons/left-arrow-white-small.svg" />
        </BlackButton>
      </div>
    } else if (props.type === 'insurance') {
      return <GetStartedBlock key={item.key} data={item} ctaText="Click here" width='300px' />
    }
  }
  return (
    <HeroContainer>
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <h1 className="section-title">{title}</h1>
                <h4 className="section-subtitle mt-4">{subtitle}</h4>
                {/* <h4 className="section-subtitle mt-6">{subtitle2}</h4> */}
                {props.type === 'cc' && <FeatureCards features={props?.features} />}
                <div className="blocks mt-6" onClick={onSelect}>
                  {blockItems.map((item) => (
                    <AniLink key={item.key} paintDrip hex="#000000" to={item.link} state={{ id: item.key, title: item.title }}>
                      {blockTypes(item)}
                    </AniLink>
                  ))}
                </div>
              </div>
              <div className="column is-half banner-image has-text-right">
                {imageSrc.childImageSharp ? <Image fluid={imageSrc?.childImageSharp?.fluid} /> : <img height="25em" src={imageSrc} alt="home hero image" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroContainer>
  )
}

const Block = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false)
  const toggleHover = () => {
    setIsHovered(() => !isHovered)
  }
  return (
    <div
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className="block-hero"
    >
      <figure className="image">
        {data.image && (isHovered ? <img src={data.imageHover} /> : <img src={data.image} />)}
      </figure>
      <h3 className="title-2">{data.title}</h3>
      <div className="icon">
        {/* <img src="/img/left-arrow.svg" /> */}
        {isHovered
          ? (
          <img width={'36px'} src="/img/icons/left-arrow-hover.svg" />
            )
          : (
          <img src="/img/left-arrow.svg" />
            )}
      </div>
    </div>
  )
}

const FeatureCards = ({ features }) => {
  return (
    <div className="features">
      {features.map(item => (
        <div key={item.title} className="feature-container">
          <img src={item.icon} />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  )
}

const HeroContainer = styled.section`
margin-top: 3rem;
margin-bottom: 2rem;
  .blocks {
    display: flex;
    flex-wrap: wrap;
  }
  .cta {
      width: 16rem;
      .cta-text {
        font-size: 1rem;
        margin-right: 1rem;
      }
      .image {
        width: 2rem;
        margin-right: 1rem;
      }
      .image-arrow {
        width: 1.2rem;
      }
    }
  .banner-image {
    width: 500px;
    margin-left: auto;
  }
  .block-hero {
    text-align: center;
    padding: 1rem;
    width: 174px;
    height: 174px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #dddddd;
    cursor: pointer;
    :hover {
      background-color: #1c1c1e;
      transition: all 0.5s ease;
      h3 {
        color: #ffffff;
      }
    }
    .image {
      margin-bottom: 10px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    h3 {
      margin-bottom: 10px;
    }
    .icon {
      width: 36px;
    }
  }
  .features {
    margin: 2rem 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .feature-container {
      display: flex;
      align-items: center;
      margin: 1rem 2rem 1rem 0;
      padding-right: 2rem;
      border-right: 1px solid #ddd;
      img{
        margin-right: 1rem;
      }
    }
  }
  @media screen and (max-width: 786px) {
    .blocks {
      justify-content: flex-start;
    }
    .banner-image {
      width: 100%;
    }
    .features {
      display: none;
    }
    .block {
      width: 100%;
      height: 250px;
      .image {
        margin-bottom: 5px;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
`

export default Hero
