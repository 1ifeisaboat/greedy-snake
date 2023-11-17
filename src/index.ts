import './style/index.less'
import Game from './modules/Game'
import GameStatus from './enum/GameStatus'
const game = new Game()

document.querySelector('#start')?.addEventListener('click', () => {
    game.run()
    game.game_status = GameStatus.Play
    game.mask_layer.hideMaskLayer()
})

document.querySelector('#continue')?.addEventListener('click', () => {
    game.game_status = GameStatus.Play
    game.mask_layer.hideMaskLayer()
})

document.querySelector('#restart')?.addEventListener('click', () => {
    game.reset()
    game.mask_layer.hideMaskLayer()
})

