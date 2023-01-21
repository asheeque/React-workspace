import { useCallback, useState } from "react"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { PaginatedTransactionsResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<
    Transaction[]
  > | null>(null)
  let newTransactionState = new Map<string, Transaction>()

  const fetchAll = useCallback(async () => {
    const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
      "paginatedTransactions",
      {
        page: paginatedTransactions === null ? 0 : paginatedTransactions.nextPage,
      }
    )

    setPaginatedTransactions((previousResponse) => {
      if ("newTransactionState" in localStorage) {
        // eslint-disable-next-line
        newTransactionState = new Map(JSON.parse(localStorage.newTransactionState))
      }
      if (response === null || previousResponse === null) {
        if (response && newTransactionState.size > 0) {
          let responseData: Transaction[] = response.data
          response.data = []
          let newResponseData: Transaction[] = responseData.map((singleTrx) => {
            let txnId: string = singleTrx.id
            if (newTransactionState.has(String(txnId))) {
              let updatedTxn: Transaction | undefined = newTransactionState.get(txnId)
              if (updatedTxn) {
                return updatedTxn
              }
            }

            return singleTrx
          })
          response.data = newResponseData
        }
        return response
      } else {
        if (response && newTransactionState.size > 0) {
          let responseData: Transaction[] = response.data
          response.data = []
          let newResponseData: Transaction[] = responseData.map((singleTrx) => {
            let txnId: string = singleTrx.id
            if (newTransactionState.has(String(txnId))) {
              let netTrx: Transaction | undefined = newTransactionState.get(txnId)
              if (netTrx) {
                return netTrx
              }
            }

            return singleTrx
          })
          response.data = newResponseData
        }
        return { data: [...previousResponse.data, ...response.data], nextPage: response.nextPage }
      }
    })
  }, [fetchWithCache, paginatedTransactions, newTransactionState])

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null)
  }, [])

  return { data: paginatedTransactions, loading, fetchAll, invalidateData }
}
