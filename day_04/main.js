import {printResults, readFile, split} from '../utils.js'

const arrayFromRange = (start, end) => {
    const arr = []
    for (let i = start; i <= end; i++) {
        arr.push(i)
    }
    return arr
}

const splitSectionRanges = content => content
    .split(split)
    .map(range => range
        .split(',')
        .map(section => section
            .split('-')
            .map(n => +n)))

const part_one = async () => {
    return splitSectionRanges(await readFile('./input.txt'))
        .reduce((sumOfSames, [first, second]) => {
            const firstInSecond = first[0] >= second[0] && first[1] <= second[1]
            const secondInFirst = first[0] <= second[0] && first[1] >= second[1]
            if (firstInSecond || secondInFirst) {
                return sumOfSames + 1
            }
            return sumOfSames
        }, 0)
}

const part_two = async () => {
    return splitSectionRanges(await readFile('./input.txt'))
        .reduce((sumOfOverlaps, [first, second]) => {
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
}

printResults(part_one, part_two)