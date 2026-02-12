import React, { ReactElement, ReactNode } from 'react'
import Step from './Step'

type StepType = 'default' | 'active' | 'finished' | 'error'
type StepSize = 'small' | 'large'
type StepLayout = 'horizontal' | 'vertical'

interface StepItem {
  type: StepType
  passed?: boolean
  title?: string
  subtitle?: string
}

interface StepsProps {
  children?: ReactNode
  steps?: StepItem[]
  size?: StepSize
  layout?: StepLayout
}

const Steps = ({ children, steps, size = 'large', layout = 'horizontal' }: StepsProps) => {
  return (
    <div className={`steps ${layout}`}>
      {steps?.map((step, index) => (
        <Step
          key={index}
          type={step.type}
          passed={step.passed}
          size={size}
          title={step.title}
          subtitle={step.subtitle}
        />
      ))}

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement<any>, { size })
        }
        return child
      })}
    </div>
  )
}

export default Steps
