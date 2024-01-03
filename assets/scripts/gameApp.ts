/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-28 12:27:56
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-02 01:47:57
 * @FilePath: \SaveTheAliens\assets\scripts\gameApp.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, AudioSource, Component, EPhysics2DDrawFlags, Node, PhysicsSystem2D, resources, sys } from 'cc';
import { AudioManager } from './manager/AudioManager';
import UIManager, { ViewName } from './manager/UIManager';
import { MaskManager } from './manager/MaskManager';
import { BlackAniManager } from './manager/BlackAniManager';
import { TipsManager } from './manager/TipsManager';
const { ccclass, property } = _decorator;

@ccclass('gameApp')
export class gameApp extends Component {

    @property({ type: Boolean, displayName: "是否清除本地数据" })
    isClear: boolean = false;
    @property(Node)
    UINode: Node = null;
    @property(Node)
    MaskNode: Node = null;
    @property(Node)
    BlackAniNode: Node = null
    @property(Node)
    TipsNode: Node = null
    //初始化音乐系统
    protected onLoad(): void {

        UIManager.instance.init(this.UINode);
        if (this.isClear) {
            sys.localStorage.clear();
            //console.log("清除数据")
        }
        // resources.load('prefabs/HomeView')
        // resources.load('prefabs/GameView')

        console.log("GameApp,onload")
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;


    }
    start() {
        MaskManager.instance.init(this.MaskNode);
        BlackAniManager.instance.init(this.BlackAniNode)
        TipsManager.instance.init(this.TipsNode)
        console.log('初始化结束');
        //载入音乐播放器
        // let audioMusic = this.node.getComponents(AudioSource)[0];
        // let audioEffect = this.node.getComponents(AudioSource)[1];
        // AudioManager.Instance.init(audioMusic, audioEffect);
        // LevelManager.instance.init();
        console.log('增加主页面');

        //三秒后
        // setTimeout(() => {
        //     UIManager.instance.addView(ViewName.Home)
        // }, 5000)
        UIManager.instance.addView(ViewName.Home)
    }

    update(deltaTime: number) {

    }
}


