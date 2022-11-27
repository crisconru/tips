export const getColors = () => {
  return ['yellow', 'red', 'blue']
}

export const removeColorFromArray = (array: string[], color: string) => {
  return array.filter(element => element !== color)
}

export const result = removeColorFromArray(getColors(), 'blue')