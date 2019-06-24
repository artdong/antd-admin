import {UPDATE_USERLIST, CLEAN_USERLIST} from '../actions/user.js';

//初始化state
const INIT_STATE = {
    content: [],
    // page: 1,
    pageSize: 10,
    total: 0
};

export default function(state = INIT_STATE, action) {
    let content = [];
    switch (action.type) {
    case UPDATE_USERLIST:
        if(!action.data) return state;
        content = action.data.map(function(item, index) {
            return Object.assign({
                key: index
            }, item);
        });
        return Object.assign({}, state, {
            content
        }, { total: content.length});
    case CLEAN_USERLIST:
        return Object.assign({}, INIT_STATE);
    default:
        return state;
    }
}