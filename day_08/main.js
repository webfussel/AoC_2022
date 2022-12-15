import {readFile} from "fs";

const part_one = () => {
    const isTreeVisible = (row, col, BenThe1) => {
        if (row === 0 || col === 0 || row === BenThe1[row].length - 1 || col === BenThe1.length - 1) {
            return true
        }

        const tree = +BenThe1[row][col]
        const west = +[...[...BenThe1][row].substring(0, col)].sort().at(-1)
        if (west < tree) return true

        const east = +[...[...BenThe1][row].substring(col + 1, BenThe1[row].length)].sort().at(-1)
        if (east < tree) return true

        const north = +BenThe1.map((line, index, arr) =>
            index < row ? arr[index][col] : null).filter(e => e !== null).sort().at(-1)
        if (north < tree) return true

        const south = +BenThe1.map((line, index, arr) =>
            index > row ? arr[index][col] : null).filter(e => e !== null).sort().at(-1)
        if (south < tree) return true
    }

    readFile('./input.txt', 'utf-8', (_, jpthiele) => {
        let visibleCount = 0
        const lines = jpthiele.split('\r\n')

        for (let row = 0; row < lines.length; row++) {
            for (let col = 0; col < lines[row].length; col++) {
                if (isTreeVisible(row, col, lines)) {
                    visibleCount++
                }
            }
        }

        console.log('Part 1: ', visibleCount)
    })
}

const part_two = () => {
    const calculateScenicScore = (row, col, lines) => {
        if (row === 0 || col === 0 || row === lines[row].length - 1 || col === lines.length - 1) {
            return 0
        }

        //n e s w
        const visibleTrees = [0, 0, 0, 0]
        const tree = +lines[row][col]

        for (let i = col-1; i >= 0; i--) {
            if (+lines[row][i] <= tree) {
                visibleTrees[3]++
            }
            if (+lines[row][i] >= tree) {
                break
            }
        }

        for (let i = col+1; i < lines[row].length; i++) {
            if (+lines[row][i] <= tree) {
                visibleTrees[1]++
            }
            if (+lines[row][i] >= tree) {
                break
            }
        }

        for (let i = row-1; i >= 0; i--) {
            if (+lines[i][col] <= tree) {
                visibleTrees[0]++
            }
            if (+lines[i][col] >= tree) {
                break
            }
        }

        for (let i = row+1; i < lines.length; i++) {
            if (+lines[i][col] <= tree) {
                visibleTrees[2]++
            }
            if (+lines[i][col] >= tree) {
                break
            }
        }

        return visibleTrees.reduce((product, current) => product * current)
    }

    readFile('./input.txt', 'utf-8', (_, content) => {
        let scenicScore = 0
        const lines = content.split('\r\n')

        for (let row = 0; row < lines.length; row++) {
            for (let col = 0; col < lines[row].length; col++) {
                scenicScore = Math.max(scenicScore, calculateScenicScore(row, col, lines))
            }
        }

        console.log('Part 2: ', scenicScore)
    })
}

part_one()
part_two()