import React from 'react'
import { Col, Row } from 'antd'

export const Header = () => {
  return (
    <Row>
      <Col span={8}>
        <p>На что трачу</p>
      </Col>
      <Col span={8}>
        <p>Сколько стоит</p>
      </Col>
      <Col span={8}>
        <p>Сколько раз в неделю</p>
      </Col>
    </Row>
  )
}
