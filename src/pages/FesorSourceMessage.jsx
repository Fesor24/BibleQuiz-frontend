import React from 'react'
import SourceMessage from '../components/SourceMessage'

function FesorSourceMessage() {

    const source = "Questions here will be updated regularly";

  return (
    <SourceMessage source={source} name="Proceed" link="/fesor-questions" />
  )
}

export default FesorSourceMessage