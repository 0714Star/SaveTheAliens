/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-30 09:00:53
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2023-12-30 10:30:29
 * @FilePath: \SaveTheAliens\assets\scripts\manager\BulletGenerateManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Component, instantiate, Node, Prefab, resources, Vec3 } from 'cc';
import { bulletController } from '../bulletController';
const { ccclass, property } = _decorator;

// 界面名称的枚举
export enum Dir {
    LEFT,
    RIGHT,
    UP,
    DOWN
    // 添加其他界面名称
}
@ccclass('BulletGenerateManager')
export class BulletGenerateManager {
    BulletNode: Node = null
    private static _instance: BulletGenerateManager | null = null;
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new BulletGenerateManager();
        // this._instance.init();
        return this._instance;
    }
    init(bulletNode: Node) {
        this.BulletNode = bulletNode
        console.log('传参fuzhi');

    }
    private async loadPrefab(prefabPath: string): Promise<Prefab> {
        return new Promise((resolve, reject) => {
            resources.load(prefabPath, (err, asset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(asset as Prefab);
                }
            });
        });
    }
    bulletPrefab: Prefab = null
    async shoot(pos: Vec3, dir: Dir) {
        console.log('发射', dir);

        // 检查是否有预制体
        if (!this.bulletPrefab) {
            this.bulletPrefab = await this.loadPrefab("prefabs/bullet");
            // console.error('Bullet prefab is not set!');
            // return;
        }
        // 实例化子弹
        const bulletNode = instantiate(this.bulletPrefab);

        // 设置子弹的初始位置
        bulletNode.setPosition(pos);

        // 设置子弹的方向
        this.setBulletDirection(bulletNode, dir);

        // 将子弹添加到场景中
        this.BulletNode.addChild(bulletNode);
    }
    private setBulletDirection(bulletNode: Node, dir: Dir) {
        // 根据方向设置子弹的运动方向，可以根据实际需求修改
        switch (dir) {
            case Dir.LEFT:
                // 设置子弹向左的运动方向
                bulletNode.getComponent(bulletController).setDirection(Dir.LEFT);
                break;
            case Dir.RIGHT:
                // 设置子弹向右的运动方向
                bulletNode.getComponent(bulletController).setDirection(Dir.RIGHT);
                break;
            case Dir.UP:
                // 设置子弹向上的运动方向
                bulletNode.getComponent(bulletController).setDirection(Dir.UP);
                break;
            case Dir.DOWN:
                // 设置子弹向下的运动方向
                bulletNode.getComponent(bulletController).setDirection(Dir.DOWN);
                break;
            // 添加其他方向的处理
        }
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


