import { _decorator, Component, Vec3, director, gfx, PolygonCollider2D, renderer, Material, Graphics, Node, Color, tween, Quat, System, systemEvent, EventTarget } from 'cc';
import { OverManager } from './manager/OverManager';
const { ccclass, property } = _decorator;

// @ccclass('enemyController')
// export class enemyController extends Component {
//     private visionCollider: PolygonCollider2D = null;
//     private startPoint: Vec3 = new Vec3(0, 0, 0);
//     private endPoint: Vec3 = new Vec3(100, 0, 0);
//     private movingSpeed: number = 50;
//     private graphics: gfx.Graphics = null;

//     start() {
//         // 获取或添加 Graphics 组件
//         this.graphics = this.node.getComponent(gfx.Graphics) || this.node.addComponent(gfx.Graphics);

//         // 设置视角的初始位置
//         this.visionCollider.node.setPosition(this.startPoint);
//     }

//     update(deltaTime: number) {
//         // 计算移动方向
//         const direction = this.endPoint.subtract(this.startPoint).normalize();

//         // 计算下一帧的位置
//         const nextPosition = this.startPoint.add(direction.multiplyScalar(this.movingSpeed * deltaTime));

//         // 判断是否到达终点，如果是，则交换起点和终点
//         if (nextPosition.subtract(this.endPoint).length() > this.endPoint.subtract(this.startPoint).length()) {
//             const temp = this.startPoint;
//             this.startPoint = this.endPoint;
//             this.endPoint = temp;
//         }

//         // 更新视角的位置
//         this.visionCollider.node.setPosition(nextPosition);
//         this.startPoint = nextPosition;

//         // 绘制视角
//         this.drawVision();
//     }

//     drawVision() {
//         // 获取视角的世界坐标点
//         const worldPoints = this.visionCollider.world.points;

//         // 使用 Graphics 组件绘制线条
//         this.graphics.clear();

//         // 设置绘制样式
//         this.graphics.strokeColor = gfx.Color.RED;
//         this.graphics.lineWidth = 2;

//         // 将世界坐标点转换为屏幕坐标点
//         const screenPoints = worldPoints.map((worldPoint) => {
//             const screenPoint = director.getScene().renderScene.screen.node.convertToUINode(worldPoint);
//             return screenPoint;
//         });

//         // 绘制线条
//         for (let i = 0; i < screenPoints.length; i++) {
//             const startPoint = screenPoints[i];
//             const endPoint = screenPoints[(i + 1) % screenPoints.length];
//             this.graphics.moveTo(startPoint.x, startPoint.y);
//             this.graphics.lineTo(endPoint.x, endPoint.y);
//         }

//         this.graphics.stroke();
//     }
// }
// @ccclass('EnemyController')
// export class EnemyController extends Component {
//     private visionCollider: PolygonCollider2D = null;
//     private startPoint: Vec3 = new Vec3(0, 0, 0);
//     private endPoint: Vec3 = new Vec3(100, 0, 0);
//     private movingSpeed: number = 50;
//     private material: Material = null;

//     start() {
//         this.material = new Material();
//         this.material.initialize({ effectName: 'unlit' }); // 使用内置的 unlit.effect 作为示例
//         this.material.setProperty('mainColor', new Vec3(1, 0, 0)); // 设置颜色为红色

//         // 设置视角的初始位置
//         this.visionCollider.node.setPosition(this.startPoint);
//     }

//     update(deltaTime: number) {
//         // 计算移动方向
//         const direction = this.endPoint.subtract(this.startPoint).normalize();

//         // 计算下一帧的位置
//         const nextPosition = this.startPoint.add(direction.multiplyScalar(this.movingSpeed * deltaTime));

//         // 判断是否到达终点，如果是，则交换起点和终点
//         if (nextPosition.subtract(this.endPoint).length() > this.endPoint.subtract(this.startPoint).length()) {
//             const temp = this.startPoint;
//             this.startPoint = this.endPoint;
//             this.endPoint = temp;
//         }

//         // 更新视角的位置
//         this.visionCollider.node.setPosition(nextPosition);
//         this.startPoint = nextPosition;
//     }

//     onEnable() {
//         this.node.on(Component.EventType.BEFOREDRAW, this.onBeforeDraw, this);
//     }

//     onDisable() {
//         this.node.off(Component.EventType.BEFOREDRAW, this.onBeforeDraw, this);
//     }

//     onBeforeDraw() {
//         const device = renderer.device;
//         const handle = device.createShaderHandle(this.material._uuid, this.material._effectAsset._shaders[0], this.material._defines);

//         const pipeline = renderer.director.root.pipeline;

//         const pass = renderer.Pass.getPassByName(this.material.passes[0]);

//         pipeline.commandBuffers[0].bindDescriptorSet(pass, this.material.descriptorSet);

//         pipeline.commandBuffers[0].bindDescriptorSet(pipeline.descriptorSet);

//         pipeline.commandBuffers[0].bindInputAssembler(this.material.ia);

//         pipeline.commandBuffers[0].bindPipelineState(pipeline.renderPasses[0].getPipelineState(pass));

//         pipeline.commandBuffers[0].draw(this.material.ia);

//         renderer.handleManager.unregister(handle);
//     }
// }
@ccclass('enemyController')
export class enemyController extends Component {
    private visionGraphics: Graphics = null;
    @property(Vec3)
    private startPoint: Vec3 = new Vec3(-100, 0, 0);
    @property(Vec3)
    private endPoint: Vec3 = new Vec3(100, 0, 0);
    private movingSpeed: number = 50;
    private visionRadius: number = 100; // 圆的半径
    private visionColor: Color = new Color(255, 255, 255, 100); // 初始颜色为淡白色

    // start() {
    //     // 创建一个子节点用于绘制视野
    //     let visionNode = new Node();
    //     visionNode.name = 'VisionNode';
    //     this.visionGraphics = visionNode.addComponent(Graphics);
    //     this.node.addChild(visionNode);
    //     console.log("绘制开启");

    //     // 设置视角的初始位置
    //     this.visionGraphics.moveTo(this.startPoint.x, this.startPoint.y);
    // }
    // protected onEnable(): void {
    //     console.log('绘制开启');

    // }

    // update(deltaTime: number) {
    //     // console.log(123);

    //     // 计算移动方向
    //     const direction = this.endPoint.subtract(this.startPoint).normalize();

    //     // 计算下一帧的位置
    //     const nextPosition = this.startPoint.add(direction.multiplyScalar(this.movingSpeed * deltaTime));

    //     // 判断是否到达终点，如果是，则交换起点和终点
    //     if (nextPosition.subtract(this.endPoint).length() > this.endPoint.subtract(this.startPoint).length()) {
    //         const temp = this.startPoint;
    //         this.startPoint = this.endPoint;
    //         this.endPoint = temp;
    //     }

    //     // 更新视角的位置
    //     this.visionGraphics.lineTo(nextPosition.x, nextPosition.y);
    //     this.startPoint = nextPosition;
    // }
    start() {
        // 创建一个子节点用于绘制视野
        const visionNode = new Node();
        visionNode.name = 'VisionNode';
        this.visionGraphics = visionNode.addComponent(Graphics);
        this.node.addChild(visionNode);

        // 设置视角的初始位置
        this.visionGraphics.moveTo(this.startPoint.x, this.startPoint.y);
    }
    protected update(dt: number): void {
        if (OverManager.instance.getIsOver()) {
            return
        }

        // this.update1(dt)
    }
    protected onEnable(): void {
        this.init();
    }
    init() {
        this.moveAndRotate();
        globalThis.target = new EventTarget();
        globalThis.target.on('enemyOverAni', this.stopAni, this);
    }
    @property
    moveDuration: number = 4; // 移动时间

    @property
    rotateDuration: number = 1; // 旋转时间
    moveAndRotateTween: any;
    private moveAndRotate(): void {
        console.log('开始移动哦');

        this.moveAndRotateTween = tween(this.node)
            .to(this.moveDuration, { position: this.endPoint })
            .by(this.rotateDuration, { angle: -180 }, { easing: 'quadInOut' }) // 使用 easing 使得旋转更加自然

            // .call(() => {
            //     // 在到达目标点后旋转180°
            //     const rotationQuat = Quat.fromEuler(new Quat(), 0, 180, 0);
            //     this.node.rotate(rotationQuat);
            // })
            .to(this.moveDuration, { position: this.startPoint })
            .by(this.rotateDuration, { angle: 180 }, { easing: 'quadInOut' }) // 使用 easing 使得旋转更加自然
            // .call(() => {
            //     // 在返回起始点后旋转180°
            //     const rotationQuat = Quat.fromEuler(new Quat(), 0, -180, 0);
            //     this.node.rotate(rotationQuat);
            // })
            .union() // 同时进行移动和旋转
            .repeatForever() // 无限重复
            .start();
    }
    stopAni() {
        this.moveAndRotateTween.stop()
    }
    reStart() {
        this.stopAni()
        this.init()
        //监听停止动画

    }
    update1(deltaTime: number) {
        // 计算移动方向
        const direction = this.endPoint.subtract(this.startPoint).normalize();

        // 计算下一帧的位置
        const nextPosition = this.startPoint.add(direction.multiplyScalar(this.movingSpeed * deltaTime));

        // 判断是否到达终点，如果是，则交换起点和终点
        if (nextPosition.subtract(this.endPoint).length() > this.endPoint.subtract(this.startPoint).length()) {
            const temp = this.startPoint;
            this.startPoint = this.endPoint;
            this.endPoint = temp;
        }

        // 更新视角的位置
        this.visionGraphics.lineTo(nextPosition.x, nextPosition.y);
        this.startPoint = nextPosition;

        // 绘制圆形
        // this.drawCircle(nextPosition.x, nextPosition.y, this.visionRadius);
    }

    private drawCircle(x: number, y: number, radius: number) {
        this.visionGraphics.fillColor = this.visionColor; // 设置填充颜色
        this.visionGraphics.circle(x, y, radius);
        this.visionGraphics.fill(); // 填充颜色
        this.visionGraphics.stroke(); // 绘制边框
    }
    // 提供接口来修改颜色
    public setVisionColor(color: Color) {
        this.visionColor = color;
    }
}