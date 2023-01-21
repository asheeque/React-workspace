import { useState } from "react"
import { Transaction } from "src/utils/types"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {
  const [approved, setApproved] = useState(transaction.approved)
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  let newTransactionState = new Map<string, Transaction>()
  async function handleChange(newValue: boolean) {
    await consumerSetTransactionApproval({
      transactionId: transaction.id,
      newValue,
    })

    setApproved(newValue)
    let newTxnObj: Transaction = transaction
    newTxnObj.approved = newValue
    if ("newTransactionState" in localStorage) {
      newTransactionState = new Map(JSON.parse(localStorage.newTransactionState))
    }
    newTransactionState.set(newTxnObj.id, newTxnObj)
    localStorage.newTransactionState = JSON.stringify(Array.from(newTransactionState.entries()))
  }

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox id={transaction.id} checked={approved} disabled={loading} onChange={handleChange} />
    </div>
  )
}
