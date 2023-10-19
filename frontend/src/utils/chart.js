export const reduceByKey = (data, key) => {
  return data.map(row => row[key])
}