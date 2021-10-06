import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Col, Row } from 'antd'
import './App.scss'
import axios from 'axios'
import { Preloader } from './assets/Preloader/Preloader'
import { FinanceFields } from './Components/FinanceFields/FinanceFields'

const App = () => {
  const [lists, setLists] = useState(null)
  const [total, setTotal] = useState({})

  const _setTotal = (name) => (val) => setTotal({ ...total, [name]: val })

  const monthSum = Object.values(total).reduce((a, b) => a + b, 0)

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
        list.name = newTitle
      }
      return list
    })
    setLists(newList)
    
    if(newTitle){
      axios.patch('http://localhost:3001/lists/' + listId, {
        name: newTitle
      }).catch(() => {
        alert('Не удалось обновить название')
      })
    }
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
            <p>
              Трачу на приятные мелочи <strong>{monthSum} руб</strong> в месяц - это <strong>{monthSum * 12} руб</strong> в
              год. Если буду класть эти деньги под 4%, то через 12 месяцев
              накоплю 385 065 руб.
            </p>
            <h2>Приятные мелочи - 318 000 руб</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
