import { _decorator, Component, Node } from 'cc';
import UIManager, { ViewName } from '../manager/UIManager';
import { BlackAniManager } from '../manager/BlackAniManager';
const { ccclass, property } = _decorator;

@ccclass('HomeView')
export class HomeView extends Component {

    start() {
    }
    public openGameView() {
        // UIManager.instance.closeView(ViewName.Home)
        // UIManager.instance.addView(ViewName.Game)
        BlackAniManager.instance.playAni()
        // console.log("game");
    }

    update(deltaTime: number) {

    }
}


