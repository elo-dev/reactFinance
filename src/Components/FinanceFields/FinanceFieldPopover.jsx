import React from 'react'
import { Input } from 'antd'

export const FinanceFieldPopover = ({ id, name, onEditListTitle }) => {

    const onEditTitle = (e) => {
        const newTitle = e.target.value
        onEditListTitle(id, newTitle)
    }

    return(
        <div className="popover">
            <p>Измените название</p>
            <Input value={name} onChange={onEditTitle} />
        </div>
    )
}