"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("vsts-task-lib/task");
const mod = require("./taskmod");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(process.env["INPUT_SAMPLESTRING"]);
            let tool;
            if (process.platform == 'win32') {
                let cmdPath = tl.which('cmd');
                tool = tl.tool(cmdPath).arg('/c').arg('echo ' + tl.getInput('samplestring', true));
            }
            else {
                let echoPath = tl.which('echo');
                tool = tl.tool(echoPath).arg(tl.getInput('samplestring', true));
            }
            let rc1 = yield tool.exec();
            // call some module which does external work
            if (rc1 == 0) {
                mod.sayHello();
            }
            console.log('Task done! ' + rc1);
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
