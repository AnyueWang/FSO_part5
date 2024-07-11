const OperationMessage = ({ operationMessage }) => {
  if (operationMessage === null) {
    return null
  } else {
    return (
      <div className='operation-message'>
        {operationMessage}
      </div>
    )
  }
}

const WarningMessage = ({ warningMessage }) => {
  if (warningMessage === null) {
    return null
  } else {
    return (
      <div className='warning-message'>
        {warningMessage}
      </div>
    )
  }
}

export default {
  OperationMessage,
  WarningMessage,
}