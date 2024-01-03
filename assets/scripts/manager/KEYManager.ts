/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2024-01-02 20:01:57
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-02 20:33:12
 * @FilePath: \SaveTheAliens\assets\scripts\manager\KEYManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KEYManager')
export class KEYManager extends Component {
    KeyNode: Node = null
    max=3
    cur=0
    init(keyNode: Node) {
        this.KeyNode = keyNode
    }
    private static _instance: KEYManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new KEYManager();
        // this._instance.init();
        return this._instance;
    }
    getKey(){
        return this.cur
    }
    addKey(){
        if(this.cur>=this.max) return
        this.cur++
        this.reFresh();
    }
    reFresh(){
        this.KeyNode.getChildByName("Label").getComponent(Label).string=this.cur.toString()+'/'+this.max.toString()
    }

    start() {

    }
    reStart(){
        this.cur=0
    }
    update(deltaTime: number) {

    }
}


