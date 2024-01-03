/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-29 03:00:41
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-03 01:03:26
 * @FilePath: \SaveTheAliens\assets\scripts\playerContraller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, animation, Animation, AnimationClip, Collider, Collider2D, Color, Component, Contact2DType, EventKeyboard, ICollisionEvent, input, Input, IPhysics2DContact, ITriggerEvent, KeyCode, log, macro, Node, Sprite, Tween, Vec3 } from 'cc';
import { gameProgressManager } from './manager/gameProgressManager';
import { BulletGenerateManager, Dir } from './manager/BulletGenerateManager';
import { SKILL, SkillManager } from './manager/SkillManager';
import { LoveManager } from './manager/LoveManager';
import { OverManager } from './manager/OverManager';
import { KEYManager } from './manager/KEYManager';
const { ccclass, property } = _decorator;
const GroupNEXT = 1 << 1;
const GroupBULLET = 1 << 2;
const GroupTREASURE = 1 << 3;
const GroupSKILL = 1 << 4;
const GroupWIN = 1 << 6;
const GroupSIGHT = 1 << 7;
const GroupKEY = 1 << 8;
@ccclass('playerController')
export class playerController extends Component {

    private horizontal = 0
    private vertical = 0
    private speed = 5; // 移动速度
    private playerPosition: Vec3 = new Vec3(0, 0, 0);
    dir: Dir = Dir.DOWN
    @property(Animation)
    private playerAni: Animation = null


    @property([AnimationClip])
    private aniClips: AnimationClip[] = []
    @property(Node)
    bulletNode: Node = null

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        // 添加碰撞事件监听
        const collider = this.node.getComponent(Collider2D);
        // if (collider) {
        //     collider.on('onCollisionEnter', this.onCollisionEnter, this);
        //     collider.on('onCollisionExit', this.onCollisionExit, this);
        //     collider.on('onTriggerEnter', this.onTriggerEnter, this)
        // }
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
        console.log('监听碰撞');
    }

    setPos(vec3: Vec3) {
        this.node.position = vec3
        this.playerPosition = this.node.position
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log(otherCollider.node.name);
        // console.log('---------------------');

        // console.log('碰撞开始');
        // return;
        if (otherCollider.group == GroupNEXT && this.first) {

            if (!gameProgressManager.instance.isGo()) {

                return
            }
            gameProgressManager.instance.enter()
            this.setPos(gameProgressManager.instance.getPos())

            this.first = false;
            setTimeout(() => { this.first = true }, 1500);
        }
        if (otherCollider.group == GroupSKILL) {
            console.log('技能');
            //随机技能
            let skill = Math.floor(Math.random() * 4)
            if (skill == 0) {
                skill = SKILL.Q
            } else if (skill == 1) {
                skill = SKILL.Q
            } else if (skill == 2) {
                skill = SKILL.R
            } else if (skill == 3) {
                skill = SKILL.R
            }
            // SkillManager.instance.addSkill(skill)
            SkillManager.instance.addSkill(skill)
            otherCollider.node.destroy()
        }
        if (otherCollider.group == GroupTREASURE) {
            // 如果碰撞到 TREASURE，则不移动，即还原到碰撞前的位置
            switch (this.dir) {
                case Dir.DOWN:
                    if (selfCollider.node.position.y > otherCollider.node.position.y) {
                        this.vertical = 0
                        this.setPos(this.playerPosition.add(new Vec3(0, 5, 0)))
                    }
                    break;
                case Dir.UP:
                    if (selfCollider.node.position.y < otherCollider.node.position.y) {
                        this.vertical = 0
                        this.setPos(this.playerPosition.add(new Vec3(0, -5, 0)))
                    }
                    break;
                case Dir.LEFT:
                    if (selfCollider.node.position.x > otherCollider.node.position.x) {
                        this.horizontal = 0
                        this.setPos(this.playerPosition.add(new Vec3(5, 0, 0)))
                    }
                    break;
                case Dir.RIGHT:
                    if (selfCollider.node.position.x < otherCollider.node.position.x) {
                        this.horizontal = 0
                        this.setPos(this.playerPosition.add(new Vec3(-5, 0, 0)))
                    }
                    break;
                default:
                    break;
            }
        }
        if (otherCollider.group == GroupWIN) {
            OverManager.instance.success()
        }
        if (otherCollider.group == GroupKEY) {
            console.log('key');

            KEYManager.instance.addKey()
            otherCollider.node.destroy()
        }
        if (otherCollider.group == GroupSIGHT) {
            if (this.isStealth || OverManager.instance.getIsOver()) {
                return
            }
            console.log('sight');
            LoveManager.instance.subLove()
            // OverManager.instance.fail()
        }

    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

    }
    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

    }
    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

    }
    onTriggerEnter(event: ITriggerEvent) {
        console.log(event);

    }
    first = true
    onCollisionEnter(event: ICollisionEvent): void {
        console.log(event.otherCollider.node.name);

        if (event.otherCollider.node.name == "next_Pos" && this.first) {
            // next()
            // gameProgressManager.instance.enter()
            // this.first=false;
            // setTimeout(()=>{this.first=true }, 3000);
        }

        // 处理碰撞开始的逻辑，例如停止移动或播放碰撞动画
        this.stopPlayer();
    }


    onCollisionExit(event: ICollisionEvent): void {
        // 处理碰撞结束的逻辑，例如继续移动或播放正常动画
    }
    movePlayer(horizontal: number, vertical: number): void {
        // 更新玩家位置
        this.playerPosition.x += horizontal * this.speed;
        this.playerPosition.y += vertical * this.speed;

        // 将新位置应用到玩家节点
        this.node.setPosition(this.playerPosition);
    }

    stopPlayer(): void {
        // 可以在这里添加停止移动时的逻辑，例如播放停止动画等
        this.playerAni.stop()
    }
    isStealth = false
    onKeyDown(event: EventKeyboard): void {
        if (OverManager.instance.getIsOver()) {
            return
        }
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.horizontal = -1;
                break;
            case KeyCode.ARROW_RIGHT:
                this.horizontal = 1;
                break;
            case KeyCode.ARROW_UP:
                this.vertical = 1;
                break;
            case KeyCode.ARROW_DOWN:
                this.vertical = -1;
                break;
            case KeyCode.KEY_J:
                {
                    BulletGenerateManager.instance.shoot(this.playerPosition, this.dir)
                    console.log("J");
                    break;
                }// Add more cases for other keys as needed
            case KeyCode.KEY_K:
                console.log('隐身');
                if (SkillManager.instance.useSkill(SKILL.Q))//隐身
                    this.Stealth();
                break;
            case KeyCode.KEY_L:
                console.log('护罩');
                break;
            case KeyCode.KEY_I:
                console.log('回爱心');
                if (SkillManager.instance.useSkill(SKILL.R))//回爱心
                    LoveManager.instance.addLove();
                break;
            case KeyCode.KEY_O:
                console.log('失去爱心');
                // if(SkillManager.instance.useSkill(SKILL.E))//失去爱心
                LoveManager.instance.subLove();
                break;
        }

        // 更新 AnimationController 的变量
        this.updateAnimationVariables();
    }

    private originalOpacity: number = 255; // 玩家初始透明度
    private invisibleDuration: number = 5; // 隐身时长
    private blinkDuration: number = 0.5; // 闪烁时长
    private playerNode: Node = null;
    private tween: Tween<any> = null;
    Stealth() {
        console.log('隐身');

        this.playerNode = this.node.getChildByName("player")
        // 检查是否有 Sprite 组件
        const playerSprite = this.playerNode.getComponent(Sprite);
        if (!playerSprite) {
            console.error('Player node must have a Sprite component.');
            return;
        }

        // 保存初始颜色
        this.originalColor = playerSprite.color.clone();

        // 修改透明度为 128（半透明）
        this.setOpacity(playerSprite, 128);
        this.isStealth = true

        // 恢复透明度为初始值
        setTimeout(() => {
            this.resetOpacity(playerSprite);
        }, 5000);
        // this.isStealth = true
        // 保存初始透明度
        this.originalOpacity = playerSprite.color.a;

        // 启动隐身
        this.setOpacity(playerSprite, 155);
        // this.makeInvisible();
        // this.playerAni.play('Stealth.anim')       
    }
    private originalColor: Color = new Color(); // 玩家初始颜色
    setOpacity(sprite: Sprite, opacity: number) {
        // 设置 Sprite 组件的颜色，修改 alpha 值
        sprite.color = new Color(sprite.color.r, sprite.color.g, sprite.color.b, opacity);
    }

    resetOpacity(sprite: Sprite) {
        // 恢复 Sprite 组件的颜色为初始值
        sprite.color = this.originalColor;
        this.isStealth = false
    }
    // makeInvisible() {
    //     // 创建 Tween 对象，将玩家节点的透明度从当前值渐变到 0
    //     this.tween = new Tween(this.playerNode);
    //     this.tween.to(this.invisibleDuration, { opacity: 0 }, { easing: 'quadOut' })
    //         .call(() => {
    //             // 隐身结束后启动闪烁
    //             this.blink();
    //         })
    //         .start();
    // }

    // blink() {
    //     // 创建 Tween 对象，将玩家节点的透明度在闪烁时长内从 0 到 1
    //     this.tween = new Tween(this.playerNode);
    //     this.tween.to(this.blinkDuration, { opacity: 255 }, { easing: 'quadInOut' })
    //         .call(() => {
    //             // 闪烁结束后复原透明度并继续隐身
    //             this.playerNode.opacity = this.originalOpacity;
    //             this.makeInvisible();
    //         })
    //         .start();
    // }



    onKeyUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT:
                this.horizontal = 0;
                break;
            case KeyCode.ARROW_UP:
            case KeyCode.ARROW_DOWN:
                this.vertical = 0;
                break;
            // Add more cases for other keys as needed
        }

        // 更新 AnimationController 的变量
        this.updateAnimationVariables();
    }
    updateAnimationVariables(): void {

        // console.log(this.vertical, this.horizontal);

        if (Math.abs(this.vertical + this.horizontal) === 1) {
            if (this.vertical === 1) {
                this.playAnimation('UP.anim');
                this.dir = Dir.UP
                return;
            } else if (this.vertical === -1) {
                this.playAnimation('DOWN.anim');
                this.dir = Dir.DOWN
                return;
            }
            if (this.horizontal === 1) {
                this.playAnimation('RIGHT.anim');
                this.dir = Dir.RIGHT
                return;
            } else if (this.horizontal === -1) {
                this.playAnimation('LEFT.anim');
                this.dir = Dir.LEFT
                return;
            }
        } else {
            // 其他逻辑，可能是停止播放动画等
            this.stopPlayer();
        }

        // 在这里可以根据 horizontal 和 vertical 修改 AnimationController 中的变量
        // 假设 AnimationController 中有两个变量名为 horizontal 和 vertical
        // if (this.playerAnimation) {
        //     this.playerAnimation.setValue('horizontal', this.horizontal);
        //     this.playerAnimation.setValue('vertical', this.vertical);
        // }
    }
    playAnimation(clipName: string): void {
        console.log(clipName);
        if (this.playerAni) {
            if (clipName === 'UP.anim') {
                this.playerAni.play(this.aniClips[0].name);
            } else if (clipName === 'DOWN.anim') {
                this.playerAni.play(this.aniClips[1].name);
            } else if (clipName === 'LEFT.anim') {
                this.playerAni.play(this.aniClips[2].name);
            } else if (clipName === 'RIGHT.anim') {
                this.playerAni.play(this.aniClips[3].name);
            }
        }
        // if (this.playerAni) {
        //     this.playerAni.play(clipName);
        //     console.log("play", clipName);
        // }
    }
    start() {
        console.log("初始化");

        // this.playerAnimation = this.getComponentInChildren(animation.AnimationController)
        if (!this.bulletNode) this.bulletNode = this.node.parent.getChildByName("BulletNode")
        BulletGenerateManager.instance.init(this.bulletNode)
    }


    update(deltaTime: number) {
        if (Math.abs(this.vertical + this.horizontal) === 1) {

            this.movePlayer(this.horizontal, this.vertical)
        }
    }
}


