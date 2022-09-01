export enum ActiveRoute {
    USER_CV = "my-cv",
}
export interface Account {
    id: number;
    ory_id: string;
    email: string;
    resume: {
        id: number;
        path: string;
    }
    account_info: {
        name: string;
        avatar: string;
        phone: string;
        facebook: string;
        zalo: string;
        website: string;
        slide_text: string;
        description: string;
    };
    is_agency: boolean;
    user_info: {
        traits: string;
    };
    user_cv: null | {
        id: string;
        path: string;
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
    balance: number;
    secondary_balance: number;
}
export enum TransactionStatusEnum {
    SUCCESS = 'success',
    FAILED = 'failed'
}

export enum TransactionTypeEnum {
    REWARD_REFER = 'reward-refer',
    REWARD_REFER_AGENCY = 'reward-refer-agency',
    TRANSFER = 'transfer',
    PAYMENT = 'payment',
    WITHDRAW = 'withdraw',
}

export enum TransactionSourceType {
    ACCOUNT = 'account',
    SYSTEM = 'system'
}

export enum TransactionTargetType {
    ACCOUNT = 'account',
    SYSTEM = 'system',
    WITHDRAW = 'withdraw',
}

export interface Transaction {
    amount: number;
    created_at: string;
    id: string;
    type: TransactionTypeEnum;
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

export enum ShippingOption {
    SHIP = 'ship',
    SELF_GET = 'self-get',
}

export interface Shipping {
    shippingOption: ShippingOption;
    payload: {
        name: string;
        phone: string;
        address: string;
    };
}

export enum PaymentMethod {
    WALLET = 'wallet',
    BANK_TRANSFER = 'bank-transfer',
}

export interface OrderState {
    shipping: Shipping | null;
    paymentMethod: PaymentMethod | null;
}

export enum OrderStatus {
    CREATED = 'created',
    PAID = 'paid',
    SUCCESS = 'success',
}

export interface OrderItem {
    product_id: number;
    quantity: number;
    product: Product;
}

export interface Order {
    id: number;
    status: OrderStatus;
    agency_id: number;
    shipping_type: ShippingOption;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    payment_type: PaymentMethod;
    order_items: OrderItem[];
    created_at: string;
    totalPrice?: number;
}
