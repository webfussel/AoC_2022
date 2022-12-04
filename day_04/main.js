import {readFile} from "fs";

const split = '\r\n'

const arrayFromRange = (start, end) => {
    const arr = []
    for (let i = start; i <= end; i++) {
        arr.push(i)
    }
    return arr
}

const part_one = () => {
    readFile('./input.txt', 'utf-8', (_, content) => {
        const pairs = content
            .split(split)
            .map(range => range
                .split(',')
                .map(section => section
                    .split('-')
                    .map(n => +n)))

        const contained = pairs.reduce((sumOfSames, [first, second]) => {
            const firstInSecond = first[0] >= second[0] && first[1] <= second[1]
            const secondInFirst = first[0] <= second[0] && first[1] >= second[1]
            if (firstInSecond || secondInFirst) {
                return sumOfSames + 1
            }
            return sumOfSames
        }, 0)

        console.log('Part one: ', contained)
    })
}

const part_two = () => {
    readFile('./input.txt', 'utf-8', (_, content) => {
        const pairs = content
            .split(split)
            .map(range => range
                .split(',')
                .map(section => section
                    .split('-')
                    .map(n => +n)))

        const overlaps = pairs.reduce((sumOfOverlaps, [first, second]) => {
            const firstRange = arrayFromRange(first[0], first[1])
            const secondRange = arrayFromRange(second[0], second[1])
            const [short, long] = firstRange.length < secondRange.length
                ? [firstRange, secondRange]
                : [secondRange, firstRange]

            if (short.some(section => long.includes(section))) {
                return sumOfOverlaps + 1
            }

            return sumOfOverlaps
        }, 0)

        console.log('Part two: ', overlaps)
    })
}

part_one()
part_two()