export const enum Facing {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

export interface Position {
    x: number;
    y: number;
    facing: Facing
}

export default class Robot {
    private facing: string[] = ['NORTH', 'EAST', 'SOUTH', 'WEST']
    private firstCmd: boolean = false
    public position: Position = { x: 0, y: 0 , facing: Facing.NORTH }

    public doCommand(command: string): void {
        switch(command.toUpperCase().split(' ')[0]) {
            case 'REPORT':
                if(!this.firstCmd) process.stdout.write(`First command should be PLACE \n`)
                else process.stdout.write(`Output: ${this.position.x}, ${this.position.y}, ${this.facing[this.position.facing]} \n`)
                break;
            case 'PLACE':
                let placeCmd: string[] = command.split(' ')
                if (placeCmd.length < 2) {
                    process.stdout.write(`Invalid command. \n`)
                    break
                }
                let coordinates: string[] = placeCmd[1].split(',')
                if(this.isValidPosition(parseInt(coordinates[0]), parseInt(coordinates[1])) && this.facing.indexOf(coordinates[2].toUpperCase()) > -1) {
                    this.position.x = parseInt(coordinates[0])
                    this.position.y = parseInt(coordinates[1])
                    this.position.facing = this.facing.indexOf(coordinates[2].toUpperCase())
                    this.firstCmd = true
                    process.stdout.write(`PLACE command has been excuted. \n`)
                } else process.stdout.write(`Invalid command. \n`)
                break;
            case 'LEFT':
                if(!this.firstCmd) process.stdout.write(`First command should be PLACE \n`)
                else {
                    this.position.facing = this.position.facing === Facing.NORTH ? Facing.WEST : --this.position.facing
                    process.stdout.write(`Command LEFT has been executed. \n`)
                }
                break;
            case 'RIGHT':
                if(!this.firstCmd) process.stdout.write(`First command should be PLACE \n`)
                else {
                    this.position.facing = this.position.facing === Facing.WEST ? Facing.NORTH : ++this.position.facing
                    process.stdout.write(`Command RIGHT has been executed. \n`)
                }
                break;
            case 'MOVE':
                if(!this.firstCmd) process.stdout.write(`First command should be PLACE \n`)
                else {
                    let currentPosition: Position = {...this.position}
                    switch(this.position.facing){
                        case Facing.NORTH:
                        case Facing.SOUTH:
                            if (currentPosition.facing === Facing.NORTH) {
                                if(this.isValidPosition(this.position.x, ++currentPosition.y)) ++this.position.y
                                else process.stdout.write(`Invalid command. \n`)
                            }
                            else {
                                if(this.isValidPosition(this.position.x, --currentPosition.y)) --this.position.y
                                else process.stdout.write(`Invalid command. \n`)
                            }
                        break;
                        case Facing.EAST:
                        case Facing.WEST:
                            if (currentPosition.facing === Facing.EAST) {
                                if(this.isValidPosition(++currentPosition.x, this.position.y)) ++this.position.x
                                else process.stdout.write(`Invalid command. \n`)
                            }
                            else {
                                if(this.isValidPosition(--currentPosition.x, this.position.y)) --this.position.x
                                else process.stdout.write(`Invalid command. \n`)
                            }
                        break;
                    }
                }
                break;
            default: process.stdout.write(`Invalid command. \n`)
        }
    }

    private isValidPosition(x: number, y: number): boolean {
        const posX = x >= 0 && x < 5
        const posY = y >= 0 && y < 5

        return posX && posY
    }
}