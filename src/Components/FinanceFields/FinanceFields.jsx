import React, { useState, useMemo, useEffect } from 'react'
import { Checkbox, Col, Input, Popover, Row } from 'antd'
import { FinanceFieldPopover } from './FinanceFieldPopover'

export const FinanceFields = ({
  id,
  name,
  count,
  completed,
  onChangeCheckbox,
  onEditListTitle,
  onChange
}) => {
  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)

  const total = useMemo(() => {
    return number1 * number2
  }, [number1, number2])

  useEffect(() => {
    onChange(total)
  }, [total])

  const onComplete = (e) => {
    onChangeCheckbox(id, e.target.checked)
  }

  return (
    <div className="finance__grid-item">
      <Row>
        <Col span={8}>
          <div className="item-checkbox">
            <Checkbox checked={completed} onChange={onComplete} />
            <Popover
              content={
                <FinanceFieldPopover
                  id={id}
                  name={name}
                  onEditListTitle={onEditListTitle}
                />
              }
            >
              <p>{name}</p>
            </Popover>
          </div>
        </Col>
        <Col span={8}>
          <div className="item-sum">
            <Input
              value={number1}
              placeholder={count}
              disabled={!completed}
              onChange={(e) => setNumber1(+e.target.value)}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className="item-count">
            <Input
              value={number2}
              placeholder={count}
              disabled={!completed}
              onChange={(e) => setNumber2(+e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <h2>{total}</h2>
    </div>
  )
}
