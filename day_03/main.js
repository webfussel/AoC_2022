import {readFile} from "fs";

const split = '\r\n'

const getPrio = char => {
    const code = char.charCodeAt(0) - 65
    if (code < 27) return code + 27
    return code - 31
}

const part_one = () => {
    readFile('./input.txt', 'utf-8', (_, content) => {
        const score = content.split(split).reduce((sumPriority, rucksack) => {
            const first = rucksack.substring(0, rucksack.length / 2)
            const second = rucksack.substring(rucksack.length / 2)

            const shared = [...first].find(char => second.includes(char))

            return sumPriority + getPrio(shared)

        }, 0)

        console.log('Part one: ', score)
    })
}

const part_two = () => {
    const splitThreeLines = /(\w+\r\n\w+\r\n\w+\r\n)/g
    readFile('./input.txt', 'utf-8', (_, content) => {
        const score = content
            .split(splitThreeLines).filter(e => !!e)
            .filter(e => !!e)
            .map(elves => elves.split(split).filter(e => !!e))
            .reduce((sumPriority, elfGroup) => {
                const [first, second, third] = elfGroup

                const shared = [...first].find(char => second.includes(char) && third.includes(char))

                return sumPriority + getPrio(shared)

            }, 0)

        console.log('Part two: ', score)
    })
}

part_one()
part_two()