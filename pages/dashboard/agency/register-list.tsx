import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "../../../components/dashboard/LayoutDashboard";
import { formatDateTime, getDataGraphqlResult } from "../../../utils";
import { GET_AGENCY_REGISTRATIONS_ADMIN } from "../../../utils/apollo/queries/registration.queries";

function AgencyAdmin() {
    const [agencyRegisters, setAgencyRegisters] = useState<any>([]);
    const [loadingApprove, setLoadingApprove] = useState(false);

    const { data, loading, error, refetch } = useQuery(
        GET_AGENCY_REGISTRATIONS_ADMIN,
        {
            variables: {
                limit: 100,
                offset: 0,
            },
        }
    );

    // console.log(data, loading);
    useEffect(() => {
        if (!loading && data) {
            const _registrations = getDataGraphqlResult(data);
            console.log(_registrations);
            setAgencyRegisters(_registrations);
        }
    }, [data, loading]);

    const approveAgencyHandler = useCallback(async (agencyRegister: any) => {
        // return console.log(process.env.NEXT_PUBLIC_FILE_SERVER_URL);
        try {
            setLoadingApprove(true);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/agency/approve`,
                {
                    registrationId: agencyRegister.id,
                }
            );
            setLoadingApprove(false);
            if (res.data) {
                const { success } = res.data;
                if (success) {
                    refetch();
                }
            }
        } catch (err) {
            console.error(err);
        }

        // alert(agencyRegister.id);
    }, []);

    return (
        <LayoutDashboard>
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">
                        Danh s??ch ????ng k?? ?????i l??
                    </h1>
                    {/* <a
                        href="#"
                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    >
                        <i className="fas fa-download fa-sm text-white-50" />{" "}
                        Generate Report
                    </a> */}
                </div>
                <div className="row">
                    {/* Earnings (Monthly) Card Example */}
                    <div
                        className="col-xl-12 col-md-12 mb-4"
                        style={{
                            height: "60vh",
                            overflowY: "scroll",
                        }}
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">ID</th>
                                    <th scope="col">T??n</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">S??? ??i???n tho???i</th>
                                    <th scope="col">Ng??y ????ng k??</th>
                                    <th scope="col">???? l?? ?????i l??</th>
                                    <th scope="col">T??y ch???n</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agencyRegisters.map((agencyRegister: any) => (
                                    <tr key={agencyRegister.id}>
                                        <td>{agencyRegister.account.id}</td>
                                        <td>{agencyRegister.account.name}</td>
                                        <td>{agencyRegister.account.email}</td>
                                        <td>{agencyRegister.account.phone}</td>
                                        <td>
                                            {formatDateTime(
                                                agencyRegister.created_at,
                                                false
                                            )}
                                        </td>
                                        <td>{agencyRegister.account.is_agency ? "R???i" : "ch??a"}</td>
                                        <td>
                                            {!agencyRegister.approved && (
                                                <button
                                                    disabled={loadingApprove || agencyRegister.account.is_agency}
                                                    className="btn btn-sm btn-primary shadow-sm"
                                                    onClick={() =>
                                                        approveAgencyHandler(
                                                            agencyRegister
                                                        )
                                                    }
                                                >
                                                    Duy???t
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
}

export default AgencyAdmin;
