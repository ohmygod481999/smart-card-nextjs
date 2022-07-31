export interface Account {
    id: number;
    ory_id: string;
    name: string;
    avatar: string;
    phone: string;
    email: string;
    facebook: string;
    zalo: string;
    slide_text: string;
    description: string;
    is_agency: boolean;
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

export enum WalletType {
    Main = 0,
    Secondary = 1,
}
export interface Wallet {
    id: number;
    amount: number;
    type: WalletType;
    bank_name: string;
    bank_number: string;
}

export enum TransactionType {
    REFER = 0,
    REWARD_NEW_USER = 1,
    REFER_AGENCY = 2,
    WITHDRAW = 3,
}

export interface Transaction {
    amount: number;
    date: string;
    id: number;
    type: TransactionType;
    wallet_id: number;
    from_wallet_id: number;
}

export enum RegistrationType {
    AGENCY = 0,
    WITHDRAW = 1,
}

export interface RegistrationPayload {
    amount: number;
}

export interface Registration {
    id: number;
    account_id: number;
    type: RegistrationType;
    approved: boolean;
    created_at: string;
    payload: null | RegistrationPayload;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    thumbnail: string;
    created_at: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
