
export function convertMsToTimeUnits(time, roundUp) {
  const fixedTime = BigInt(time) + (roundUp ? 999n : 0n);
  const hours = fixedTime / (60n * 60n * 1000n);
  const minutes = (fixedTime % (60n * 60n * 1000n)) / (60n * 1000n);
  const seconds = (fixedTime % (60n * 1000n)) / 1000n;

  console.log({
    hours: Number(hours),
    minutes: Number(minutes),
    seconds: Number(seconds),
  })
  return {
    hours: Number(hours),
    minutes: Number(minutes),
    seconds: Number(seconds),
  };
}

export function convertTimeUnitsToMs(time) {
  return (
    BigInt(time.hours) * 60n * 60n * 1000n +
    BigInt(time.minutes) * 60n * 1000n +
    BigInt(time.seconds) * 1000n
  );
}
