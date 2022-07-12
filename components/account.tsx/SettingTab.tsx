import Link from "next/link";
import React from "react";
import { Account } from "../../types/global";

interface Props {
    account: Account | undefined;
}

function SettingTab(props: Props) {
    const { account } = props;

    return (
        <div
            className="row single-section animate__animated animate__fadeInDown animate__delay-0-5s"
            style={{
                marginTop: "40px",
            }}
        >
            {!account?.is_agency && (
                <Link href={"/account/agency-register"}>
                    <button className="full-width-btn">
                        Kích hoạt làm đại lý
                    </button>
                </Link>
            )}
        </div>
    );
}

export default SettingTab;
