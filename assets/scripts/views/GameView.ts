/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-29 15:09:26
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-03 01:38:33
 * @FilePath: \SaveTheAliens\assets\scripts\views\GameView.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../manager/GameManager';
import { SkillManager } from '../manager/SkillManager';
import { LoveManager } from '../manager/LoveManager';
import { OverManager } from '../manager/OverManager';
import UIManager, { ViewName } from '../manager/UIManager';
import { gameProgressManager } from '../manager/gameProgressManager';
import { KEYManager } from '../manager/KEYManager';
import { TipsManager } from '../manager/TipsManager';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property(Node)
    skillNode: Node = null
    @property(Node)
    loveNode: Node = null
    @property(Node)
    overNode: Node = null
    @property(Node)
    keyNode: Node = null
    start() {
        //三秒后
        // setTimeout(() => {
        //     OverManager.instance.success()
        // }, 10000)
    }
    protected onEnable(): void {
        GameManager.instance.init(this.node)
        this.skillNode = this.node.getChildByName("SkillNode")

        SkillManager.instance.init(this.skillNode)

        this.loveNode = this.node.getChildByName("LoveNode")
        LoveManager.instance.init(this.loveNode)

        this.overNode = this.node.getChildByName("OverNode")
        OverManager.instance.init(this.overNode)

        this.keyNode = this.node.getChildByName("KeyNode")
        KEYManager.instance.init(this.keyNode)
    }
    succ() {
        OverManager.instance.success()
    }
    fail() {
        OverManager.instance.fail()
    }
    reStart() {
        OverManager.instance.setOver(false)
        LoveManager.instance.reStart()
        gameProgressManager.instance.reStart()
        UIManager.instance.closeView(ViewName.Game)
        UIManager.instance.addView(ViewName.Game)
        KEYManager.instance.reStart()
        SkillManager.instance.reStart()
        TipsManager.instance.tipsClose()

    }
    Back() {
        OverManager.instance.setOver(false)
        gameProgressManager.instance.reStart()
        LoveManager.instance.reStart()
        UIManager.instance.closeView(ViewName.Game)
        KEYManager.instance.reStart()
        SkillManager.instance.reStart()
        TipsManager.instance.tipsClose()
    }


    update(deltaTime: number) {

    }
}


