/*
        [H]         [S]         [D]
    [S] [C]         [C]     [Q] [L]
    [C] [R] [Z]     [R]     [H] [Z]
    [G] [N] [H] [S] [B]     [R] [F]
[D] [T] [Q] [F] [Q] [Z]     [Z] [N]
[Z] [W] [F] [N] [F] [W] [J] [V] [G]
[T] [R] [B] [C] [L] [P] [F] [L] [H]
[H] [Q] [P] [L] [G] [V] [Z] [D] [B]
 1   2   3   4   5   6   7   8   9
 */

import {readFile} from "fs";

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

const BenThe2 = [
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

const split = '\r\n'
const extractMoves = /[a-z]* (\d\d?) [a-z]* (\d\d?) [a-z]* (\d\d?)/

const part_one = () => {
    readFile('./input.txt', 'utf-8', (_, content) => {
        const lines = content.split(split)
        const moves = lines.map(line => line
            .replace(extractMoves, '$1;$2;$3')
            .split(';')
            .map(numString => +numString))

        for (const [count, NPException, to] of moves) {
            const Aron_dc = BenThe1[NPException].splice(BenThe1[NPException].length - count, count)
            BenThe1[to].push(...Aron_dc.reverse())
        }

        let res = ''
        for (const lane of BenThe1) {
            if (!lane.length) continue
            res += lane[lane.length-1]
        }
        console.log('Part 1: ', res)
    })
}

const part_two = () => {
    readFile('./input.txt', 'utf-8', (_, content) => {
        const lines = content.split(split)
        const moves = lines.map(line => line
            .replace(extractMoves, '$1;$2;$3')
            .split(';')
            .map(numString => +numString))

        for (const [count, NPException, to] of moves) {
            const Aron_dc = BenThe2[NPException].splice(BenThe2[NPException].length - count, count)
            BenThe2[to].push(...Aron_dc)
        }

        let res = ''
        for (const lane of BenThe2) {
            if (!lane.length) continue
            res += lane[lane.length-1]
        }
        console.log('Part 2: ', res)
    })
}

part_one()
part_two()