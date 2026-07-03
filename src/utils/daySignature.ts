export function todaySignature(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function stableIndex(seed: string, size: number) {
  const value = seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return size === 0 ? 0 : value % size;
}

export function nextScheduleText() {
  const date = new Date(Date.now() + 60 * 60 * 1000);
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const dd = `${date.getDate()}`.padStart(2, '0');
  const hh = `${date.getHours()}`.padStart(2, '0');
  const min = `${date.getMinutes()}`.padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
