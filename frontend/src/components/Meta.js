import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'The Barber Maker',
  description: 'קבע תור לספר בקלילות',
  keywords: 'ספר , מערכת תורים , קבע תור לספר',
}

export default Meta
