/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-29 01:37:43
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-03 02:01:22
 * @FilePath: \SaveTheAliens\assets\scripts\manager\BlackAniManager.ts
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Animation, Component, Node } from 'cc';
import UIManager, { ViewName } from './UIManager';
import { MaskManager } from './MaskManager';
import { TipsManager } from './TipsManager';
const { ccclass, property } = _decorator;

@ccclass('BlackAniManager')
export class BlackAniManager {
    private BlackAniNode: Node = null
    init(blackAniNode: Node) {
        this.BlackAniNode = blackAniNode
        let anim: Animation = blackAniNode.getComponent(Animation);
        //第三个参数看情况来加，看有没有用到当前对象中的值
        // anim.on(Animation.EventType.FINISHED, this.finished, this)
    }
    finished() {

        this.showGameView()
    }
    private static _instance: BlackAniManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new BlackAniManager();
        // this._instance.init();
        return this._instance;
    }
    playAni() {
        // this.showGameView();
        console.log('播放');
        MaskManager.instance.OpenMask();
        this.BlackAniNode.getComponent(Animation).play()
    }
    showGameView() {
        UIManager.instance.addView(ViewName.Game)
        TipsManager.instance.tipsShow()
        MaskManager.instance.CloseMask();
    }

}


