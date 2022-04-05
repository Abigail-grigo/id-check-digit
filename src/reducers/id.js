const idReducer = (state = [], action) => {
    switch (action.type) {
        case 'SETID':
            state[action.index] = action.number
            return state;
        default:
            return state;

    }
}

export default idReducer;