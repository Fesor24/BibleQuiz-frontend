import React from 'react'
import SourceMessage from '../components/SourceMessage'

function ThousandQSourceMessage() {

    const source = "Questions were gotten from biblequizzes.org.uk";

  return (
    <SourceMessage source={source} name="Proceed" link="/thousand-questions" />
  )
}

export default ThousandQSourceMessage