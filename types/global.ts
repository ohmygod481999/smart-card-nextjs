export interface Account {
    id: number;
    ory_id: string;
    name: string;
    avatar: string;
    phone: string;
    email: string;
    description: string;
    user_info: {
        traits: string;
    };
}

export interface CardInfo {
    account_id: null | number;
    account: Account;
    id: number;
}

interface Address {
    id: string;
    value: string;
    verified: boolean;
    via: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface OryUserInfo {
    id: string;
    credentials: string;
    schema_id: string;
    schema_url: string;
    state: string;
    state_changed_at: string;
    traits: string;
    verifiable_addresses: [Address];
    recovery_addresses: [Address];
    metadata_public: string;
    metadata_admin: string;
    created_at: string;
    updated_at: string;
}

export interface AccountInfo {
    id: number;
    ory_id: string;
    user_info: OryUserInfo;
}
