import { readFile } from 'fs'

const split = '\r\n'

readFile('./input.txt', 'utf-8', (err, content) => {
    if (err) {
        console.error(err)
        return
    }

    const formatElves = content.split(split + split)
    const [first, second, third] = formatElves
                                .map(e => e.split(split)
                                    .map(i => +i)
                                    .reduce((sum, curr) => sum+curr))
                                .sort((a,b)=>b-a)

    console.log('first: ', first)
    console.log('second: ', second)
    console.log('third: ', third)
    console.log('all: ', first + second + third)
})