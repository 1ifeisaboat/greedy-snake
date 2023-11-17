export default class MaskLayer {
    private _mask_layer: HTMLElement
    private _start: HTMLElement
    private _continue: HTMLElement
    private _restart: HTMLElement

    constructor() {
        this._mask_layer = <HTMLElement>document.querySelector('.maskLayer')
        this._start = <HTMLElement>document.querySelector('.maskLayer>#start')
        this._continue = <HTMLElement>document.querySelector('.maskLayer>#continue')
        this._restart = <HTMLElement>document.querySelector('.maskLayer>#restart')
    }

    showMaskLayer() {
        this._mask_layer.style.visibility = 'visible'
    }
    hideMaskLayer() {
        this._mask_layer.style.visibility = 'hidden'
        this.hideStart()
        this.hideCont()
        this.hideRe()
    }
    showStart() { this._start.style.display = 'block' }
    hideStart() { this._start.style.display = 'none' }
    showCont() { this._continue.style.display = 'block' }
    hideCont() { this._continue.style.display = 'none' }
    showRe() { this._restart.style.display = 'block' }
    hideRe() { this._restart.style.display = 'none' }
}