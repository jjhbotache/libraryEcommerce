// src/utils/myFetch.tsx
export default function myFetch({
  url,
  method = 'GET',
  data,
  headers,
}:{
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: unknown;
  headers?: unknown;
}){
  const userData = sessionStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;

  const headersToSend = {
    ...(typeof headers === 'object' && headers !== null ? headers : {}),
    ...(token ? { Authorization: `${token}` } : {}),
  };

  return fetch(url, {
    method,
    headers: headersToSend,
    body: data ? JSON.stringify(data) : undefined,
  })
};