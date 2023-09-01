import { basePath } from "lib/basePath"

// GET /api/search
const searchQuery = async (query: string) => {
  const apiPath = `${basePath}/api/searchQuery/`
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'text/html' },
      body: query,
  };
  console.log(query)
  console.log(requestOptions)
  return fetch(apiPath, requestOptions).then(response => response.json()).then(data => {
    console.log(data)
    return data
  })
}

export default searchQuery;