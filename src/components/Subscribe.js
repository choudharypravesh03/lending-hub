import React, { useState } from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import { PIPELINE_ID } from '../utils/constants'
import { submitData } from '../service/Pipelinecrm'
import { BlackButton } from './common/common'

const Subscribe = () => {
  const [subscribe, setSubscribe] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = ({ target }) => {
    const value = target.value
    setSubscribe(value)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    const data = {
      person: {
        first_name: 'Newsletter',
        last_name: 'Subscriber',
        website: 'https://www.lendinghub.ca',
        email: subscribe,
        type: 'Lead',
        lead_status_id: PIPELINE_ID.lead_status_id,
        lead_source_id: PIPELINE_ID.lead_source_id,
        next_entry_name: 'From LendingHub Website',
        predefined_contacts_tag_ids: [PIPELINE_ID.newsletter_tag]
      }
    }
    submitData(data, (res) => {
      setIsLoading(false)
      if (res.status === 200) {
        setIsSubmitted(true)
      } else {
        alert('Some error occured. Please try again!')
      }
    })
    // setIsSubmitted(true)
  }

  return (
    <SubscribeContainer>
      <div className="container">
        <div className="subscribe-container">
          <div className="text">
            <h2 className="title-small mb-3">
              Stay up to speed on your financial journey
            </h2>
            <p className="title-1">
              Get rate alerts, relevant articles and breaking financial news
              sent right to your inbox.
            </p>
          </div>
          <div className="email-field">
            <div className="is-flex-desktop">
              <div className="field">
                <div className="control">
                  <input
                    name="subscribe"
                    className="input"
                    type="text"
                    placeholder="Email"
                    value={subscribe}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="subscribe-btn">
                <BlackButton onClick={handleSubmit}>
                  {!isLoading && <span>Subscribe</span>}
                  {isLoading && <img className="loading-icon" src='/img/icons/loading.svg' />}
                </BlackButton>
              </div>
            </div>
          </div>
        </div>
        {isSubmitted && <Fade>
            <div className="apply-successful">
                <div>
                <svg className="tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="tick__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="tick__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                </div>
                <p>Thank you for Signing up to our Newsletter. You are now on our insider list to receive market updates, regular mortgage rates and latest industry news!</p>
            </div>
            </Fade>}
      </div>
    </SubscribeContainer>
  )
}

const SubscribeContainer = styled.section`
  .subscribe-container {
    margin-top: 2rem;
    border: 1px solid #707070;
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text {
      width: 65%
    }
    .email-field {
      width: 35%;
    }
    input {
      border-radius: 0;
      border-color: #707070;
      font-size: 1.1rem;
      padding: 1rem;
      height: 60px;
      max-width: 270px;
      width: 100%;
    }
    .subscribe-btn {
      border-radius: 0;
      margin-left: 1rem;
      padding: 0 2rem;
    }
  }
  .apply-successful {
        margin-top: 4rem;
        align-items: center;
        display: flex;
        justify-content:center;
        svg {
          margin-right: 20px;
        }
        p {
          font-size: 24px;
        }
      }
  @media screen and (max-width: 786px) {
    padding: 1rem;
    .subscribe-container {
      padding: 10px;
      flex-wrap: wrap;
      .input {
        max-width: inherit;
      }
      .text {
      width: 100%
    }
    .email-field {
      margin-top: 2rem;
      width: 100%;
    }
    .subscribe-btn {
        width: 100%;
        margin-left: 0rem;
        padding: 0px 0rem;
      }
    }
    .apply-successful {
      display: block;
      p {
        font-size: 1rem;
      }
      svg {
        margin: 2rem auto;
      }
    }
  }
`

export default Subscribe
