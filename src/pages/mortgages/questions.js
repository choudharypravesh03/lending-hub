import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { navigate, useScrollRestoration } from 'gatsby'
import { BackButton } from '../../components/common/common'
import { MortgageTypes, types } from '../../utils/constants'
import Layout from '../../components/Layout'
import MortgageFields from '../../components/mortgages/MortgageFields'
import RegisterForm from '../../components/RegisterForm'
import StepProgressBar from '../../components/ProgressSteps'
import HomeMortgageTypes from '../../components/mortgages/HomeMortgageTypes'
import SubsequentBuyerTypes from '../../components/mortgages/SubsequentBuyerTypes'

const QuestionnaireModal = (props) => {
  const totalSteps = 4
  const percentStep = 34
  const [step, setStep] = useState(1)
  const [percent, setPercent] = useState(0)
  const [selections, setSelections] = useState({})
  const homeMortgageType = props?.location?.state?.homeMortgageType

  useEffect(() => {
    if (homeMortgageType === 'first-time') {
      console.log('coming from first time')
      setStep(3)
      setPercent(33 + percentStep)
      setSelections({ homeMortgageType: homeMortgageType })
    }
  }, [])

  const setValue = async (key, value) => {
    console.log(key, value)
    if (value === 'first-time') {
      navigate('/mortgages/first-time-home-buyer')
    } else {
      const data = selections
      data[key] = value
      await setSelections(data)
      setStep(step + 1)
      setPercent(percent + percentStep)
    }
  }

  const submitAnswers = (key, value) => {
    console.log(selections)
    console.log(key, value)
    navigate('/mortgages/listing', {
      state: { selections }
    })
  }

  const getSelectedMortgageType = () => {
    const id = props?.location?.state?.id
    let mortgageType = MortgageTypes.HOME_BUYING
    if (id === 2) {
      mortgageType = MortgageTypes.REFINANCE
    } else if (id === 3) {
      mortgageType = MortgageTypes.RENEWAL
    } else {
      mortgageType = MortgageTypes.HOME_BUYING
    }
    return mortgageType
  }

  const onBackButtonClick = () => {
    console.log('step -> ', step)
    if (homeMortgageType === 'first-time') {
      navigate('/mortgages/first-time-home-buyer')
    }
    if (step > 1) {
      setStep(step - 1)
      setPercent(percent - percentStep)
    } else {
      navigate('/mortgages')
    }
  }

  return (
        <Layout>
        <QuestionnaireModalContainer>
          <BackButton setStep={onBackButtonClick} />
            <div className="container">
            {/* <div className="modal-background"></div> */}
                <StepProgressBar percent={percent} totalSteps={totalSteps} />
                <div className="">
                    {step === 1 && <HomeMortgageTypes setValue={setValue} />}
                    {step === 2 && <SubsequentBuyerTypes setValue={setValue} />}
                    {step === 3 && <MortgageFields selections={selections} type={getSelectedMortgageType()} setValue={setValue} />}
                    {step === 4 && <RegisterForm redirectTo='/mortgages/listing' type={types.MORTGAGE} selections={selections} submitText="Get Rates" setValue={submitAnswers} />}
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </QuestionnaireModalContainer>
        </Layout>
  )
}

const QuestionnaireModalContainer = styled.div`
    margin-top: 5rem;
    background-color: #FFFFFF;
    min-height: 1000px;
    height: fit-content;
`

export default QuestionnaireModal
