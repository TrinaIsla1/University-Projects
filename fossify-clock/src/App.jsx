import { useState } from 'react'

/*
  Simple Fossify Clock look-alike (Alarm tab only).
  Working features: "+" button (add alarm), set alarm time (tap an alarm), delete, on/off switch.
*/

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const pad = (n) => String(n).padStart(2, '0')

const START = [
  {
    id: 1,
    hour: 7,
    minute: 0,
    days: [1, 2, 3, 4, 5],
    enabled: false,
    vibrate: false,
    label: '',
  },
  {
    id: 2,
    hour: 9,
    minute: 0,
    days: [0, 6],
    enabled: false,
    vibrate: false,
    label: '',
  },
]

function daysText(a) {
  const prefix = a.label ? a.label + ', ' : ''
  if (a.days.length === 0) {
    const n = new Date()
    return (
      prefix +
      (a.hour * 60 + a.minute <= n.getHours() * 60 + n.getMinutes()
        ? 'Tomorrow'
        : 'Today')
    )
  }
  if (a.days.length === 7) return prefix + 'Every day'
  return (
    prefix +
    [...a.days]
      .sort()
      .map((d) => DAY_NAMES[d])
      .join(', ')
  )
}

function Time({ hour, minute }) {
  return (
    <span className="time">
      {hour % 12 === 0 ? 12 : hour % 12}:{pad(minute)}
      <span className="ampm">{hour < 12 ? 'am' : 'pm'}</span>
    </span>
  )
}

const Icon = ({ d, size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d={d} />
  </svg>
)
const PATH = {
  sort: 'M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z',
  more: 'M12 8a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z',
  plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  vibrate:
    'M0 15h2V9H0v6zm3 2h2V7H3v10zm19-8v6h2V9h-2zm-3 8h2V7h-2v10zM16.5 3h-9C6.67 3 6 3.67 6 4.5v15c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM16 19H8V5h8v14z',
  bell: 'M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
  label:
    'M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z',
  clock:
    'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z',
  alarm:
    'M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4a9 9 0 100 18 9 9 0 000-18zm0 16a7 7 0 110-14 7 7 0 010 14z',
  stopwatch:
    'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.96 8.96 0 0012 4a9 9 0 109 9c0-2.12-.74-4.07-1.97-5.61zM12 20a7 7 0 110-14 7 7 0 010 14z',
  timer:
    'M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zM16 8l-4 4-4-4V4h8v4z',
}

export default function App() {
  const [alarms, setAlarms] = useState(START)
  const [draft, setDraft] = useState(null) // alarm being added/edited (id === null → new)

  const toggle = (id) =>
    setAlarms((l) =>
      l.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    )

  // "+" button
  const add = () =>
    setDraft({
      id: null,
      hour: 8,
      minute: 0,
      days: [new Date().getDay()],
      enabled: true,
      vibrate: false,
      label: '',
    })

  const save = () => {
    if (draft.id === null)
      setAlarms((l) => [...l, { ...draft, id: Date.now(), enabled: true }])
    else
      setAlarms((l) =>
        l.map((a) => (a.id === draft.id ? { ...draft, enabled: true } : a)),
      )
    setDraft(null)
  }

  const remove = () => {
    setAlarms((l) => l.filter((a) => a.id !== draft.id))
    setDraft(null)
  }

  const toggleDay = (d) =>
    setDraft((x) => ({
      ...x,
      days: x.days.includes(d) ? x.days.filter((v) => v !== d) : [...x.days, d],
    }))

  return (
    <div className="phone">
      <style>{CSS}</style>

      <div className="toolbar">
        <Icon d={PATH.sort} />
        <Icon d={PATH.more} />
      </div>

      <ul className="alarms">
        {alarms.map((a) => (
          <li key={a.id}>
            <div className="info" onClick={() => setDraft({ ...a })}>
              <Time hour={a.hour} minute={a.minute} />
              <div className="days">{daysText(a)}</div>
            </div>
            <button
              className={'switch' + (a.enabled ? ' on' : '')}
              onClick={() => toggle(a.id)}
            >
              <span className="knob" />
            </button>
          </li>
        ))}
      </ul>

      <button className="fab" onClick={add}>
        <Icon d={PATH.plus} size={30} />
      </button>

      <nav className="bottom">
        {[
          ['clock', 'Clock'],
          ['alarm', 'Alarm'],
          ['stopwatch', 'Stopwatch'],
          ['timer', 'Timer'],
        ].map(([k, name]) => (
          <div key={k} className={'tab' + (k === 'alarm' ? ' active' : '')}>
            <Icon d={PATH[k]} size={28} />
            {name}
          </div>
        ))}
      </nav>

      {draft && (
        <div className="scrim" onClick={() => setDraft(null)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            {/* set the alarm time */}
            <label
              className="dialog-time"
              onClick={(e) => {
                e.preventDefault()
                e.currentTarget.querySelector('input').showPicker?.()
              }}
            >
              <Time hour={draft.hour} minute={draft.minute} />
              <input
                type="time"
                value={`${pad(draft.hour)}:${pad(draft.minute)}`}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(':').map(Number)
                  if (!Number.isNaN(h))
                    setDraft({ ...draft, hour: h, minute: m })
                }}
              />
            </label>

            <div className="day-row">
              {DAY_LETTERS.map((l, i) => (
                <button
                  key={i}
                  className={'day' + (draft.days.includes(i) ? ' sel' : '')}
                  onClick={() => toggleDay(i)}
                >
                  {l}
                </button>
              ))}
            </div>

            <label className="row">
              <Icon d={PATH.vibrate} size={30} />
              <span className="grow">Vibrate</span>
              <input
                type="checkbox"
                checked={draft.vibrate}
                onChange={(e) =>
                  setDraft({ ...draft, vibrate: e.target.checked })
                }
              />
            </label>
            <div className="row">
              <Icon d={PATH.bell} size={30} />
              <span className="grow">Default (fairviews)</span>
            </div>
            <div className="row">
              <Icon d={PATH.label} size={30} />
              <input
                className="label-input"
                placeholder="Label"
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </div>

            <div className="actions">
              {draft.id !== null && (
                <button className="del" onClick={remove}>
                  Delete
                </button>
              )}
              <span className="grow" />
              <button onClick={() => setDraft(null)}>Cancel</button>
              <button onClick={save}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const CSS = `
html, body { margin: 0; background: #000; }
.phone { position: relative; width: 100%; max-width: 420px; height: 100vh; margin: 0 auto; background: #1d1d1f; color: #fff;
  display: flex; flex-direction: column; overflow: hidden; font-family: Roboto, "Segoe UI", system-ui, sans-serif; }
.phone * { box-sizing: border-box; }
.phone button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
.toolbar { display: flex; justify-content: flex-end; gap: 22px; padding: 22px 24px 8px; }
.alarms { list-style: none; margin: 0; padding: 12px 20px; flex: 1; overflow-y: auto; }
.alarms li { display: flex; align-items: center; justify-content: space-between; padding: 10px 0 14px; }
.info { flex: 1; cursor: pointer; }
.time { font-size: 76px; font-weight: 300; line-height: 1; letter-spacing: -1px; }
.ampm { font-size: 34px; margin-left: 12px; letter-spacing: 0; }
.days { margin-top: 6px; font-size: 18px; }
.switch { width: 54px; height: 32px; border-radius: 16px; background: #4a4a4f; border: 2px solid #8b8b90 !important; position: relative; flex-shrink: 0; }
.switch .knob { position: absolute; top: 5px; left: 6px; width: 16px; height: 16px; border-radius: 50%; background: #9a9a9f; }
.switch.on { background: #8e90a8; border-color: #8e90a8 !important; }
.switch.on .knob { left: 27px; top: 3px; width: 22px; height: 22px; background: #1d1d1f; }
.fab { position: absolute; right: 24px; bottom: 104px; width: 64px; height: 64px; border-radius: 18px; background: #8a8ca0 !important; display: grid; place-items: center; box-shadow: 0 3px 8px rgba(0,0,0,.4); }
.bottom { display: flex; background: #2d2e38; padding: 14px 0 12px; }
.tab { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 14px; }
.tab.active { color: #9a9bad; }
.scrim { position: absolute; inset: 0; background: rgba(0,0,0,.6); display: grid; place-items: center; z-index: 10; }
.dialog { width: 90%; background: #2a2a30; border-radius: 28px; padding: 28px 24px 20px; }
.dialog-time { display: block; position: relative; cursor: pointer; margin-bottom: 20px; }
.dialog-time input { position: absolute; inset: 0; opacity: 0; width: 100%; cursor: pointer; }
.day-row { display: flex; justify-content: space-between; margin-bottom: 26px; }
.day { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid #fff !important; font-size: 18px; }
.day.sel { background: #fff !important; color: #2a2a30 !important; }
.row { display: flex; align-items: center; gap: 22px; padding: 16px 0; font-size: 20px; }
.grow { flex: 1; }
.row input[type=checkbox] { width: 24px; height: 24px; accent-color: #8e90a8; }
.label-input { flex: 1; min-width: 0; background: none; border: 1.5px solid #8b8b90; border-radius: 6px; padding: 16px; font-size: 18px; color: #fff; outline: none; }
.label-input:focus { border-color: #fff; }
.actions { display: flex; align-items: center; gap: 36px; padding: 16px 20px 0 0; font-size: 18px; color: #a9aabd; }
.actions .del { color: #e57373; }
`
