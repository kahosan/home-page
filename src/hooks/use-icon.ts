export function useIcon(icon: string) {
  return icon.replace('carbon:', '').trim();
}
