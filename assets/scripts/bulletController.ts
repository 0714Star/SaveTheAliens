import { _decorator, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node, PhysicsSystem2D, Vec3, view } from 'cc';
import { Dir } from './manager/BulletGenerateManager';
import { treasureController } from './treasureController';
const { ccclass, property } = _decorator;

const GroupNEXT = 1 << 1;
const GroupBULLET = 1 << 2;
const GroupTREASURE = 1 << 3;
const GroupSKILL = 1 << 4;
@ccclass('bulletController')
export class bulletController extends Component {
    private speed: number = 300; // 子弹移动速度
    private direction: Vec3 = new Vec3(); // 子弹移动方向
    protected onLoad(): void {
        // 获取 PhysicsSystem2D 模块
        const physicsSystem = PhysicsSystem2D.instance;

        // 启用碰撞事件
        // physicsSystem.enableContactListener(true);

        // 添加碰撞事件监听
        const collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on('onEndContact', this.onEndContact, this);
            collider.on('onPreSolve', this.onPreSolve, this);
            collider.on('onPostSolve', this.onPostSolve, this);
        }
    }
    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        const group = otherCollider.group;
        console.log("类型", group);

        // 如果碰撞到了 TREASURE，执行相应操作
        if (group === GroupTREASURE) {
            this.handleTreasureCollision(otherCollider.node);
        }

        // 无论碰撞到什么，都销毁子弹
        this.node.destroy();
    }

    private onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 在结束碰撞时的处理，根据实际需求进行修改
    }

    private onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 在碰撞预处理时的处理，根据实际需求进行修改
    }

    private onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 在碰撞后处理时的处理，根据实际需求进行修改
    }

    private handleTreasureCollision(treasureNode: Node) {
        // 处理 TREASURE 碰撞的逻辑，例如增加分数、播放音效等
        treasureNode.getComponent(treasureController).hurt(20)
        console.log('Bullet collided with TREASURE!');
        this.node.destroy()
    }

    start() {

    }
    public setDirection(dir: Dir) {
        // 根据方向设置子弹的移动方向
        switch (dir) {
            case Dir.LEFT:
                this.direction.set(-1, 0, 0);
                break;
            case Dir.RIGHT:
                this.direction.set(1, 0, 0);
                break;
            case Dir.UP:
                this.direction.set(0, 1, 0);
                break;
            case Dir.DOWN:
                this.direction.set(0, -1, 0);
                break;
            // 添加其他方向的处理
        }
    }
    update(deltaTime: number) {
        // 移动子弹
        const tmp_dir = this.direction.clone()
        const deltaMove = tmp_dir.multiplyScalar(this.speed * deltaTime);
        // this.direction = this.direction.normalize()
        // console.log(deltaTime);

        this.node.position = this.node.position.add(deltaMove);

        // 如果子弹移出屏幕，则销毁子弹
        if (this.isOutOfScreen()) {
            this.node.destroy();
        }
    }

    private isOutOfScreen(): boolean {
        // 获取屏幕的宽度和高度
        const screenSize = view.getVisibleSize();
        const screenWidth = screenSize.width;
        const screenHeight = screenSize.height;

        // 获取子弹的当前位置
        const bulletPosition = this.node.position;

        // 判断子弹是否移出屏幕
        return (
            bulletPosition.x < -screenWidth / 2 ||
            bulletPosition.x > screenWidth / 2 ||
            bulletPosition.y < -screenHeight / 2 ||
            bulletPosition.y > screenHeight / 2
        );
    }
}


