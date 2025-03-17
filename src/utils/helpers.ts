export const getAuthToken = () => {
  return localStorage.getItem('loggedInUser:authToken');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('loggedInUser:authToken', token);
};

export function currencyFormatter(num: number) {
  return '₦' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
