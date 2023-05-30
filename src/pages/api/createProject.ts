export default async function createProject (req, res) {
  const response = await fetch('http://127.0.0.1:3002/projects/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:3002/',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(req.body)
  })
  const data = await response.json()
  return res.json(data)
}
