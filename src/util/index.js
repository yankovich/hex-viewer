export const randomASCII = () => {
  const hex = random()
    .toString()
    .padStart(3, "ef")
  let result = ""
  for (var n = 0; n < hex.length; n += 2) {
    result += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }
  return result
}

export const randomHEX = () => {
  return random()
    .toString(16)
    .padStart(2, "0")
}

const random = (min = 0, max = 255) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const countDecorator = value => {
  return value
    .toString(16)
    .padStart(7, "0")
    .padEnd(8, "0")
}
