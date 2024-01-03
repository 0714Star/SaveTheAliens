/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-29 01:03:30
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2023-12-29 01:05:32
 * @FilePath: \SaveTheAliens\assets\scripts\manager\MaskManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MaskManager')
export class MaskManager extends Component {
    private MaskNode: Node = null
    init(maskNode: Node) {
        this.MaskNode = maskNode
    }
    private static _instance: MaskManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new MaskManager();
        // this._instance.init();
        return this._instance;
    }
    OpenMask() {
        this.MaskNode.active = true;
    }
    CloseMask() {
        this.MaskNode.active = false;
    }

    update(deltaTime: number) {

    }
}


