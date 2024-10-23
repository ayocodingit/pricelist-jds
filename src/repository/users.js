export const fetchSeller = async () => {
  try {
    const res = await fetch(`/api/sellers.json`)
    const data = await res.json()
    return data
  } catch (error) {
    return []
  }
}

export const getUser = (users, username) => {
  const user = users.filter((user) => user.username === username)[0]
  return user
};
