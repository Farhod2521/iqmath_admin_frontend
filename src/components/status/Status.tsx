// btn__primary
// btn__secondary
// btn__success
// btn__danger
// btn__warning
// btn__info
// btn__light
// btn__dark
// btn__ink

type StatusProps = {
  type: string
  name: string
}

function Status({ type, name }: StatusProps) {
  switch (type) {
    case 'btn__primary':
      return <div className="px-2 py-1 rounded text-sm w-full text-center bg-blue-100 text-blue-700">{name}</div>
    case 'btn__secondary':
      return <div className="px-2 py-1 rounded text-sm w-full text-center bg-zinc-200 text-zinc-700">{name}</div>
    case 'btn__success':
      return <div className="px-2 py-1 rounded text-sm w-full text-center bg-green-100 text-green-700">{name}</div>
    case 'btn__danger':
      return <div className="px-2 py-1 rounded text-sm w-full text-center bg-red-200 text-red-700">{name}</div>
    case 'btn__warning':
      return <div className="px-2 py-1 rounded text-sm w-full text-center bg-orange-100 text-orange-700">{name}</div>
    case 'btn__info':
      return <div className="px-2 py-1 rounded text-sm w-full text-center bg-teal-200 text-teal-700">{name}</div>
    case 'btn__light':
      return <div className="px-2 py-1 rounded text-sm w-full text-center bg-cyan-100 text-cyan-950">{name}</div>
    case 'btn__dark':
      return <div className="px-2 py-1 rounded text-sm w-full text-center bg-neutral-900 text-fuchsia-100">{name}</div>
    case 'btn__ink':
      return <div className="px-2 py-1 rounded text-sm w-full text-center text-blue-900 underline">{name}</div>
    default:
      return <div>{name}</div>
  }
}

export default Status
