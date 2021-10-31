import React, { useState } from 'react'
import { Button, Input } from 'antd'
import style from './AddNewItem.module.scss'

export const AddNewItem = ({ addItem }) => {
  const [newItem, setNewItem] = useState('')

  const addNewItem = () => {
    console.log(newItem)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addItem(newItem)
    setNewItem('')
  }

  const handleKeyPress = (e) =>{
    if(e.key === 'Enter'){
      handleSubmit(e)
    }
  }

  return (
    <>
      <p>Добавить новую статью расходов:</p>
      <form onSubmit={handleSubmit} className={style.form}>
        <Input value={newItem} type='text' onKeyDown={handleKeyPress} onChange={(e) => setNewItem(e.target.value)} />
        <Button htmlType='submit' type='primary'>
          Добавить
        </Button>
      </form>
    </>
  )
}
