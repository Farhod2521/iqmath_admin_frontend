import { Spin } from 'antd'

function Loading() {
  return (
    <div className="absolute w-full h-full bg-white">
      <div className="flex justify-center absolute top-0 bottom-0 left-0 right-0 h-20 m-auto">
        <Spin size="large" />
      </div>
    </div>
  )
}

export default Loading
