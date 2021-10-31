import React, { useState, useMemo, useEffect } from 'react'
import { Checkbox, Col, Input, Popover, Row } from 'antd'
import { FinanceFieldPopover } from './FinanceFieldPopover'
import style from './FinanceFields.module.scss'
import deleteIcon from '../../assets/delete.svg'

export const FinanceFields = ({
  id,
  name,
  completed,
  onChangeCheckbox,
  onEditListTitle,
  onChange,
  removeItem
}) => {
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')

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

  const numberValidate1 = (num) => {
    const newNumber = num.toString().replace(/[^\d]/g,'')
    setNumber1(newNumber)
  }

  const numberValidate2 = (num) => {
    const newNumber = num.toString().replace(/[^\d]/g,'')
    setNumber2(newNumber)
  }

  return (
    <div className={style.finance__gridItem}>
      <Row className={style.finance__gridRow}>
        <Col span={7}>
          <div>
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
              {!name
              ? <p>Введите название</p>
              : <p>{name}</p>
              }
            </Popover>
          </div>
        </Col>
        <Col span={7}>
          <div className={style.item__sum}>
            <Input
              type='text'
              value={number1}
              placeholder={'200 руб'}
              disabled={!completed}
              // onChange={(e) => setNumber1(+e.target.value)}
              onChange={(e) => numberValidate1(+e.target.value)}
            />
          </div>
        </Col>
        <Col span={7}>
          <div className="item-count">
            <Input
              type='number'
              value={number2}
              placeholder={'2 раза'}
              disabled={!completed}
              onChange={(e) => numberValidate2(+e.target.value)}
            />
          </div>
        </Col>
        <Col span={3}>
          <img src={deleteIcon} alt="delete" className={style.deleteIcon} onClick={() => removeItem(id)} />
        </Col>
      </Row>
      <h2>{total}</h2>
    </div>
  )
}
