import {genLogger, genMemCache, IWorker, Worker, WorkerRunningState, Logger, IMemCache, turtle} from "@khgame/turtle";
import {forMs} from "kht/lib";
import {Service} from "typedi";
import {getExternalIP} from "ip-public";
import {IDNSConfig, IDNSTarget} from "../const";
import {DnsService} from "../services/dnsService";

@Service()
export class DDNSWorker extends Worker implements IWorker {

    public readonly cache: IMemCache = genMemCache();

    constructor(private readonly ddnsService: DnsService) {
        super("ddns");
        this.runningState = WorkerRunningState.PREPARED;
    }

    private async getExternalIP() {
        return getExternalIP();
    }

    async onStart(): Promise<boolean> {

        this.proc().then((ret => {
            this.log.warn(`⊙ proc of worker ${this.name} exited !`);
        })).catch(e => {
            this.log.error(`⊙ proc of worker ${this.name} failed ! message:${e.message} stack:${e.stack}`);
        });

        return true;
    }

    async proc() {
        this.log.info(`⊙ worker ${this.name} proc started`);
        let round = 0;
        let targets = turtle.rules<IDNSConfig>().targets;
        while (true) {
            this.log.info(`⊙ worker ${this.name} round ${round} started `);

            this.processRunning += 1;
            try {
                for (let indTarget in targets){
                    let target: IDNSTarget = targets[indTarget];
                    let result = await this.ddnsService.addDomainRecord(target);
                    this.log.info(`update target ${
                        JSON.stringify(Object.values(target))} ${
                        result ? "success" : "failed"}: ${
                        result ? JSON.stringify(result) : "null"
                        }`);
                }
                // todo: do something here
            }
            catch (e) {
                this.log.error(`⊙ proc of worker ${this.name} error: ${e}, ${e.stack} `);
                throw e;
            } finally {
                this.processRunning -= 1;
            }

            this.log.info(`⊙ worker ${this.name} round ${round++} finished`);
            await forMs(turtle.rules<IDNSConfig>().timeSpanMs || 60000);
        }
    }



}
