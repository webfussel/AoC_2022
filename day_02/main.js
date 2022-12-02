import {readFile} from "fs";

const moves = {
    rock : {
        score: 1,
        kills: ['C', 'Z'],
        chars: ['A', 'X'],
        dies: 'B'
    },
    paper : {
        score: 2,
        kills: ['A', 'X'],
        chars: ['B', 'Y'],
        dies: 'C'
    },
    scissors : {
        score: 3,
        kills: ['B', 'Y'],
        chars: ['C', 'Z'],
        dies: 'A'
    }
}

const scores = {
    win : {
        score: 6,
        char: 'Z'
    },
    draw: {
        score: 3,
        char: 'Y'
    },
    lose: {
        score: 0,
        char: 'X'
    }
}

const split = '\r\n'

const part_one = () => {
    readFile('./input.txt', 'utf-8', (_, content) => {
        const score = content
            .split(split)
            .reduce((res, curr) => {
                const [enemy, you] = curr.split(' ')
                const enemyTool = Object.values(moves).find(tool => tool.chars.includes(enemy))
                const yourTool = Object.values(moves).find(tool => tool.chars.includes(you))

                if (enemyTool.kills.includes(you)) return res + yourTool.score + scores.lose.score
                if (yourTool.kills.includes(enemy)) return res + yourTool.score + scores.win.score
                return res + yourTool.score + scores.draw.score
            }, 0)

        console.log('Part one: ', score)
    })
}

const part_two = () => {
    readFile('./input.txt', 'utf-8', (_, content) => {
        const score = content
            .split(split)
            .reduce((res, curr) => {
                const [enemy, you] = curr.split(' ')

                const yourOutcome = Object.values(scores).find(score => score.char.includes(you))
                const yourTool = Object.values(moves).find(tool => {
                    if (yourOutcome.score === 6) return tool.kills.includes(enemy)
                    if (yourOutcome.score === 3) return tool.chars.includes(enemy)
                    return tool.dies.includes(enemy)
                })

                if (yourOutcome.score === 6) return res + yourTool.score + scores.win.score
                if (yourOutcome.score === 3) return res + yourTool.score + scores.draw.score
                return res + yourTool.score + scores.lose.score
            }, 0)

        console.log('Part two: ', score)
    })
}


part_one()
part_two()