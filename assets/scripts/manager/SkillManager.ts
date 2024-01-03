/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-30 13:33:24
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-03 01:17:51
 * @FilePath: \SaveTheAliens\assets\scripts\manager\SkillManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-30 13:33:24
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-01 12:04:32
 * @FilePath: \SaveTheAliens\assets\scripts\manager\SkillManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
export enum SKILL {
    Q = 0,
    W = 1,
    E = 2,
    R = 3
}
@ccclass('SkillManager')
export class SkillManager {
    skillArray = [0, 0, 0, 0]
    private SkillNode: Node = null
    init(skillNode: Node) {
        this.SkillNode = skillNode
        console.log(this.SkillNode);
        console.log('----------------');
    }
    private static _instance: SkillManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new SkillManager();
        // this._instance.init();
        return this._instance;
    }
    reStart() {
        this.skillArray = [0, 0, 0, 0]
        this.refresh()
    }
    addSkill(Skill: SKILL) {
        this.skillArray[Skill] += 1
        this.refresh()
    }
    refresh() {
        console.log(this.SkillNode);
        this.SkillNode.getChildByName("SkillQ").getChildByName("Times").getComponent(Label).string = this.skillArray[SKILL.Q].toString()
        this.SkillNode.getChildByName("SkillR").getChildByName("Times").getComponent(Label).string = this.skillArray[SKILL.R].toString()
    }
    useSkill(Skill: SKILL) {
        if (this.skillArray[Skill] > 0) {
            this.skillArray[Skill] -= 1
            this.refresh()
            return true
        }
        return false
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


