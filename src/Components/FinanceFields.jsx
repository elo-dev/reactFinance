import React from "react"
import { Checkbox, Col, Input, Row } from 'antd'

export const FinanceFields = ({ id, name, sum, count, completed, onChangeCheckbox }) => {

    const onComplete = (e) => {
        onChangeCheckbox(id, e.target.checked)
    }

    return (
    <div className="finance__grid-item">
        <Row>
            <Col span={8}>
            <div className="item-checkbox">
                <Checkbox checked={completed} onChange={onComplete} /> <p>{name}</p>
            </div></Col>
            <Col span={8}>
            <div className="item-sum">
                <Input placeholder={sum} disabled={completed} />
            </div>
            </Col>
            <Col span={8}>
            <div className="item-count">
                <Input placeholder={count} disabled={completed} />
            </div>
            </Col>
        </Row>
    </div>
    )
}