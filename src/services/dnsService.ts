
import {Service} from "typedi";
import {
    genAssert,
    genLogger, turtle
} from "@khgame/turtle/lib";
import * as Core from "@alicloud/pop-core";
import {IDNSConfig, IDNSTarget} from "../const";

@Service()
export class DnsService {

    log = genLogger("s:dns");
    assert = genAssert("s:dns");

    client: Core;

    constructor() {
        this.client = new Core({
            ... turtle.rules<IDNSConfig>().authority,
            endpoint: "https://alidns.aliyuncs.com",
            apiVersion: "2015-01-09"
        });
    }

    public async addDomainRecord(target: IDNSTarget, ip: string) {
        let result = await this.client.request("AddDomainRecord", {
            ... target,
            Value: ip
        }, {method: "POST"});
        return result;
    }

}
