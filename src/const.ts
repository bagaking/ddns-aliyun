export interface IDNSTarget {
    DomainName: string;
    RR: string;
    Type: string;
}

export interface IDNSConfig {
    authority: {
        accessKeyId: string;
        accessKeySecret: string;
    };
    targets: IDNSTarget[];
    timeSpanMs: number;
}
