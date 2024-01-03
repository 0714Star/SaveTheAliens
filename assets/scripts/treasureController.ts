/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-30 12:39:48
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2023-12-30 13:25:34
 * @FilePath: \SaveTheAliens\assets\scripts\treasureController.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('treasureController')
export class treasureController extends Component {
    @property([Prefab])
    skills: Prefab[] = []
    blood = 100
    start() {

    }
    public hurt(damage: number) {
        this.blood -= damage
        this.node.getChildByName("bleed").setScale(this.blood / 100, 1, 1)
        if (this.blood <= 0) {
            this.boom()
        }
    }
    boom() {
        //随机生成skill
        let random = Math.floor(Math.random() * this.skills.length)
        let node: Node = instantiate(this.skills[random])

        node.parent = this.node.parent
        node.position = this.node.position
        this.node.destroy()

    }
    update(deltaTime: number) {

    }
}


