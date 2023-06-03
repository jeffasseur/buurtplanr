export const updateProject = async (req, res) => {
  let baseURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
    baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
  }
  const id: string = req.query.id
  const response = await fetch(`${baseURL}+${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${baseURL}`,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: req.body
  })
  const data = await response.json()
  return data
}
