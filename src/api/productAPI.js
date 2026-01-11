export default async function getProductList() {
   try {
      const response = await fetch(`${import.meta.env.BASE_URL}data.json`)
      
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Failed to fetch products:', error)
      throw error
   }
}