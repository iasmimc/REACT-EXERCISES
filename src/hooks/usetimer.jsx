import { useEffect, useState } from "react";
import { convertMsToTimeUnits, convertTimeUnitsToMs } from "../util/conversoes";

function minBigInt(...args) {
  return args.reduce((acc, v) => acc > v ? v : acc)
}
function maxBigInt(...args) {
  return args.reduce((acc, v) => acc < v ? v : acc)
}

const DEFAULT_TIMERSTATE = {
  timeElapsed: 0n,
  currentMs: undefined,
}

export function useTimer() {
  const [timerState, setTimerState] = useState(DEFAULT_TIMERSTATE)
  const [time, setTime] = useState({ hours: 0n, minutes: 0n, seconds: 0n })
  const [running, setRunning] = useState(false)

  const timeMs = convertTimeUnitsToMs(time)
  const timeElapsedMs = timerState.timeElapsed
  const timeMissingMs = maxBigInt(0n, timeMs - timerState.timeElapsed)
  const timeOverdueMs = minBigInt(0n, timeMs - timerState.timeElapsed) * -1n


  useEffect(() => {
      if (running) {
          const updateTime = () => {
              setTimerState(ts => ({
                  ...ts,
                  currentMs: BigInt(new Date().valueOf()),
                  timeElapsed: ts.timeElapsed + (BigInt(new Date().valueOf()) - ts.currentMs)
              }))
          }

          // Se startedAt está definido, faz coisas
          setTimerState(ts => ({
              ...ts,
              currentMs: BigInt(new Date().valueOf()),
          }))

          const interval = setInterval(updateTime, 16)
          return () => clearInterval(interval)
      }
  }, [running])

  return {
      timeElapsedMs,
      timeMissingMs,
      timeOverdueMs,
      timeMs,
      timeElapsedParts: convertMsToTimeUnits(timerState.timeElapsed),
      timeMissingParts: convertMsToTimeUnits(timeMissingMs, true),
      timeOverdueParts: convertMsToTimeUnits(timeOverdueMs),
      timeParts: convertMsToTimeUnits(timeMs),
      running,

      setTimer: (e) => setTime(t => ({ ...t, ...e })),
      startTimer: () => setRunning(true),
      resetTimer: () => {
          setRunning(false)
          setTimerState(DEFAULT_TIMERSTATE)
          setTime({seconds: 0n, minutes: 0n, hours: 0n})
      },
      pauseTimer: () => setRunning(false),
  }
}

export function useEditing() {
  const [editing, setEditing] = useState(false)
  return {
      editing,
      toggleEditing: () => setEditing(e => !e)
  }
}