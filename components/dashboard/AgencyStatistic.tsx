import React from "react";
import { Transaction } from "../../types/global";
import {
    AGENCY_PRICE,
    CARD_PRICE,
    formatMoney,
    PERCENT_AGENCY,
    PERCENT_NON_AGENCY,
} from "../../utils";

interface Props {
    agencyTree: any[] | null;
    withdrawTransactions: Transaction[] | null;
    isAgency: boolean
}

function AgencyStatistic({ agencyTree, withdrawTransactions, isAgency }: Props) {
    const totalCardIncome = agencyTree
        ? agencyTree
              .filter((item, i) => i !== 0)
              .reduce((previousValue: any, currentValue: any, i) => {
                  const percent = isAgency ? PERCENT_AGENCY[i] : PERCENT_NON_AGENCY
                  return (
                      previousValue +
                      currentValue.length * CARD_PRICE * percent
                  );
              }, 0)
        : 0;

    const totalAgencyIncome = agencyTree
        ? agencyTree
              .filter((item, i) => i !== 0)
              .reduce((previousValue: any, currentValue: any, i) => {
                  const numAgency = currentValue.reduce(
                      (previousValue: any, currentValue: any) => {
                          if (currentValue.is_agency) {
                              return previousValue + 1;
                          }
                          return previousValue;
                      },
                      0
                  );
                  const percent = isAgency ? PERCENT_AGENCY[i] : PERCENT_NON_AGENCY
                  return (
                      previousValue +
                      numAgency * AGENCY_PRICE * percent
                  );
              }, 0)
        : 0;

    const totalWithdraw = withdrawTransactions
        ? withdrawTransactions.reduce(
              (previousValue: any, currentValue: any, i) => {
                  return previousValue + currentValue.amount;
              },
              0
          )
        : 0;

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">C???p</th>
                        <th scope="col">S??? kh??ch h??ng</th>
                        <th scope="col">S??? ?????i l??</th>
                        <th scope="col">% hoa h???ng</th>
                        <th scope="col">Ti???n th???</th>
                        <th scope="col">Ti???n ?????i l??</th>
                    </tr>
                </thead>
                <tbody>
                    {agencyTree &&
                        agencyTree
                            .filter((item, i) => i !== 0)
                            .map((itemLevel, i: number) => {
                                const numAgency = itemLevel.reduce(
                                    (previousValue: any, currentValue: any) => {
                                        if (currentValue.is_agency) {
                                            return previousValue + 1;
                                        }
                                        return previousValue;
                                    },
                                    0
                                );
                                const percent = isAgency ? PERCENT_AGENCY[i] : PERCENT_NON_AGENCY
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{itemLevel.length}</td>
                                        <td>{numAgency}</td>
                                        <td>{percent * 100} %</td>
                                        <td>
                                            {formatMoney(
                                                itemLevel.length *
                                                    CARD_PRICE *
                                                    percent
                                            )}
                                        </td>
                                        <td>
                                            {formatMoney(
                                                numAgency *
                                                    AGENCY_PRICE *
                                                    percent
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                </tbody>
                {agencyTree && (
                    <tfoot>
                        <tr>
                            <th id="total" colSpan={4}>
                                T???ng c???ng sau r??t:
                            </th>
                            <td>
                                {formatMoney(
                                    totalCardIncome + totalAgencyIncome
                                )}{" "}
                                - {formatMoney(totalWithdraw)} ={" "}
                            </td>
                            <td>
                                {formatMoney(
                                    totalCardIncome +
                                        totalAgencyIncome -
                                        totalWithdraw
                                )}
                            </td>
                        </tr>
                    </tfoot>
                )}
                {agencyTree && (
                    <tfoot>
                        <tr>
                            <th id="total" colSpan={4}>
                                T???ng c???ng :
                            </th>
                            <td>{formatMoney(totalCardIncome)}</td>
                            <td>{formatMoney(totalAgencyIncome)}</td>
                        </tr>
                    </tfoot>
                )}
                {agencyTree && (
                    <tfoot>
                        <tr>
                            <th id="total" colSpan={4}>
                                T???ng c???ng :
                            </th>
                            <td>
                                {formatMoney(totalCardIncome)} +{" "}
                                {formatMoney(totalAgencyIncome)} ={" "}
                            </td>
                            <td>
                                {formatMoney(
                                    totalCardIncome + totalAgencyIncome
                                )}
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
}

export default AgencyStatistic;
