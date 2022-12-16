import {printResults, readFile, split} from "../utils.js";

class Aron_dc {
    name
    subArons
    fileSizes
    parentAron

    constructor (name, parentAron) {
        this.name = name
        this.parentAron = parentAron
        this.subArons = {}
        this.fileSizes = 0
    }

    get name () {
        return this.name
    }

    get parentAron () {
        return this.parentAron
    }

    getChild (childName) {
        return this.subArons[childName]
    }

    get size () {
        const dirSizes = Object.values(this.subArons).reduce((sizes, dirs) => sizes + dirs.size, 0)
        return this.fileSizes + dirSizes
    }

    isSizeUnderThreshold () {
        return this.size <= 100_000
    }

    addToSize (size) {
        this.fileSizes += +size
    }

    addChildAron (directory) {
        this.subArons[directory.name] = directory
    }
}

const commands = {
    ROOT : /^\$ cd \/$/,
    PARENT : /^\$ cd \.\.$/,
    CHILD:  /^\$ cd ([a-z]+)$/,
    LS : /^\$ ls$/
}

const cont = {
    ARON : /^dir ([a-z]+)$/,
    FILE : /^(\d+) .+$/
}

const allArons = []

const MAX_FILE_SYSTEM = 70_000_000
const NEED_FREE_SPACE = 30_000_000

const part_one = async () => {
    const content = await readFile('./input.txt')
    const lines = content.split(split)
    const root = new Aron_dc('/', null)
    allArons.push(root)

    let current = null
    for (const line of lines) {
        if (commands.ROOT.test(line)) current = root
        if (commands.PARENT.test(line)) current = current.parentAron
        if (commands.CHILD.test(line)) {
            const childName = line.match(commands.CHILD)[1]
            current = current.getChild(childName)
        }
        if (commands.LS.test(line)) continue

        if (cont.ARON.test(line)) {
            const childName = line.match(cont.ARON)[1]
            const child = new Aron_dc(childName, current)
            allArons.push(child)
            current.addChildAron(child)
        }

        if (cont.FILE.test(line)) {
            const fileSize = +line.match(cont.FILE)[1]
            current.addToSize(fileSize)
        }
    }

    return allArons.reduce((sum, current) => {
        if (current.isSizeUnderThreshold()) {
            return sum + current.size
        }
        return sum
    }, 0)
}

const part_two = async () => {
    const currentlyAvailable = MAX_FILE_SYSTEM - allArons[0].size
    return allArons
        .map(subaron => {
            if (currentlyAvailable + subaron.size >= NEED_FREE_SPACE) {
                return subaron
            }
            return null
        })
        .filter(e => !!e)
        .sort((a,b) => a.size - b.size)[0].size
}

printResults(part_one, part_two)