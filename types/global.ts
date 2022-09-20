export enum ActiveRoute {
    USER_CV = "my-cv",
}

export enum AgencyType {
    AGENCY = "agency",
    COLABORATOR = "colaborator",
}

export interface Agency {
    id: string;
    join_at: string;
    type: AgencyType;
}

export enum ErpAccountStatus {
    CREATED = "created",
    APPROVED = "approved",
}

export interface ErpAccount {
    id: number;
    status: ErpAccountStatus;
    company_id: number;
    company_name: string;
    account: Account;
    created_at: string;
}
export interface Account {
    id: number;
    is_root: boolean;
    ory_id: string;
    email: string;
    erp_account: ErpAccount;
    resume: {
        id: number;
        path: string;
    };
    account_info: {
        id: number;
        name: string;
        avatar: string;
        phone: string;
        facebook: string;
        zalo: string;
        website: string;
        slide_text: string;
        description: string;
        bank_name: string;
        bank_number: string;
    };
    agency: Agency;
    user_info: {
        traits: string;
    };
    user_cv: null | {
        id: string;
        path: string;
    };
    created_at: string;
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
    SUCCESS = "success",
    FAILED = "failed",
}

export enum TransactionTypeEnum {
    REWARD_REFER = "reward-refer",
    REWARD_REFER_AGENCY = "reward-refer-agency",
    REWARD_REFER_COLABORATOR = "reward-refer-colaborator",
    TRANSFER = "transfer",
    PAYMENT = "payment",
    WITHDRAW = "withdraw",
    RECHARGE = "recharge",
}

export enum TransactionSourceType {
    ACCOUNT = "account",
    SYSTEM = "system",
}

export enum TransactionTargetType {
    ACCOUNT = "account",
    SYSTEM = "system",
    WITHDRAW = "withdraw",
}

export interface Referral {
    id: string;
    target_id: number;
    accountByTargetId: Account;
    referee_id: number;
    account: Account;
    referer_id: number;
    accountByRefererId: Account;
    level: number;
}

export interface Vendor {
    id: string;
    name: string;
}
export interface Transaction {
    amount: number;
    created_at: string;
    vendor: Vendor;
    order_id: string;
    id: string;
    source_id: number;
    account: Account; // source account
    target_id: number;
    accountByTargetId: Account;
    type: TransactionTypeEnum;
    referral: Referral | null;
    note: string;
}

export enum SecondaryTransactionType {
    DEFAULT = "default", // Thưởng CTV mới
    REWARD_NEW_AGENCY = "reward_new_agency", // Thưởng Đại lý mới
}

export interface SecondaryTransaction {
    amount: number;
    created_at: string;
    id: string;
    account_id: number;
    account: Account; // source account
    type: SecondaryTransactionType;
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
    SHIP = "ship",
    SELF_GET = "self-get",
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
    WALLET = "wallet",
    BANK_TRANSFER = "bank-transfer",
}

export interface OrderState {
    shipping: Shipping | null;
    paymentMethod: PaymentMethod | null;
}

export enum OrderStatus {
    CREATED = "created",
    PAID = "paid",
    SUCCESS = "success",
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

export interface Withdrawal {
    id: string;
    account_id: number;
    amount: number;
    created_at: string;
    account: Account;
    status: WithdrawalStatus;
}

export enum WithdrawalStatus {
    CREATED = "created",
    PENDING = "pending",
    SUCCESS = "success",
}

export enum BillInfoType {
    ELECTRIC = "electric",
}

export interface BillInfo {
    id: number;
    type: BillInfoType;
    payload: any;
    account: Account;
    created_at: string;
}

export interface ElectricBillInfo extends BillInfo {
    payload: {
        phone: string;
        billcode: string;
        provider: string;
    };
}

export enum RechargeRegisterStatus {
    CREATED = "created",
    ACCEPTED = "accepted",
    REFUSED = "refused",
}

export interface RechargeRegister {
    id: number;
    account: Account;
    account_id: number;
    amount: number;
    status: RechargeRegisterStatus;
    created_at: string;
}
