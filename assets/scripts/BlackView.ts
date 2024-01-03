import { _decorator, Component, Node } from 'cc';
import { BlackAniManager } from './manager/BlackAniManager';
const { ccclass, property } = _decorator;

@ccclass('BlackView')
export class BlackView extends Component {
    start() {

    }
    public showGameView() {
        console.log('播放');

        BlackAniManager.instance.showGameView()
    }
    update(deltaTime: number) {

    }
}


