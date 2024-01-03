/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2024-01-01 13:05:25
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-02 19:53:09
 * @FilePath: \SaveTheAliens\assets\scripts\manager\LoveManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node } from 'cc';
import { OverManager } from './OverManager';
const { ccclass, property } = _decorator;

@ccclass('LoveManager')
export class LoveManager {
    private curLove = 1
    start() {

    }
    private static _instance: LoveManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new LoveManager();
        // this._instance.init();
        return this._instance;
    }
    LoveNode: Node = null
    init(loveNode: Node) {
        this.LoveNode = loveNode
    }
    addLove() {
        if (this.curLove == 2) { return false }
        console.log('加血');
        this.LoveNode.children[this.curLove].active = true
        this.curLove++
        return true
    }
    reStart(){
        this.curLove = 1
    }
    subLove() {
        if (this.curLove == 0) { return false }
        this.curLove--
        this.LoveNode.children[this.curLove].active = false

        if (this.curLove == 0) {
            // alert('失败')
            OverManager.instance.fail()
            return false
        }
        return true
    }
    update(deltaTime: number) {

    }
}


