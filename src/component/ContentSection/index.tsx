import { Row } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React, { useState } from 'react'

interface Props {
  content: string
}
function ContentSection({ content }: Props) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const renderContent = () => {
    if (expanded) {
      return (
        <React.Fragment>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <a onClick={toggleExpand}>...less</a>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <span dangerouslySetInnerHTML={{ __html: content.slice(0, 150) }}></span>
        {content.length > 100 && <a onClick={toggleExpand}>...more</a>}
      </React.Fragment>
    )
  }
  return (
    <Row>
      <Paragraph onClick={toggleExpand}>{renderContent()}</Paragraph>
    </Row>
  )
}

export default ContentSection
