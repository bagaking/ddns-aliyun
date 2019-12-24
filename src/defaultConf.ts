import {IDNSTarget} from "./const";

export const defaultConf = {
    "name": "ddns-aliyun",
    "id": 0,
    "port": 10053,
    "setting": {
        "log_prod_console": "info"
    },
    "drivers": {},
    "rules": {
        "authority": {
            "accessKeyId": "_FILL_THIS",
            "accessKeySecret": "_FILL_THIS",
        },
        "targets": [
            {
                "DomainName": "_YOUR_DOMAIN_NAME.com",
                "RR": "*",
                "Type": "A"
            }
        ],
        "timeSpanMs": 60000,
    },
};
