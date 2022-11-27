
const API = "https://api.github.com/users/"
const REQUESTMAXTIME = 3000

const app = Vue.createApp({
  data() {
    return {
      search: null,
      result: null,
      error: null,
      favorites: new Map()
    }
  },
  created() {
    const storageFavorites = JSON.parse(window.localStorage.getItem('favorites'))
    if (storageFavorites?.length){
      this.favorites = new Map(storageFavorites.map(favorite => [favorite.login, favorite]))
    }
  },
  computed: {
    isFavorite() {
      if (this.result === null) return false 
      return this.favorites.has(this.result.login)
    },
    allFavorites() {
      return Array.from(this.favorites.values())
    }
  },
  methods: {
    async doSearch() {
      this.result = this.error = null
      const foundInFavorites = this.favorites.get(this.search)
      const shouldRequestAgain = () => {
        if (Boolean(foundInFavorites)) {
          const { lastRequestTime } = foundInFavorites
          const now = Date.now()
          return (now - lastRequestTime) > REQUESTMAXTIME
        }
        return false
      }
      if (shouldRequestAgain()) {
        this.result = foundInFavorites
        this.search = null
        return
      } 
      try {
        const response = await fetch(API + this.search)
        // console.log(response)
        if (!response.ok) throw new Error(`User ${this.search} not found`)
        const data = await response.json()
        // console.log(data)
        this.result = data
        this.result.lastRequestTime = Date.now()
      } catch (error) {
        this.error = error
      } finally {
        this.search = null
      }
    },
    addFavorite() {
        this.result.lastRequestTime = Date.now()
        this.favorites.set(this.result.login, this.result)
        this.updateStorage()
    },
    removeFavorite() {
        this.favorites.delete(this.result.login)
        this.updateStorage()
    },
    showFavorite(favorite) {
      this.result = favorite
    },
    checkFavorite(login) {
      return this.result?.login === login
    },
    updateStorage() {
      window.localStorage.setItem('favorites', JSON.stringify(this.allFavorites))
    }
  }
})

// app.mount('#app')
