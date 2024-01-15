'use strict';

import { join } from 'path';
import { existsSync } from 'fs';
import SimplePlist from "simple-plist";
import { spawn } from 'child_process';

interface IAssetInfo {
    name: string; // 资源名字
    source: string; // url 地址
    path: string; // loader 加载的层级地址
    url: string; // loader 加载地址会去掉扩展名，这个参数不去掉
    file: string; // 绝对路径
    uuid: string; // 资源的唯一 ID
    importer: string; // 使用的导入器名字
    imported: boolean; // 是否结束导入过程
    invalid: boolean; // 是否导入成功
    type: string; // 类型
    isDirectory: boolean; // 是否是文件夹
    library: { [key: string]: string }; // 导入资源的 map

    // dataKeys 作用范围
    displayName?: string; // 资源用于显示的名字
    readonly?: boolean; // 是否只读
    visible?: boolean; // 是否显示
    subAssets?: { [key: string]: IAssetInfo }; // 子资源 map
    // 虚拟资源可以实例化成实体的话，会带上这个扩展名
    instantiation?: string;
    // redirect?: IRedirectInfo; // 跳转指向资源
    // meta?: IAssetMeta,
    fatherInfo?: any;
    extends?: string[]; // 资源的继承链信息
    mtime?: number; // 资源文件的 mtime
    depends?: string[]; // 依赖的资源 uuid 信息
    dependeds?: string[]; // 被依赖的资源 uuid 信息
}

function openAssetWithProgram(file: string, program: string, args?: string[]) {
    return new Promise((resolve, reject) => {
        args = args || [];
        let cmd = '';
    
        if (process.platform === 'darwin') {
            if (program.endsWith('.app')) {
                try {
                    program = join(program, '/Contents/MacOS/');
                    // Mac 上某些 app 里的 Info.plist 的编码可能不是 utf8，直接使用 plist 库无法解析二进制格式
                    // const plistObj = parse(readFileSync(join(program, 'Info.plist'), 'utf8'));
                    const plistObj: any = SimplePlist.readFileSync(join(program, '../Info.plist'));
                    const fileName = join(program, plistObj.CFBundleExecutable);
                    program = fileName;
                } catch (error) {
                    return reject(`Probably the program's Info.plist error: ${error}`);
                }
            }
            cmd = 'open';
            if (args) {
                args.splice(0, 0, program);
                args.splice(0, 0, '-a');
            } else {
                args = ['-a', program, file];
            }
        } else {
            cmd = program;
            if (!args) {
                args = [file];
            }
        }
    
        const child = spawn(cmd, args, {
            detached: true,
            stdio: 'ignore',
        });
        child.unref();
    });
}

const openerMap: { [key: string]: (asset: IAssetInfo) => void } = {
    '*'(asset: IAssetInfo) {
        if (asset && asset.file) {
            // shell.openPath(asset.file); // electron 的 shell
            const command = process.platform === 'win32' ? 'explorer' : process.platform === 'darwin' ? 'open' : 'xdg-open';
            const args = [asset.file];
            const childProcess = spawn(command, args, { stdio: 'inherit' });
        }
    },

    javascript(asset: IAssetInfo) {
        openCodeAsset(asset);
    },
    typescript(asset: IAssetInfo) {
        openCodeAsset(asset);
    },
};

function getVSCodeEditor() {
    // 系统可能存在的 vscode 编辑器
    let app = '';
    if (process.platform === 'darwin') {
        app = '/Applications/Visual Studio Code.app';
    } else {
        app = 'C:\\Program Files (x86)\\Microsoft VS Code\\Code.exe';
    }

    return app;
}

function openCodeAsset(asset: IAssetInfo) {
    const app = getVSCodeEditor();
    if (existsSync(app)) {
        openAssetWithProgram(asset.file, app, ['--goto', asset.file]);
    } else {
        openerMap['*'](asset);
    }
}

export function openAsset(asset: IAssetInfo) {
    try {
        const handle = openerMap[asset.importer] || openerMap['*'];
        handle(asset);
    } catch (error) {
        openerMap['*'](asset);
        console.error(error);
    }
}
