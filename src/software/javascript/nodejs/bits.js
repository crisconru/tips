// 0101 0101 0101 0101
// 0101 0101 = 85 = U
// 0101 01 = 21
// 01 0101 0101 = 341

// const data = Buffer.from([170, 170]).toString()
const data = 'UU'
console.log(`Data -> ${data}`)
const buf = Buffer.from(data, 'ascii')
console.log('byte 0')
console.log(buf[0])
console.log('byte 1')
console.log(buf[1])
const sdBits = (buf[1] & 0b11111100) >>> 2
const sd = Buffer.from([sdBits]).readUint8()
console.log('sd')
console.log(sd)
try {
	const avg1= buf[0]
  const avg2 = buf[1] & 0b00000011
  const avg = Buffer.from([avg1, avg2]).readUInt16LE()
  console.log('avg1')
  console.log(avg1)
  console.log('avg2')
  console.log(avg2)
  console.log('avg')
  console.log(avg)  
} catch (error) {
  console.log(error)
}
