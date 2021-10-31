import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import './App.scss'
import { Preloader } from './assets/Preloader/Preloader'
import { FinanceFields } from './Components/FinanceFields/FinanceFields'
import { Deposit } from './Components/Deposit/Deposit'
import { Header } from './Components/Header/Header'
import { TotalSum } from './Components/TotalSum/TotalSum'
import { AddNewItem } from './Components/AddNewItem/AddNewItem'
import { noteRef } from './base'
import instance from './api/instance'
import noData from './assets/noData.svg'

const App = () => {
  const [lists, setLists] = useState(null)
  const [total, setTotal] = useState({})
  const [percent, setPersent] = useState(0)
  const [month, setYear] = useState(0)
  const [loading, setLoading] = useState(false)

  const _setTotal = (name) => (val) => setTotal({ ...total, [name]: val })

  const monthSum = Object.values(total).reduce((a, b) => a + b, 0)
  const monthSumWeek = monthSum * 4
  const monthSumYear = monthSumWeek * 12

  const compoundInterest = () => {
    const a = 1 + percent / 12
    const b = Math.pow(a, month)
    return Math.round(b * monthSumYear)
  }

  useEffect(() => {
    setLoading(true)
    instance.get('/notes.json').then((res) => {
      const fetchResult = []
      for (let key in res.data) {
        fetchResult.push({
          ...res.data[key],
          id: key,
        })
      }
      setLists(fetchResult)
      setLoading(false)
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

    instance
      .patch(`/notes/${listId}.json`, {
        completed,
      })
      .catch(() => {
        alert('Не удалось сохранить чекбокс')
      })
  }

  const onEditListTitle = (listId, newTitle) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        if (newTitle === null) {
          list.name = null
        } else {
          list.name = newTitle
        }
      }
      return list
    })
    setLists(newList)

    instance
      .patch(`/notes/${listId}.json`, {
        name: newTitle,
      })
      .catch(() => {
        alert('Не удалось обновить название')
      })
  }

  const handleChange = (value) => {
    setPersent(value / 100)
  }

  const addItem = (newItem) => {
    if (newItem) {
      const item = {
        id: Math.random().toString(36).substr(2, 9),
        name: newItem,
        completed: true,
      }
      setLists([...lists, item])
      noteRef.push(item)
    }
  }

  const removeItem = (fieldId) => {
    setLists([...lists.filter((field) => field.id !== fieldId)])
    instance.delete(`/notes/${fieldId}.json`)
  }

  return (
    <div className="App">
      <div className="finance">
        <div className="finance__grid">
          <h1>Мелкие траты которые съедают ваш бюджет</h1>
          <div className="finance__grid-titles">
            <Header />
          </div>
          {loading && <Preloader />}
          <div className="finance__grid-items">
            {lists &&
              lists.map((list) => (
                <FinanceFields
                  key={list.id}
                  {...list}
                  onChange={_setTotal(`name${list.id}`)}
                  onChangeCheckbox={onChangeCheckbox}
                  onEditListTitle={onEditListTitle}
                  removeItem={removeItem}
                />
              ))}
            {!loading && lists && lists.length === 0 && (
              <img src={noData} alt="no data" className="no-data" />
            )}
            <div className="newItem">
              <AddNewItem addItem={addItem} />
            </div>
          </div>
          <div className="finance__grid-footer">
            <div className="options__deposit">
              <Deposit
                handleChange={handleChange}
                setYear={setYear}
                month={month}
              />
            </div>
            <TotalSum
              monthSumWeek={monthSumWeek}
              monthSumYear={monthSumYear}
              percent={percent}
              month={month}
              compoundInterest={compoundInterest}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
