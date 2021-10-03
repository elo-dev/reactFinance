import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Col, Row } from 'antd'
import './App.scss'
import axios from 'axios'
import { Preloader } from './assets/Preloader/Preloader'
import { FinanceFields } from './Components/FinanceFields'

const App = () => {
  const [lists, setLists] = useState(null)

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
                  onChangeCheckbox={onChangeCheckbox}
                />
              ))}
          </div>
          <div className="finance__grid-footer">
            <p>
              Трачу на приятные мелочи 31 400 руб в месяц - это 376 800 руб в
              год. Если буду класть эти деньги под 4%, то через 12 месяцев
              накоплю 385 065 руб.
            </p>
            <h2>Приятные мелочи - 385 065 руб</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
