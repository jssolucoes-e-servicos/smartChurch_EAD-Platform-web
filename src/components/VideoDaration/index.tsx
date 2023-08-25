type VideoDurationType = {
className?: string,
seconds: number
}

export default function VideoDuration({ className, seconds }:VideoDurationType) {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  )
}

function format(seconds:number) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours().toString()
  const mm = date.getUTCMinutes().toString()
  const ss = pad(date.getUTCSeconds().toString())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}s`
  }
  return `${mm}:${ss}s`
}

function pad(string: string) {
  return ('0' + string).slice(-2)
}