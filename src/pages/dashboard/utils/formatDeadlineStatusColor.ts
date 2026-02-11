export enum StatusCode {
  CREATE_PROPERTY = 'create-property',
  SEND_CONCLUSION = 'send-conclusion',
  PARALLEL_CONCLUSION = 'parallel-conclusion',
  PARALLEL_TAHRIRLASH = 'parallel-tahrirlash',
  WAITING_PAYMENT = 'waiting-payment',
  PAID = 'paid',
  REJECT = 'reject',
  IN_PUBLIC = 'in-public',
  WAITING_DECISION = 'waiting-decision',
  RECEIVE_DECISION = 'receive-decision',
  RESPOND_TO_COMPLAINT = 'complaint-respond',
  ADLIYA_DECISION = 'adliya-decision'
}

export const getStatusColor = (status: any): string => {
  switch (status) {
    case StatusCode.CREATE_PROPERTY:
      return 'blue'
    case StatusCode.SEND_CONCLUSION:
      return 'purple'
    case StatusCode.PARALLEL_CONCLUSION:
      return 'geekblue'
    case StatusCode.PARALLEL_TAHRIRLASH:
      return 'cyan'
    case StatusCode.WAITING_PAYMENT:
      return 'orange'
    case StatusCode.PAID:
      return 'green'
    case StatusCode.REJECT:
      return 'red'
    case StatusCode.IN_PUBLIC:
      return 'gold'
    case StatusCode.WAITING_DECISION:
      return 'magenta'
    case StatusCode.RECEIVE_DECISION:
      return 'lime'
    case StatusCode.RESPOND_TO_COMPLAINT:
      return 'volcano'
    case StatusCode.ADLIYA_DECISION:
      return 'success'
    default:
      return 'default'
  }
}
