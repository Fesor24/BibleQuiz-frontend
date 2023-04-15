import React from 'react'
import SourceMessage from '../components/SourceMessage'

function FesorSourceMessage() {

    const source = "Questions were gotten from teachings in Church, personal study and other sources";

  return (
    <SourceMessage source={source} name="Proceed" link="/fesor-questions" />
  )
}

export default FesorSourceMessage