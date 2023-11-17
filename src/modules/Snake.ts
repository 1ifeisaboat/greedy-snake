export default class Snake {
    private _snake_elm: HTMLElement
    private _snake_head_elm: HTMLElement
    private _snake_body_elms: HTMLElement[]
    private _snake_unit_width: number
    private _snake_unit_height: number
    private _x!: number
    private _y!: number
    private _speed!: number
    private _step: number
    private _init_left!: number
    private _init_top!: number

    constructor() {
        this._snake_elm = <HTMLElement>document.querySelector('#snake')
        this._snake_head_elm = <HTMLElement>document.querySelector('#snake>div')
        this._snake_body_elms = []
        const {
            offsetWidth,
            offsetHeight,
            offsetLeft,
            offsetTop
        } = this._snake_head_elm
        this._snake_unit_width = offsetWidth
        this._snake_unit_height = offsetHeight
        this.x = this._init_left = offsetLeft
        this.y = this._init_top = offsetTop
        this.speed = 0
        this._step = 20
    }

    reset() {
        this._snake_elm.innerHTML = ''
        this._snake_body_elms = []
        this._snake_head_elm = document.createElement('div')
        this.x = this._init_left
        this.y = this._init_top
        this._snake_head_elm.style.left = this.x + 'px'
        this._snake_head_elm.style.top = this.y + 'px'
        this._snake_elm.appendChild(this._snake_head_elm)
        this.speed = 0
    }
    addBody() {
        const body_part = document.createElement('div')
        body_part.className = 'body'
        if (this._snake_body_elms.length === 0) {
            body_part.style.left = this.x + 'px'
            body_part.style.top = this.y + 'px'
        } else {
            const { offsetLeft, offsetTop } = this._snake_body_elms[this._snake_body_elms.length - 1]
            body_part.style.left = offsetLeft + 'px'
            body_part.style.top = offsetTop + 'px'
        }

        this._snake_body_elms.push(body_part)
        this._snake_elm.insertAdjacentElement('beforeend', body_part)
    }
    redirectSnakeHead(code: string) {
        switch (code) {
            case 'ArrowUp':
            case 'KeyW':
                this._snake_head_elm.style.transform = 'rotate(0deg)'
                break
            case 'ArrowDown':
            case 'KeyS':
                this._snake_head_elm.style.transform = 'rotate(180deg)'
                break
            case 'ArrowLeft':
            case 'KeyA':
                this._snake_head_elm.style.transform = 'rotate(-90deg)'
                break
            case 'ArrowRight':
            case 'KeyD':
                this._snake_head_elm.style.transform = 'rotate(90deg)'
                break
        }
    }
    moveUp() {
        this.y -= this._step
        this._snake_head_elm.style.top = this.y + 'px'
    }
    moveDown() {
        this.y += this._step
        this._snake_head_elm.style.top = this.y + 'px'
    }
    moveLeft() {
        this.x -= this._step
        this._snake_head_elm.style.left = this.x + 'px'
    }
    moveRight() {
        this.x += this._step
        this._snake_head_elm.style.left = this.x + 'px'
    }
    moveBody() {
        const length = this._snake_body_elms.length
        if (length) {
            for (let i = length - 1; i >= 0; i--) {
                const prev = this._snake_body_elms[i - 1]
                const curr = this._snake_body_elms[i]
                if (i) {
                    curr.style.left = prev.offsetLeft + 'px'
                    curr.style.top = prev.offsetTop + 'px'
                } else {
                    curr.style.left = this.x + 'px'
                    curr.style.top = this.y + 'px'
                }
            }
        }
    }
    speedUp() {
        this.speed++
    }

    get x(): number { return this._x }
    get y(): number { return this._y }
    get speed(): number { return this._speed }
    get snake_unit_width(): number { return this._snake_unit_width }
    get snake_unit_height(): number { return this._snake_unit_height }
    get snake_body_elms(): HTMLElement[] { return this._snake_body_elms }

    set x(x: number) { this._x = x }
    set y(y: number) { this._y = y }
    set speed(speed: number) { this._speed = speed }
}