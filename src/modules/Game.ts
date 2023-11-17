import Food from "./Food";
import Panel from "./Panel";
import Snake from "./Snake";
import MaskLayer from "./MaskLayer";
import Direction from "../enum/Direction";
import GameStatus from "../enum/GameStatus";

export default class Game {
    private _food: Food
    private _panel: Panel
    private _snake: Snake
    private _mask_layer: MaskLayer
    private _direction: Direction
    private _game_status: GameStatus
    private _level_up_list: number[]
    private _speed_list: number[]
    private _vert_dir: Direction[]
    private _horiz_dir: Direction[]
    private _range_width: number
    private _range_heigth: number

    constructor() {
        this._direction = Direction.Unknown
        this._game_status = GameStatus.End
        this._level_up_list = [5, 10, 15, 25, 35, 45, 60, 75, 90, 110]
        this._speed_list = [300, 275, 250, 235, 220, 205, 190, 180, 170, 160, 150]
        this._vert_dir = [Direction.Up, Direction.Down]
        this._horiz_dir = [Direction.Left, Direction.Right]
        this._range_width = <number>document.querySelector('.range')?.clientWidth
        this._range_heigth = <number>document.querySelector('.range')?.clientHeight
        this._food = new Food()
        this._panel = new Panel()
        this._snake = new Snake()
        this._mask_layer = new MaskLayer()
        window.addEventListener('keydown', this.throttle(this.keyDonwHandler));
    }
    // 在限定时间内蛇头只能发生一次变化（节流），防止出现通过短时间内多次转动蛇头完成掉头或鬼畜
    throttle(fn: (e: KeyboardEvent) => void) {
        let lastTime = 0
        return () => {
            const nowTime = Date.now()
            if (nowTime - lastTime > this.curSpeed()) {
                fn.call(this, <KeyboardEvent>window.event)
                lastTime = nowTime
            }
        }
    }
    keyDonwHandler(e: KeyboardEvent) {
        if (this.game_status === GameStatus.Play) {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    if (this.tureAroundCheck(this._direction, this._vert_dir)) {
                        this._snake.redirectSnakeHead(e.code)
                        this._direction = Direction.Up
                    }
                    break
                case 'ArrowDown':
                case 'KeyS':
                    if (this.tureAroundCheck(this._direction, this._vert_dir)) {
                        this._snake.redirectSnakeHead(e.code)
                        this._direction = Direction.Down
                    }
                    break
                case 'ArrowLeft':
                case 'KeyA':
                    if (this.tureAroundCheck(this._direction, this._horiz_dir)) {
                        this._snake.redirectSnakeHead(e.code)
                        this._direction = Direction.Left
                    }
                    break
                case 'ArrowRight':
                case 'KeyD':
                    if (this.tureAroundCheck(this._direction, this._horiz_dir)) {
                        this._snake.redirectSnakeHead(e.code)
                        this._direction = Direction.Right
                    }
                    break
                case 'Space':
                    this.game_status = GameStatus.Pause
                    this._mask_layer.showMaskLayer()
                    this._mask_layer.showCont()
                    this._mask_layer.showRe()
                    break
            }
        } else if (this.game_status === GameStatus.Pause) {
            switch (e.code) {
                case 'Space':
                    this.game_status = GameStatus.Play
                    this._mask_layer.hideMaskLayer()
                    break
                case 'KeyR':
                    this.reset()
                    this.mask_layer.hideMaskLayer()
            }
        }
    }
    reset() {
        this._food.changePosn()
        this._panel.reset()
        this._snake.reset()
        this.game_status = GameStatus.Play
        this._direction = Direction.Unknown
    }
    run() {
        if (this.game_status === GameStatus.Play) {
            if (this.hitWallCheck() || this.hitBodyCheck()) {
                this.game_status = GameStatus.End
                this._direction = Direction.Unknown
                this._mask_layer.showMaskLayer()
                this._mask_layer.showRe()
            }
            this._snake.moveBody()
            switch (this._direction) {
                case Direction.Up:
                    this._snake.moveUp()
                    break
                case Direction.Down:
                    this._snake.moveDown()
                    break
                case Direction.Left:
                    this._snake.moveLeft()
                    break
                case Direction.Right:
                    this._snake.moveRight()
                    break
            }
            this.eatFoodCheck() && this.eatFoodHandler()
        }
        setTimeout(() => {
            this.run()
        }, this.curSpeed());
    }
    curSpeed() {
        return this._speed_list[this._snake.speed < this._speed_list.length ? this._snake.speed : this._speed_list.length - 1]
    }
    // 当身体长度为0时可以自由转向；当身体长度大于等于1时不能进行掉头操作
    // 当前方向为垂直/水平方向时，下一个方向为水平/垂直方向才生效
    tureAroundCheck(dir: Direction, avail_dir: Direction[]) {
        let available = true
        if (!this._snake.snake_body_elms.length) return available
        if (this._direction !== Direction.Unknown && avail_dir.includes(dir)) available = false
        return available
    }
    // 墙体碰撞检测
    hitWallCheck() {
        const { x, y, snake_unit_width, snake_unit_height } = this._snake
        let hitFlag = false
        hitFlag = this._direction === Direction.Up && y <= 0
            || this._direction === Direction.Down && y >= this._range_heigth - snake_unit_height
            || this._direction === Direction.Left && x <= 0
            || this._direction === Direction.Right && x >= this._range_width - snake_unit_width
        return hitFlag
    }
    // 身体碰撞检测
    hitBodyCheck() {
        let hitFlag = false
        // 身体长度大于等于4时才会发生身体碰撞
        if (this._snake.snake_body_elms.length >= 4) {
            for (let i = 0; i < this._snake.snake_body_elms.length; i++) {
                const body_elm = this._snake.snake_body_elms[i]
                if (this._snake.x === body_elm.offsetLeft && this._snake.y === body_elm.offsetTop) {
                    hitFlag = true
                    break
                }
            }
        }
        return hitFlag
    }
    eatFoodCheck() {
        return this._snake.x === this._food.x && this._snake.y === this._food.y
    }
    // 检测新生成的食物是否与蛇头蛇身重叠
    foodPosnCheck() {
        let headOverlap = false
        let bodyOverlap = false
        if (this._food.x === this._snake.x && this._food.y === this._snake.y) headOverlap = true
        for (let i = 0; i < this._snake.snake_body_elms.length; i++) {
            const body_elm = this._snake.snake_body_elms[i]
            if (this._food.x === body_elm.offsetLeft && this._food.y === body_elm.offsetTop) {
                bodyOverlap = true
            }
        }
        return headOverlap || bodyOverlap
    }
    eatFoodHandler() {
        this._snake.addBody()
        this._panel.addScore()
        this._food.changePosn()
        // 当发生重叠时进入循环，直到生成的食物不发生重叠
        while (this.foodPosnCheck()) {
            this._food.changePosn()
        }
        this.levelUpHandler()
    }
    levelUpHandler() {
        if (this._level_up_list.includes(this._panel.score)) {
            this._panel.levelUp()
            this._snake.speedUp()
        }
    }

    get game_status(): GameStatus { return this._game_status }
    get mask_layer(): MaskLayer { return this._mask_layer }

    set game_status(status: GameStatus) { this._game_status = status }
}