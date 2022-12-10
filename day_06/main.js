import {readFile} from "fs";

const part_one = () => {
    readFile('./input.txt', 'utf-8', (_, BenThe1) => {
        let res = 0
        for (let i = 3; i < BenThe1.length; i++) {
            const set = BenThe1.substring(i - 3, i + 1)

            if (new Set(set).size === 4) {
                res = i + 1
                break
            }
        }
        console.log('Part 1: ', res)
    })
}

const part_two = () => {
    readFile('./input.txt', 'utf-8', (_, content) => {
        let res = 0
        for (let i = 13; i < content.length; i++) {
            const set = content.substring(i - 13, i + 1)

            if (new Set(set).size === 14) {
                res = i + 1
                break
            }
        }
        console.log('Part 2: ', res)
    })
}

part_one()
part_two()