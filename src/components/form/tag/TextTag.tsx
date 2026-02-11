type StateLabelProps = {
  state: string
}

const TagLabel = ({ state }: StateLabelProps) => {
  let stateText = '-'

  switch (state) {
    case 'error':
      stateText = 'Xato'
      break
    case 'success':
      stateText = 'Muvaffaqiyatli'
      break
  }

  return <span>{stateText}</span>
}

export default TagLabel
