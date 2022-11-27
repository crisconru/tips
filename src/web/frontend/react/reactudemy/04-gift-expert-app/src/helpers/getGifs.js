export const getGifs = async (category, limit = 5) => {
  const apikey = 'pFrICczHs17HyVh26INqFMVEVUa45JlC'
  const q = encodeURI(category)
  // const limit = '5'
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${limit}`
  const resp = await fetch(url)
  const { data } = await resp.json()
  // console.log(data)
  return data.map((img) => {
    return {
      id: img.id,
      title: img.title,
      url: img.images?.downsized_medium.url
    }
  })
}
