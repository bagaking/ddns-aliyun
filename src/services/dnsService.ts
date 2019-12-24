
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

    public async find(DomainName: string, RRKeyWord: string) {
        let result = await this.client.request<any>("DescribeDomainRecords", {
            Action: "DescribeDomainRecords",
            DomainName,
            RRKeyWord
        }, {method: "POST"});
        return result.DomainRecords.Record[0] as IDNSTarget & { Value: string, RecordId: string } || null;
    }

    public async update(RR: string, RecordId: string, Type: string, Value: string) {
        let result = await this.client.request("UpdateDomainRecord", {
            Action: "UpdateDomainRecord",
            RR,
            RecordId,
            Type,
            Value
        }, {method: "POST"});
        return result;
    }

    public async addDomainRecord(target: IDNSTarget, Value: string) {
        let result = await this.client.request("AddDomainRecord", {
            ... target,
            Value
        }, {method: "POST"});
        return result;
    }

}
