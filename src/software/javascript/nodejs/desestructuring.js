// const a = {
//     uno: 1,
//     dos: 2,
//     tres: 3,
//     data: {
//         cuatro: 4,
//         cinco: 5
//     }
// }

// const b = {
//     uno: 11,
//     tres: 33,
//     data: {
//         cinco: 55,
//         seis: 6
//     }
// }

// const save = (a1, a2) => {
//     Object.keys(a2).forEach(key => {
//         if (a1.hasOwnProperty(key)) {
//             a1[key] = a2[key]
//         }
//     })
// }

// save(a, b)
// console.log(Object.entries(a))

const a = {
    a: [2, 5]
}

const b = 8

const getLostMessages = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

a.a = [...a.a, ...getLostMessages(a.a[a.a.length -1] + 1, b)]
console.log(a.a)
console.log(a)