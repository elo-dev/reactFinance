import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Col, Input, Row, Select, Tooltip } from 'antd'
import './App.scss'
import axios from 'axios'
import { Preloader } from './assets/Preloader/Preloader'
import { FinanceFields } from './Components/FinanceFields/FinanceFields'

const { Option } = Select

const App = () => {
  const [lists, setLists] = useState(null)
  const [total, setTotal] = useState({})
  const [percent, setPersent] = useState(0)
  const [month, setYear] = useState(0)

  const _setTotal = (name) => (val) => setTotal({ ...total, [name]: val })

  const monthSum = Object.values(total).reduce((a, b) => a + b, 0)
  const monthSumWeek = monthSum * 4
  const monthSumYear = monthSumWeek * 12

  const compoundInterest = () => {
    const a = (1 + percent / 12)
    const b = Math.pow(a, month)
    return Math.round(b * monthSumYear)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/lists').then(({ data }) => {
      setLists(data)
    })
  }, [])

  const onChangeCheckbox = (listId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.completed = completed
      }
      return list
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/lists/' + listId, {
        completed,
      })
      .catch(() => {
        alert('Не удалось сохранить чекбокс')
      })
  }

  const onEditListTitle = (listId, newTitle) => {
    const newList = lists.map(list => {
      if(list.id === listId){
        if(newTitle === null){
          list.name = null
        }else{
          list.name = newTitle
        }
      }
      return list
    })
    setLists(newList)
  
    axios.patch('http://localhost:3001/lists/' + listId, {
      name: newTitle
    }).catch(() => {
      alert('Не удалось обновить название')
    })
  }

  const handleChange = (value) => {
    setPersent(value / 100)
  }

  return (
    <div className="App">
      <div className="finance">
        <div className="finance__grid">
          <h1>Мелкие траты которые съедают ваш бюджет</h1>
          <div className="finance__grid-titles">
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
          </div>
          {lists ? null : <Preloader />}
          <div className="finance__grid-items">
            {lists &&
              lists.map((list) => (
                <FinanceFields
                  key={list.id}
                  {...list}
                  onChange={_setTotal(`name${list.id}`)}
                  onChangeCheckbox={onChangeCheckbox}
                  onEditListTitle={onEditListTitle}
                />
              ))}
          </div>
          <div className="finance__grid-footer">
            <div className="options__deposit">
              <Tooltip title='Номинальная процентная ставка банка'>
                <Select className='selectPercent' defaultValue='0%' onChange={handleChange}>
                  <Option value={2}>ВТБ 2%</Option>
                  <Option value={4}>СБЕР 4%</Option>
                  <Option value={5}>АльфаБанк 5%</Option>
                  <Option value={7}>ПСБ 7%</Option>
                </Select>
              </Tooltip>
              <Tooltip title='Срок (месяцев)'>
                <Input type='number' value={month} defaultValue={0} onChange={(e) => setYear(+e.target.value)} />
              </Tooltip>
            </div>
            <p>
              Трачу на приятные мелочи <strong>{monthSumWeek} руб</strong> в месяц - это <strong>{monthSumYear} руб</strong> в
              год. Если буду класть эти деньги под {percent * 100}%, то через {month} месяцев
              накоплю {compoundInterest()} руб.
            </p>
            <h2><strong>Приятные мелочи - {compoundInterest()} руб</strong></h2>
            <span>Итого накоплений: {compoundInterest() - monthSumYear}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
