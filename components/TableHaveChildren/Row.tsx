import React, { useState } from "react";
import { getDataGraphqlResult } from "../../utils";
import { apolloClient } from "../../utils/apollo";
import { GET_REFEREES } from "../../utils/apollo/queries/account.queries";

interface UserInfo {
    traits: string;
}

export interface RefereeRecord {
    id: string;
    ory_id: string;
    name: string;
    user_info: UserInfo;
    created_at: string;
    referees: RefereeRecord[];
}

interface Props {
    level: number;
    referee: RefereeRecord;
    // name: string;
    // refereeChildren: RefereeRecord[];
}

function Row(props: Props) {
    const { level, referee } = props;
    const haveChild = referee.referees ? referee.referees.length > 0 : false;

    const [childrenWithKids, setChildrenWithKids] = useState(referee.referees);

    const [toggled, setToggled] = useState(false);

    const toggle = async () => {
        if (!toggled) {
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
        }
        setToggled(!toggled);
    };

    const traits:any = referee.user_info.traits
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
                <td>
                    {traits.email}
                </td>
                <td>
                    {String(
                        new Date(referee.created_at).toLocaleDateString("vi-VN")
                    )}
                </td>
                <td>20,000đ</td>
                <td className="">{childrenWithKids.length}</td>
            </tr>
            {toggled && (
                <>
                    {childrenWithKids.map((child, i) => (
                        <Row key={i} level={level + 1} referee={child} />
                    ))}
                </>
            )}
        </>
    );
}

export default Row;
