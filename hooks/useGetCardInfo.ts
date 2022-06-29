import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { CardInfo } from "../types/global";
import { getValueFromGraphql } from "../utils";
import { GET_CARD } from "../utils/apollo/queries/card.queries";

function useGetCardInfo(
    cardId: string | string[] | undefined
): [CardInfo | null, boolean] {
    const [getCard, { loading, error, data }] = useLazyQuery(GET_CARD);

    const cardInfo: CardInfo | null = getValueFromGraphql(data);

    useEffect(() => {
        if (cardId) {
            getCard({
                variables: {
                    id: cardId,
                },
            });
        }
    }, [cardId]);

    return [cardInfo, loading];
}

export default useGetCardInfo;
