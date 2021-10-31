import { Input, Tooltip, Select } from 'antd'
import React from 'react'

export const Deposit = ({ handleChange, month, setYear }) => {
  
    const { Option } = Select

  return (
    <>
      <Tooltip title="Номинальная процентная ставка банка">
        <Select
          className="selectPercent"
          defaultValue="0%"
          onChange={handleChange}
        >
          <Option value={2}>ВТБ 2%</Option>
          <Option value={4}>СБЕР 4%</Option>
          <Option value={5}>АльфаБанк 5%</Option>
          <Option value={7}>ПСБ 7%</Option>
        </Select>
      </Tooltip>
      <Tooltip title="Срок (месяцев)">
        <Input
          type="number"
          value={month}
          defaultValue={0}
          onChange={(e) => setYear(+e.target.value)}
        />
      </Tooltip>
    </>
  )
}
