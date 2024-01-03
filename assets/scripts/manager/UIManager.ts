/*
 * @Author: yao 3043885855@qq.com
 * @Date: 2023-12-28 23:30:11
 * @LastEditors: yao 3043885855@qq.com
 * @LastEditTime: 2024-01-02 10:35:50
 * @FilePath: \SaveTheAliens\assets\scripts\manager\UIManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// /*
//  * @Author: yao 3043885855@qq.com
//  * @Date: 2023-12-28 23:30:11
//  * @LastEditors: yao 3043885855@qq.com
//  * @LastEditTime: 2023-12-28 23:33:46
//  * @FilePath: \SaveTheAliens\assets\scripts\manager\UIManager.ts
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */
// import { _decorator, Component, Node } from 'cc';
// const { ccclass, property } = _decorator;

// import { Prefab, director, instantiate, resources } from "cc";

// @ccclass('UIManager')
// export class UIManager {
//     private static _instance: UIManager = null;
//     static get instance() {
//         if (this._instance) return this._instance;
//         this._instance = new UIManager();
//         return this._instance;
//     }
//     /**
//  * @zh 获取所有界面 Map存放是否在显示
//  * */
//     private viewList: Map<string, boolean> = new Map();
//     addView(viewName: string, params?: {}) {

//     }
//     closeView() {

//     }

//     update(deltaTime: number) {

//     }
// }


// // @ccclass('UIManager')
// export class UIManager {
//     private static _instance: UIManager = null;
//     static get instance() {
//         if (this._instance) return this._instance;
//         this._instance = new UIManager();
//         this._instance.init();
//         return this._instance;
//     }

//     /**
//      * @zh 获取所有界面 Map 存放是否在显示
//      */
//     private viewList: Map<string, boolean> = new Map();

//     /**
//      * @zh 初始化 UIManager
//      */
//     init() {
//         // 在这里进行 UIManager 的初始化逻辑，如果有需要的话
//     }

//     /**
//      * @zh 添加界面
//      * @param viewName 界面名称
//      * @param params 界面参数，可根据需要进行扩展
//      */
//     addView(viewName: string, params?: {}) {
//         if (!this.viewList.get(viewName)) {
//             // 根据 viewName 实例化预制体，假设预制体路径为 "prefabs/" + viewName
//             // 此处假设你的预制体脚本有一个 show 方法用于显示界面
//             resources.load("prefabs/" + viewName, Prefab, (err, prefab) => {
//                 if (err) {
//                     console.error("Failed to load prefab:", err);
//                     return;
//                 }

//                 const node = instantiate(prefab);
//                 // 这里可以根据需要对 node 进行初始化设置
//                 // 例如，将参数传递给预制体脚本的某个方法
//                 const script = node.getComponent(viewName);
//                 if (script && script.show) {
//                     script.show(params);
//                 }

//                 // 将界面节点添加到场景中或相应的 UI 父节点下
//                 // 你需要根据实际项目场景结构进行调整
//                 director.getScene().addChild(node);

//                 // 更新界面状态
//                 this.viewList.set(viewName, true);
//             });
//         }
//     }

//     /**
//      * @zh 关闭界面
//      * @param viewName 界面名称
//      */
//     closeView(viewName: string) {
//         if (this.viewList.get(viewName)) {
//             // 关闭界面的逻辑，假设你的预制体脚本有一个 close 方法用于关闭界面
//             const node = director.getScene().getChildByName(viewName);
//             const script = node.getComponent(viewName);
//             if (script && script.close) {
//                 script.close();
//             }

//             // 从场景中移除节点
//             node.destroy();

//             // 更新界面状态
//             this.viewList.set(viewName, false);
//         }
//     }

//     update(deltaTime: number) {
//         // 在这里可以添加一些需要在每帧更新的逻辑
//     }
// }



// import { director, resources, instantiate, Node, Prefab } from 'cc';

// export default class UIManager {
//     private static _instance: UIManager | null = null;
//     static get instance() {
//         if (this._instance) return this._instance;
//         this._instance = new UIManager();
//         this._instance.init();
//         return this._instance;
//     }

//     private viewList: Map<string, boolean> = new Map();

//     init() {
//         // 在这里进行 UIManager 的初始化逻辑，如果有需要的话
//     }

//     addView(viewName: string, params?: {}) {
//         if (!this.viewList.get(viewName)) {
//             resources.load<Prefab>(`prefabs/${viewName}`, (err, prefab) => {
//                 if (err) {
//                     console.error("Failed to load prefab:", err);
//                     return;
//                 }

//                 const node = instantiate(prefab);
//                 const script = node.getComponent(viewName) as any;
//                 if (script && script.show) {
//                     script.show(params);
//                 }

//                 director.getScene().addChild(node);
//                 this.viewList.set(viewName, true);
//             });
//         }
//     }

//     closeView(viewName: string) {
//         if (this.viewList.get(viewName)) {
//             const node = director.getScene().getChildByName(viewName);
//             const script = node?.getComponent(viewName) as any;
//             if (script && script.close) {
//                 script.close();
//             }

//             node?.destroy();
//             this.viewList.set(viewName, false);
//         }
//     }

//     update(deltaTime: number) {
//         // 在这里可以添加一些需要在每帧更新的逻辑
//     }
// }


import { director, resources, instantiate, Node, Prefab, log, Enum } from 'cc';

// 界面配置信息的接口
interface ViewConfig {
    prefabPath: string;
    // 可根据需要扩展其他配置项
}

// 界面名称的枚举
export enum ViewName {
    Home = "HomeView",
    Setting = "SettingView",
    Game = "GameView"
    // 添加其他界面名称
}

export default class UIManager {
    private static _instance: UIManager | null = null;


    private UINode: Node = null
    static get instance() {
        if (this._instance) return this._instance;
        this._instance = new UIManager();
        // this._instance.init();
        return this._instance;
    }

    private viewList: Map<string, boolean> = new Map();
    private prePrefabs: { [key: string]: Prefab } = {};
    init(uiNode: Node) {
        // 在这里进行 UIManager 的初始化逻辑，如果有需要的话
        this.UINode = uiNode
        this.preloadViews(ViewName.Game);
        this.preloadViews(ViewName.Home);
        // resources.loadDir("prefabs")
        // this.preloadViews();
    }

    addView(viewName: ViewName, params?: {}) {
        // const config = this.getViewConfig(viewName);

        // if (!config || this.viewList.get(viewName.toString())) {
        //     return;
        // }

        // // 使用预加载的 prefab
        // const prefab = this.preloadedPrefabs[viewName];

        // if (prefab) {
        //     const node = instantiate(prefab);
        //     const script = node.getComponent(viewName.toString()) as any;

        //     if (script && script.show) {
        //         script.show(params);
        //     }

        //     this.UINode.addChild(node);
        //     this.viewList.set(viewName.toString(), true);
        //     console.log('成功');
        // } else {
        //     console.error(`${viewName} prefab not preloaded`);
        // }

        //解释呢
        const config = this.getViewConfig(viewName);
        console.log(config);

        if (!config || this.viewList.get(viewName.toString())) {
            return;
        }
        if(this.prePrefabs[viewName.toString()]){
            const node = instantiate(this.prePrefabs[viewName.toString()]);
            const script = node.getComponent(viewName.toString()) as any;
            if (script && script.show) {
                script.show(params);
            }
            this.UINode.addChild(node);
            this.viewList.set(viewName.toString(), true);
            console.log('成功');
            return;
        }
        resources.load<Prefab>(config.prefabPath, (err, prefab) => {
            if (err) {
                console.error("Failed to load prefab:", err);
                return;
            }

            const node = instantiate(prefab);
            const script = node.getComponent(viewName.toString()) as any;
            if (script && script.show) {
                script.show(params);
            }

            this.UINode.addChild(node);
            this.viewList.set(viewName.toString(), true);
            console.log('成功');

        });
        //你你你你你你
        // let prefab = resources.get<Prefab>(config.prefabPath, Prefab)
        // console.log(prefab);
        // console.log(config.prefabPath);

        // console.log('-----------');

        // const node = instantiate(prefab)
        // const script = node.getComponent(viewName.toString()) as any;
        // if (script && script.show) {
        //     script.show(params);
        // }

        // this.UINode.addChild(node);
        // this.viewList.set(viewName.toString(), true);
        // console.log('成功');
    }
    preloadedPrefabs: { [key: string]: Prefab } = {}
    private preloadViews(viewName: ViewName): void {


            const config = this.getViewConfig(viewName as any);
            console.log(viewName, "config");

            if (config) {
                resources.load<Prefab>(config.prefabPath, (err, prefab) => {
                    if (err) {
                        console.error(`Failed to preload ${viewName} prefab:`, err);
                        return;
                    }

                    // 缓存已加载的 prefab
                    this.preloadedPrefabs[viewName] = prefab;
                    console.log(`Preloaded ${viewName} prefab`);
                });
            }
    }
    closeView(viewName: ViewName) {
        console.log(viewName.toString());
        console.log(this.viewList);
        console.log(this.UINode)


        if (this.viewList.get(viewName.toString())) {
            const node = this.UINode.getChildByName(viewName.toString());

            const script = node?.getComponent(viewName.toString()) as any;
            if (script && script.close) {
                script.close();
            }

            node?.destroy();
            this.viewList.set(viewName.toString(), false);
        }
    }

    update(deltaTime: number) {
        // 在这里可以添加一些需要在每帧更新的逻辑
    }

    private getViewConfig(viewName: ViewName): ViewConfig | null {
        // 根据界面名称返回对应的配置信息，可以在这里进行配置
        // switch (viewName) {
        //     case ViewName.Home:
        //         return { prefabPath: 'prefabs/HomeView' };
        //     case ViewName.Setting:
        //         return { prefabPath: 'prefabs/SettingView' };
        //     case ViewName.Game :
        //         return { prefabPath: 'prefabs/GameView' };
        //     // 添加其他界面的配置
        //     default:
        //         return null;
        // }
        if (viewName === ViewName.Home || viewName.toString() == "0") {
            return { prefabPath: 'prefabs/HomeView' };
        } else if (viewName === ViewName.Setting || viewName.toString() == "1") {
            return null
            return { prefabPath: 'prefabs/SettingView' };
        } else if (viewName.toString() == "2" || viewName === ViewName.Game) {
            return { prefabPath: 'prefabs/GameView' };
        }
    }
}
