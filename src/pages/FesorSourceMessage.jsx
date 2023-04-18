import React from 'react'
import SourceMessage from '../components/SourceMessage'

function FesorSourceMessage() {

    const source =
      "I have contributed the questions in this section and will continue to update them periodically";

  return (
    <SourceMessage source={source} name="Proceed" link="/fesor-questions" />
  )
}

export default FesorSourceMessage