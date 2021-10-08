import React from 'react'
import { Input } from 'antd'

export const FinanceFieldPopover = ({ id, name, onEditListTitle }) => {

    const onEditTitle = (e) => {
        const newTitle = e.target.value
        if(newTitle){
            onEditListTitle(id, newTitle)
        } else if(newTitle === ''){
            onEditListTitle(id, null)
        }
    }

    return(
        <div className="popover">
            <p>Измените название</p>
            <Input value={name} placeholder='Введите название' onChange={onEditTitle} />
        </div>
    )
}