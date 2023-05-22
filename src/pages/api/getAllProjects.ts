export default async function getAllProjects (res) {
  const response = await fetch('http://127.0.0.1:3002/projects/')
  const data = await response.json()
  return res.json(data)
}
