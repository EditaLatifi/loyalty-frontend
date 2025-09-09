export function useBusiness() {
  const data = localStorage.getItem('business');
  return data ? JSON.parse(data) : null;
}
