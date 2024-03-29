export enum ActiveRoute {
    USER_CV = "my-cv",
}
export interface Account {
    id: number;
    ory_id: string;
    name: string;
    avatar: string;
    phone: string;
    email: string;
    facebook: string;
    zalo: string;
    website: string;
    slide_text: string;
    description: string;
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
    PLACE_ORDER = 4,
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

export enum ShippingOption {
    SELF_GET = 0,
    SHIP = 1,
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
    BANK_TRANSFER = 0,
    SMARTCARD_WALLET = 1,
}

export interface OrderState {
    shipping: Shipping | null;
    paymentMethod: PaymentMethod | null;
}

export enum OrderStatus {
    CREATED = 0,
    APPROVE = 1,
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
