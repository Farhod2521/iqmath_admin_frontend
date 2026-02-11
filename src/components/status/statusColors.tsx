export const statusColors = {
  btn__primary: ' bg-blue-100 text-blue-700',
  btn__secondary: ' bg-zinc-200 text-zinc-700',
  btn__success: ' bg-green-100 text-green-700',
  btn__danger: ' bg-red-200 text-red-700',
  btn__warning: ' bg-orange-100 text-orange-700',
  btn__info: ' bg-teal-200 text-teal-700',
  btn__light: ' bg-cyan-100 text-cyan-950',
  btn__dark: ' bg-neutral-900 text-fuchsia-100',
  btn__ink: ' text-blue-900 underline'
}

export const statusColorList = Object.entries(statusColors).map(([key, value]) => ({ key, value }))
