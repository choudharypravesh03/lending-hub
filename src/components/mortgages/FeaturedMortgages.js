import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { BlackButtonLink, UnderlinedLink } from '../common/common'

const featuredMortgages = graphql`
query MortgageFeatured {
  mortgages: allMarkdownRemark(
    filter: { frontmatter: { templateKey: { eq: "mortgages" }, isFeatured: { eq: true } } }
    limit: 4
  ) {
    edges {
      node {
        frontmatter {
          title
          templateKey
          logo {
            childImageSharp {
              fluid(maxHeight: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          amortization
          isFeatured
          insured {
            _1
            _2
            _3
            _4
            _5
          }
           uninsured {
            _1
            _2
            _3
            _4
            _5
          }
        }
      }
    }
  }
}
`

const FeaturedMortgages = () => {
  const data = useStaticQuery(featuredMortgages)
  const mortgageItems = data.mortgages.edges
  console.log(mortgageItems)
  return (
    <>
    {mortgageItems.length > 0 &&
    <FeaturedContainer>
      <div className="container">
        <h2 className="section-title mb-4">
          Featured Mortgages
        </h2>
        <div className="columns">
          {mortgageItems.map((item) => {
            const card = item.node.frontmatter
            return (
              <div className="column">
                <div className="card-block has-text-centered">
                  {/* <img src="/img/true-line-gold-mastercardcard.png" /> */}
                  <div className="card-head">
                    <Image fluid={card.logo.childImageSharp.fluid} />
                    {/* <h2 className="title-24-nb">{card.title}</h2> */}
                  </div>
                  <div className="large-font mt-2">{card.insured._5}%</div>
                  <p className="has-text-left title-1  mt-4">
                    Get an amazing rate of {card.insured._5}% for 5 year fixed
                    with this mortgage
                  </p>
                  {/* <BlackButtonLink>More Details</BlackButtonLink> */}
                  {/* <h4>Featured</h4> */}
                </div>
              </div>
            )
          })}
        </div>
        {/* <div className="view-all has-text-centered">
                    <UnderlinedLink to="/mortgages/listing">View all</UnderlinedLink>
                </div> */}
      </div>
    </FeaturedContainer>
}
    </>
  )
}

const FeaturedContainer = styled.section`
  margin: 2rem 0;
  .card-block {
    border: 1px solid #000000;
    padding: 1rem 1rem;
    height: fit-content;
    p {
      height: 100px;
      overflow: hidden;
    }
    .card-head {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100px;
      .gatsby-image-wrapper {
        width: 100px;
        margin: auto;
      }
      h2 {
        margin-left: 20px;
      }
    }
  }
  @media screen and (max-width: 786px) {
    .card-block {
      padding: 1rem;
      height: fit-content;
    }
  }
`

export default FeaturedMortgages
