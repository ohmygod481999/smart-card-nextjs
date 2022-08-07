import React, { useState } from "react";
import { formatDateTime, getDataGraphqlResult } from "../../utils";
import { apolloClient } from "../../utils/apollo";
import { GET_REFEREES } from "../../utils/apollo/queries/account.queries";

interface UserInfo {
    traits: string;
}

export interface RefereeRecord {
    id: number;
    ory_id: string;
    name: string;
    user_info: UserInfo;
    created_at: string;
    agency_at: string;
    referees: RefereeRecord[];
    is_agency: boolean;
}

interface Props {
    level: number;
    referee: RefereeRecord;
    moreExpand?: boolean;
}

function Row(props: Props) {
    const { level, referee, moreExpand } = props;
    const haveChild = referee.referees ? referee.referees.length > 0 : false;
    const [toggleLoading, setToggleLoading] = useState(false);

    const [childrenWithKids, setChildrenWithKids] = useState(
        referee.referees ? referee.referees : []
    );

    const [toggled, setToggled] = useState(false);

    const toggle = async () => {
        if (!toggled) {
            if (moreExpand) {
                setToggleLoading(true);
                const childrenWithTheirKids = await Promise.all(
                    referee.referees.map(async (child) => {
                        const data = await apolloClient.query({
                            query: GET_REFEREES,
                            variables: {
                                ory_id: child.ory_id,
                            },
                        });
                        return getDataGraphqlResult(data.data)[0];
                    })
                );
                setChildrenWithKids(childrenWithTheirKids);
                setToggleLoading(false);
            }
        }
        setToggled(!toggled);
    };

    const traits: any = referee?.user_info?.traits
        ? JSON.parse(referee.user_info.traits)
        : {};

    return (
        <>
            <tr className={level > 0 ? "child-row" : ""}>
                {/* <th scope="row"></th> */}
                <td
                    className="togglable-td"
                    style={{
                        paddingLeft: level > 0 ? 25 * level : "auto",
                    }}
                >
                    {haveChild && (
                        <div className="togglable-td__btn">
                            <button
                                className="toggle-child-btn"
                                onClick={toggle}
                            >
                                {toggled ? "-" : "+"}
                            </button>
                        </div>
                    )}
                    <div className="togglable-td__name">
                        {referee.name || "N/A"}
                    </div>
                </td>
                <td>{traits.email}</td>
                <td>{formatDateTime(referee.created_at, false)}</td>
                <td>
                    {referee.is_agency ? (
                        <span
                            style={{
                                color: "#95cb28",
                            }}
                        >
                            Có
                        </span>
                    ) : (
                        "Không"
                    )}
                </td>
                <td>{referee.agency_at ? formatDateTime(referee.agency_at, false) : "N/A"}</td>
                <td className="">{childrenWithKids.length}</td>
            </tr>
            {toggleLoading && (
                <tr>
                    <td colSpan={4}>Loading...</td>
                </tr>
            )}
            {toggled && (
                <>
                    {childrenWithKids.map((child, i) => (
                        <Row
                            key={i}
                            level={level + 1}
                            referee={child}
                            moreExpand={moreExpand}
                        />
                    ))}
                </>
            )}
        </>
    );
}

export default Row;
