import {printResults, readFile, split} from '../utils.js'

const getCalories = (content) => {
    const res = content
        .split(split + split)
        .map(e => e.split(split)
            .map(i => +i)
            .reduce((s, c)=>s+c), 0)
        .sort((a,b)=>b-a)

    return [res[0], res[1], res[2]]
}

const part_one = async () => {
    const content = await readFile('./input.txt')
    return getCalories(content)[0]
}

const part_two = async () => {
    const content = await readFile('./input.txt')
    const [a,b,c] = getCalories(content)
    return a+b+c
}

printResults(part_one, part_two)