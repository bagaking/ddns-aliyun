import {Get, Post, JsonController, UseInterceptor} from "routing-controllers";
import {genLogger, Logger} from "@khgame/turtle";

import {MessageInterceptor} from "../api";
import {DDNSWorker} from "../workers";

@UseInterceptor(MessageInterceptor)
@JsonController("/bi")
export class BIController {

    public log: Logger = genLogger("api:panel");

    constructor(private readonly ddnsWorker: DDNSWorker) {
    }

    @Get("/info")
    async info() {
        return Math.floor((new Date()).getTime() / 3600000);
    }

    @Post("/running_process")
    async getProcessRunning() {
        return this.ddnsWorker.processRunning;
    }


}
