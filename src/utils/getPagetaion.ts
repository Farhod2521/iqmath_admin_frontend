type ChangeProp = {
  current: number
  pageSize: number
  total: number
}

export const getParams = (params: ChangeProp) => {
  return {
    limit: params.pageSize,
    page: params.current
  }
}
