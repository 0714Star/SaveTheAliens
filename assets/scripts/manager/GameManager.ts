/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-29 15:11:43
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-02 19:42:06
 * @FilePath: \SaveTheAliens\assets\scripts\manager\GameManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager {
    private GameNode: Node = null
    init(gameNode: Node) {
        this.GameNode = gameNode
    }
    getBorn(idx) {
        let mapNode = this.GameNode.getChildByName("MapNode")
        let children = mapNode.children
        let node = children[idx - 1].getChildByName("born_Pos")
        return node.position

        // return new Vec3(0, 0, 0)
    }
    private static _instance: GameManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new GameManager();
        // this._instance.init();
        return this._instance;
    }
    update(idx) {
        //     if (idx > 3 || idx < 0) { 
        //         console.log(idx, "=idx") 
        //         return 
        // }
        console.log(idx);

        let mapNode = this.GameNode.getChildByName("MapNode")
        let children = mapNode.children
        // console.log(children);
        // console.log();

        for (let i = 1; i <= children.length; i++) {
            console.log(idx);

            if (i == idx) {
                children[i - 1].active = true
                let treasures = children[i - 1].getChildByName("treasureNode").children
                //随机
                let random = Math.floor(Math.random() * treasures.length)
                treasures[random].active = false;

            } else {
                children[i - 1].active = false
            }
        }
    }
}


