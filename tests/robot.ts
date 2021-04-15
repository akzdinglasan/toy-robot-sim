import Robot from '../src/robot'
import { Facing } from '../src/robot'
import { expect } from 'chai'

const robot = new Robot()

describe('Robot', () => {
    describe('PLACE',() => {
        it('robot should be placed on the given position', () => {
            robot.doCommand('PLACE 0,0,NORTH')

            expect(robot.position.x).to.equal(0)
            expect(robot.position.y).to.equal(0)
            expect(robot.position.facing).to.equal(Facing.NORTH)
        })
    })
    describe('LEFT', () => {
        it('robot should face left of its current facing', () => {
            robot.doCommand('LEFT')

            expect(robot.position.facing).to.equal(Facing.WEST)
        })
    })
    describe('RIGHT', () => {
        it('robot should face right of its current facing', () => {
            robot.doCommand('RIGHT')

            expect(robot.position.facing).to.equal(Facing.NORTH)
        })
    })
    describe('MOVE', () => {
        it('robot should move 1 unit towards its facing', () => {
            robot.doCommand('MOVE')

            expect(robot.position.y).to.equal(1)
        })
    })
    describe('INVALID PLACE', () => {
        it('robot should not move if given invalid coordinates', () => {
            robot.doCommand('PLACE 5,5,asdf')

            expect(robot.position.x).to.equal(0)
            expect(robot.position.y).to.equal(1)
            expect(robot.position.facing).to.equal(Facing.NORTH)
        })
    })
    describe('INVALID MOVE', () => {
        it('robot should not move if its already on the edge of its axis', () => {
            robot.doCommand('PLACE 0,0,WEST')
            robot.doCommand('MOVE')

            expect(robot.position.x).to.equal(0)
            expect(robot.position.y).to.equal(0)
            expect(robot.position.facing).to.equal(Facing.WEST)
        })
    })
    describe('INVALID COMMAND', () => {
        it('robot should not move if its given an invalid command', () => {
            robot.doCommand('acbdefg')

            expect(robot.position.x).to.equal(0)
            expect(robot.position.y).to.equal(0)
            expect(robot.position.facing).to.equal(Facing.WEST)
        })
    })
})