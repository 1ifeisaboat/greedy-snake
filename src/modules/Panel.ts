export default class Panel {
    private _scoreElm: HTMLElement
    private _levelElm: HTMLElement
    private _score!: number
    private _level: number

    constructor() {
        this._scoreElm = <HTMLElement>document.querySelector('#score')
        this._levelElm = <HTMLElement>document.querySelector('#level')
        this.score = 0
        this._level = 0
    }

    reset() {
        this._scoreElm.innerHTML = '0'
        this._levelElm.innerHTML = '0'
        this.score = 0
        this._level = 0
    }
    addScore() {
        this._scoreElm.innerHTML = ++this.score + ''
    }
    levelUp() {
        if (this._level < 10) this._levelElm.innerHTML = ++this._level + ''
    }

    get score(): number { return this._score }

    set score(score: number) { this._score = score }
}
