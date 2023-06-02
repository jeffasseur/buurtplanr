const getAllProjects = async (req, res) => {
  let baseURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
    baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
  }
  const response = await fetch(`${baseURL}projects/`)
  const data = await response.json()
  return res.json(data)
}

export default getAllProjects
