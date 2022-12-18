import {printResults, readFile, split} from '../utils.js';


const isKnotBesideKnot = ([firstX, firstY], [secondX, secondY]) => {
    return Math.abs(firstX - secondX) <= 1 && Math.abs(firstY - secondY) <= 1
}

const moveAxis = (dir, index, arr) => {
    switch (dir) {
        case 'L':
            arr[index][0]--
            break
        case 'R':
            arr[index][0]++
            break
        case 'U':
            arr[index][1]++
            break
        case 'D':
            arr[index][1]--
            break
    }
}

const moveKnots = async knotCount => {
    const content = await readFile('./input.txt')
    const instructions = content.split(split).map(line => line.split(' '))

    const bruttosozial = []
    for (let i = 0; i < knotCount; i++) {
        bruttosozial.push([0,0])
    }

    const res = new Set(['0:0'])

    for (const instruction of instructions) {
        const [direction, distance] = instruction
        for (let i = 0; i < +distance; i++) {
            moveAxis(direction, 0, bruttosozial)

            for (let j = 1; j < bruttosozial.length; j++) {
                const previous = [...bruttosozial[j-1]]
                const current = bruttosozial[j]
                if (isKnotBesideKnot(previous, current)) continue

                const [mX, mY] = [
                    Math.sign(previous[0] - current[0]),
                    Math.sign(previous[1] - current[1])
                ]

                current[0] = current[0] + mX
                current[1] = current[1] + mY

                if (j === bruttosozial.length - 1) {
                    res.add(current.join(':'))
                }
            }
        }
    }
    return res.size
}

const part_one = async () => {
    return await moveKnots(2)
}

const part_two = async () => {
    return await moveKnots(10)
}

printResults(part_one, part_two)