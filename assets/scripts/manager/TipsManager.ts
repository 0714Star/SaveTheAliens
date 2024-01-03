/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-29 02:23:40
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2023-12-29 02:38:42
 * @FilePath: \SaveTheAliens\assets\scripts\manager\TipsManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, input, Input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TipsManager')
export class TipsManager {
    private TipsNode: Node = null
    init(tipsNode: Node) {
        this.TipsNode = tipsNode
    }
    private static _instance: TipsManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new TipsManager();
        // this._instance.init();
        return this._instance;
    }

    tipsShow() {
        this.TipsNode.active = true
        // 添加键盘输入事件监听
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    onKeyDown() {
        this.tipsClose();
    }
    tipsClose() {
        this.TipsNode.active = false
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    }
}


