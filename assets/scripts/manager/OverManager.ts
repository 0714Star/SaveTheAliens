/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2024-01-01 13:28:08
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-03 00:37:35
 * @FilePath: \SaveTheAliens\assets\scripts\manager\OverManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, easing, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OverManager')
export class OverManager {
    private static _instance: OverManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new OverManager();
        // this._instance.init();
        return this._instance;
    }
    setOver(isOver: boolean) {
        this.isOver = isOver
    }
    isOver = false
    getIsOver() {
        return this.isOver
    }
    OverNode: Node = null
    init(overNode: Node) {
        this.OverNode = overNode
    }
    reStart() {
        this.isOver = false;
    }
    success() {
        this.isOver = true
        let node = this.OverNode.getChildByName("successNode")

        // 创建 Tween 动画
        // 创建 Tween 动画
        const moveDownAction1 = tween(node)
            .by(1, { position: new Vec3(0, -640, 0) }, { easing: easing.cubicOut })
            .call(() => {
                console.log('移动完成');
                // 在移动完成后可以执行其他操作
            })
            .start();
    }
    fail() {
        this.isOver = true
        let node = this.OverNode.getChildByName("failureNode")
        // 创建 Tween 动画
        const moveDownAction = tween(node)
            .by(1, { position: new Vec3(0, -640, 0) }, { easing: easing.cubicOut })
            .call(() => {
                console.log('移动完成');
                // 在移动完成后可以执行其他操作
            })
            .start();
            globalThis.target.emit('enemyOverAni')
    }
    closeSuc() {
        let node = this.OverNode.getChildByName("successNode")

        // 创建 Tween 动画
        // 创建 Tween 动画
        const moveDownAction = tween(node)
            .by(1, { position: new Vec3(0, 640, 0) }, { easing: easing.cubicOut })
            .call(() => {
                console.log('移动完成');
                // 在移动完成后可以执行其他操作
            })
            .start();
    }
    closeFail() {
        let node = this.OverNode.getChildByName("failureNode")
        // 创建 Tween 动画
        const moveDownAction = tween(node)
            .by(1, { position: new Vec3(0, 640, 0) }, { easing: easing.cubicOut })
            .call(() => {
                console.log('移动完成');
                // 在移动完成后可以执行其他操作
            })
            .start();
    }
}



