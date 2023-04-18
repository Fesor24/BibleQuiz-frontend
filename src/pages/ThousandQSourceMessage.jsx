import React from 'react'
import SourceMessage from '../components/SourceMessage'

function ThousandQSourceMessage() {

    const source =
      "The questions in this section were sourced from biblequizzes.org.uk";

  return (
    <SourceMessage source={source} name="Proceed" link="/thousand-questions" />
  )
}

export default ThousandQSourceMessage