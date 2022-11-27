export const heavyProcess = (iterations) => {
    for(let i = 0; i < iterations; i++) {
        console.log(`Heavy process ${i}...`)
    }
    return `${iterations} completed`
}