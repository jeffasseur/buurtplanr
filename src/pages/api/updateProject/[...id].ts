export default async function updateProject (req, res) {
  const id = req.query.id
  const baseUrl = 'http://127.0.0.1:3002/projects/'
  const response = await fetch(`${baseUrl}${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:3002',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: req.body
  })
  const data = await response.json()
  return data
}
