import BunqErrorHandler from "~functions/BunqErrorHandler";
import MasterCardAction from "~models/MasterCardAction";

import { masterCardActionsSetInfo } from "./master_card_actions";

export function masterCardActionSetInfo(master_card_action_info, account_id, master_card_action_id) {
    return {
        type: "MASTER_CARD_ACTION_INFO_SET_INFO",
        payload: {
            master_card_action_info: master_card_action_info,
            master_card_action_id: master_card_action_id,
            account_id: account_id
        }
    };
}

export function masterCardActionInfoLoading() {
    return { type: "MASTER_CARD_ACTION_INFO_IS_LOADING" };
}

export function masterCardActionInfoNotLoading() {
    return { type: "MASTER_CARD_ACTION_INFO_IS_NOT_LOADING" };
}

export function masterCardActionInfoClear() {
    return { type: "MASTER_CARD_ACTION_INFO_CLEAR" };
}

export function masterCardActionInfoUpdate(user_id, account_id, master_card_action_id) {
    const failedMessage = window.t("We failed to load the mastercard payment information");
    const BunqJSClient = window.BunqDesktopClient.BunqJSClient;

    return dispatch => {
        dispatch(masterCardActionInfoLoading());
        BunqJSClient.api.masterCardAction
            .get(user_id, account_id, master_card_action_id)
            .then(masterCardAction => {
                const masterCardActionInfo = new MasterCardAction(masterCardAction);

                // update this item in the list and the stored data
                dispatch(masterCardActionsSetInfo([masterCardActionInfo], parseInt(account_id), false));

                dispatch(masterCardActionSetInfo(masterCardActionInfo, parseInt(account_id), master_card_action_id));
                dispatch(masterCardActionInfoNotLoading());
            })
            .catch(error => {
                dispatch(masterCardActionInfoNotLoading());
                BunqErrorHandler(dispatch, error, failedMessage);
            });
    };
}

