import {
    OrderStatus,
    TransactionTypeEnum,
    Wallet,
    WalletType,
    Transaction,
    AgencyType,
} from "../types/global";

export const getValueFromGraphql = (input: any) => {
    if (!input) {
        return input;
    }
    return input[Object.keys(input)[0]];
};

export const getDataGraphqlResult = (data: any) => {
    const key = Object.keys(data).length > 0 ? Object.keys(data)[0] : null;
    if (key) return data[key];
    return null;
};

export const formatMoney = (amount: number) => {
    var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(amount);
};

export const formatDateTime = (date: string, isHaveTime: boolean = true) => {
    const d = new Date(date);
    return `${isHaveTime ? `${String(d.toLocaleTimeString())}, ` : ""}${String(
        d.toLocaleDateString("vi-VN")
    )}`;
};

export const transactionMapping: any = {
    "reward-refer": "Doanh thu bán hàng",
    "1": "Thưởng người dùng mới",
    "reward-refer-agency": "Doanh thu đại lý",
    withdraw: "Rút tiền vào thẻ ngân hàng",
    "4": "Đặt hàng",
};

export const paddingId = (id: number) => {
    return String(id).padStart(6, "0");
};

// export const getWallet = (
//     wallets: Wallet[],
//     walletType: WalletType
// ): Wallet | null => {
//     let result = null;
//     wallets.forEach((wallet) => {
//         if (wallet.type === walletType) {
//             result = wallet;
//         }
//     });
//     return result;
// };

export const CARD_PRICE = 300000;
export const AGENCY_PRICE = 2000000;
export const PERCENT_NON_AGENCY = 0.2;
export const PERCENT_AGENCY: { [x: number]: number } = {
    0: 0.25,
    1: 0.1,
    2: 0.05,
    3: 0.03,
    4: 0.02,
    5: 0.01,
    6: 0.01,
    7: 0.01,
    8: 0.01,
    9: 0.01,
    10: 0.01,
    11: 0.01,
    12: 0.01,
    13: 0.01,
    14: 0.01,
    15: 0.01,
    16: 0.01,
    17: 0.01,
    18: 0.01,
    19: 0.01,
    20: 0.01,
};

export const BANK_ACCOUNT = {
    BANK_NAME: "Vietinbank",
    BANK_NUMBER: "106881678989",
    BANK_ACCOUNT_NAME: "Lê Thị Nguyệt",
    BANK_BRANCH: "",
};

export const ORDER_STATUS_MAPPING: {
    [x in OrderStatus]: string;
} = {
    [OrderStatus.CREATED]: "Chờ xác nhận",
    [OrderStatus.PAID]: "Đã thanh toán",
    [OrderStatus.SUCCESS]: "Thành công",
};

export const AGENCY_NAME = {
    [AgencyType.AGENCY]: "Đại lý",
    [AgencyType.COLABORATOR]: "Cộng tác viên",
}

export const getTransactionName = (
    transaction: Transaction | null,
    account_id?: number
) => {
    if (!transaction || !account_id) return "N/A";
    if (transaction.type === TransactionTypeEnum.WITHDRAW) {
        return "Rút tiền";
    }
    if (transaction.type === TransactionTypeEnum.REWARD_REFER) {
        if (transaction.source_id === account_id) return "Trả doanh thu thẻ";
        return "Doanh thu thẻ";
    }
    if (transaction.type === TransactionTypeEnum.REWARD_REFER_AGENCY) {
        if (transaction.source_id === account_id) return "Trả doanh đại lý";
        return "Doanh thu đại lý";
    }
    if (transaction.type === TransactionTypeEnum.REWARD_REFER_COLABORATOR) {
        if (transaction.source_id === account_id) return "Trả doanh cộng tác viên";
        return "Doanh thu cộng tác viên";
    }
    if (transaction.type === TransactionTypeEnum.PAYMENT) {
        if (transaction.source_id === account_id) return "Thanh toán đơn hàng";
        return "Doanh thu bán hàng";
    }
    if (transaction.type === TransactionTypeEnum.TRANSFER) {
        if (transaction.source_id === account_id)
            return "Chuyển tiền đến " + transaction.accountByTargetId.email;
        return "Nhận tiền từ " + `${transaction.account.is_root ? "Hệ thống" : transaction.account.email}`;
    }
    if (transaction.type === TransactionTypeEnum.RECHARGE) {
        return "Nạp tiền";
    }
};

export const defaultImg =
    "https://long-space.sgp1.digitaloceanspaces.com/smartcard/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpeg";
