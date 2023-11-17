export default class Food {
    private _elm!: HTMLElement
    private _x!: number
    private _y!: number
    private _range_width!: number
    private _range_height!: number
    private _food_width!: number
    private _food_height!: number

    constructor() {
        this._elm = document.createElement('div')
        this._elm.id = 'food'
        for (let i = 0; i < 4; i++) {
            this._elm.appendChild(document.createElement('div'))
        }
        document.querySelector('.range')?.appendChild(this._elm)
        this._food_width = <number>document.querySelector('#food')?.clientWidth
        this._food_height = <number>document.querySelector('#food')?.clientHeight
        this._range_width = <number>document.querySelector('.range')?.clientWidth - this._food_width
        this._range_height = <number>document.querySelector('.range')?.clientHeight - this._food_height
        this.changePosn()
    }

    changePosn() {
        this.x = Math.round(Math.random() * (this._range_width / this._food_width)) * this._food_width
        this.y = Math.round(Math.random() * (this._range_height / this._food_height)) * this._food_height
        this._elm.style.left = this.x + 'px'
        this._elm.style.top = this.y + 'px'
    }

    get x(): number { return this._x }
    get y(): number { return this._y }

    set x(x: number) { this._x = x }
    set y(y: number) { this._y = y }
}