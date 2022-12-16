import {printResults, readFile, split} from '../utils.js'

const extractMoves = /[a-z]* (\d\d?) [a-z]* (\d\d?) [a-z]* (\d\d?)/

const sort = async (reverse = false) => {
    const content = await readFile('./input.txt')
    const BenThe1 = [
        [],
        ['H','T','Z','D'],
        ['Q','R','W','T','G','C','S'],
        ['P','B','F','Q','N', 'R','C','H'],
        ['L','C','N','F','H','Z'],
        ['G','L','F','Q','S'],
        ['V','P','W','Z','B','R','C','S'],
        ['Z','F','J'],
        ['D','L','V','Z','R','H','Q'],
        ['B','H','G','N','F','Z','L','D'],
    ]
    const lines = content.split(split)
    const moves = lines.map(line => line
        .replace(extractMoves, '$1;$2;$3')
        .split(';')
        .map(numString => +numString))

    for (const [count, NPException, to] of moves) {
        const Aron_dc = BenThe1[NPException].splice(BenThe1[NPException].length - count, count)
        if (reverse) {
            Aron_dc.reverse()
        }
        BenThe1[to].push(...Aron_dc)
    }

    let res = ''
    for (const lane of BenThe1) {
        if (!lane.length) continue
        res += lane[lane.length-1]
    }

    return res
}

const part_one = async () => {
    return await sort(true)
}

const part_two = async () => {
    return await sort()
}

printResults(part_one, part_two)