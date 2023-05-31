export default async function getProjectById (req, res) {
  const id: string = req.query.id
  const baseUrl: string = 'http://127.0.0.1:3002/projects/'
  const response = await fetch(`${baseUrl}${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:3002',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
  const data = await response.json()
  return data
}
