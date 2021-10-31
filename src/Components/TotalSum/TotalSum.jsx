import React from 'react'

export const TotalSum = ({ monthSumWeek, monthSumYear, percent, month, compoundInterest }) => {
  return (
    <div className="footer__header">
      <p>
        Трачу на приятные мелочи <strong>{monthSumWeek} руб</strong> в месяц -
        это <strong>{monthSumYear} руб</strong> в год. Если буду класть эти
        деньги под {percent * 100}%, то через {month} месяцев накоплю{' '}
        {compoundInterest()} руб.
      </p>
      <h2>
        <strong>Приятные мелочи - {compoundInterest()} руб</strong>
      </h2>
      <span>Итого накоплений: {compoundInterest() - monthSumYear}</span>
    </div>
  )
}
