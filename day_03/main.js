import {printResults, readFile, split} from '../utils.js'

const getPrio = char => {
    const code = char.charCodeAt(0) - 65
    if (code < 27) return code + 27
    return code - 31
}

const part_one = async () => {
    return (await readFile('./input.txt'))
        .split(split).reduce((sumPriority, rucksack) => {
        const first = rucksack.substring(0, rucksack.length / 2)
        const second = rucksack.substring(rucksack.length / 2)

        const shared = [...first].find(char => second.includes(char))

        return sumPriority + getPrio(shared)

    }, 0)
}

const part_two = async () => {
    const splitThreeLines = /(\w+\r\n\w+\r\n\w+\r\n)/g
    return (await readFile('./input.txt'))
        .split(splitThreeLines).filter(e => !!e)
        .filter(e => !!e)
        .map(elves => elves.split(split).filter(e => !!e))
        .reduce((sumPriority, elfGroup) => {
            const [first, second, third] = elfGroup

            const shared = [...first].find(char => second.includes(char) && third.includes(char))

            return sumPriority + getPrio(shared)

        }, 0)
}

printResults(part_one, part_two)