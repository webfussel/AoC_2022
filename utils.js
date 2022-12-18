import {readFile as readFileFS} from "fs";

export const split = '\r\n'
export const readFile = (path) => new Promise((resolve, reject) => {
        readFileFS(path, 'utf-8', (error, content) => {
            if (error) {
                reject(error)
            } else {
                resolve(content)
            }
        })
    })

export const printResults = (part_one, part_two) => {
    part_one().then(partOne => {
        console.log('Part 1: ', partOne)
        part_two().then(partTwo => {
            console.log('Part 2: ', partTwo)
        })
    })
}