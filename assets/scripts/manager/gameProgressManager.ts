/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-29 14:52:56
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-02 20:41:55
 * @FilePath: \SaveTheAliens\assets\scripts\manager\gameProgressManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { KEYManager } from './KEYManager';
const { ccclass, property } = _decorator;

@ccclass('gameProgressManager')
export class gameProgressManager {
    // private GameNode: Node = null
    init() {
    }
    private static _instance: gameProgressManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new gameProgressManager();
        this._instance.init();
        return this._instance;
    }
    cur_idx = 1
    enter() {
        if (this.cur_idx === 3) { this.cur_idx = 0; return; }
        // if (KEYManager.instance.getKey() == this.cur_idx) {
            this.cur_idx++
            GameManager.instance.update(this.cur_idx)
        // }
    }
    isGo(){
        return KEYManager.instance.getKey() == this.cur_idx
    }
    getPos() {
        return GameManager.instance.getBorn(this.cur_idx)
        // return new Vec3(0, 0, 0)
    }
    reStart() {
        // GameManager.instance.reStart()
        this.cur_idx = 1
    }
    close() {

    }
    update(deltaTime: number) {

    }
}
