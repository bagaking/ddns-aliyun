export type TargetType = "A" | "NS" | "MX" | "TXT" | "CNAME" | "SRV" | "AAAA" | "CAA" | "REDIRECT_URL" | "FORWARD_URL";

export interface IDNSTarget {
    DomainName: string;
    RR: string;
    Type: TargetType;
}

export interface IDNSConfig {
    authority: {
        accessKeyId: string;
        accessKeySecret: string;
    };
    targets: IDNSTarget[];
    timeSpanMs: number;
}
