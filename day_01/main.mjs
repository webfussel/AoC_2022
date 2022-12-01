import { readFile } from 'fs'

const split = '\r\n'

readFile('./input.txt', 'utf-8', (_, content) => {
    const [first, second, third] = content
                                .split(split + split)
                                .map(e => e.split(split)
                                    .map(i => +i)
                                    .reduce((s, c)=>s+c), 0)
                                .sort((a,b)=>b-a)

    console.log('first: ', first)
    console.log('second: ', second)
    console.log('third: ', third)
    console.log('all: ', first + second + third)
})