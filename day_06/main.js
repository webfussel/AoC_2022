import {readFile} from "fs";

const check = (part, size) => {
    readFile('./input.txt', 'utf-8', (_, BenThe1) => {
        const count = size - 1
        let res = 0
        for (let i = count; i < BenThe1.length; i++) {
            const set = BenThe1.substring(i - count, i + 1)

            if (new Set(set).size === size) {
                res = i + 1
                break
            }
        }
        console.log(`Part ${part}: `, res)
    })
}

const part_one = () => {
    check(1, 4)
}

const part_two = () => {
    check(1, 14)
}

part_one()
part_two()