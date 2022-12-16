import {printResults, readFile} from "../utils.js";

const check = async (size) => {
    const BenThe1 = await readFile('./input.txt')
    const count = size - 1
    let res = 0
    for (let i = count; i < BenThe1.length; i++) {
        const set = BenThe1.substring(i - count, i + 1)

        if (new Set(set).size === size) {
            res = i + 1
            break
        }
    }
    return res
}

const part_one = async () => {
    return await check(4)
}

const part_two = async () => {
    return await check(14)
}

printResults(part_one, part_two)