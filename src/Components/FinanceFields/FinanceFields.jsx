import React, { useState, useMemo, useEffect } from 'react'
import { Checkbox, Col, Input, Popover, Row } from 'antd'
import { FinanceFieldPopover } from './FinanceFieldPopover'

export const FinanceFields = ({
  id,
  name,
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
    if(!e.target.checked){
      setNumber1(0)
      setNumber2(0)
    }
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
              {name !== null 
              ? <p>{name}</p>
              : <p>Введите название</p>
              }
            </Popover>
          </div>
        </Col>
        <Col span={8}>
          <div className="item-sum">
            <Input
              type='number'
              value={number1}
              placeholder={'200 руб'}
              disabled={!completed}
              onChange={(e) => setNumber1(+e.target.value)}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className="item-count">
            <Input
              type='number'
              value={number2}
              placeholder={'2 раза'}
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
