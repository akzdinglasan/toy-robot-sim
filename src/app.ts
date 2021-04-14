import * as readline from 'readline'
import Robot from './robot'

const robot = new Robot()


process.stdout.write('Start entering commands (PLACE, LEFT, RIGHT, MOVE, REPORT) \n')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

rl.on('line', (command: string) => {
    robot.doCommand(command)
})