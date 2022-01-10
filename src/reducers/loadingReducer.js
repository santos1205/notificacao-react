import initialState from './initialState';

export default function funcionarioReducer(state = initialState.loading, action) {

    const { type } = action;
    const matches = /(.*)_(BEGIN_REQUEST|END_REQUEST|SUCCESS)/.exec(type);

    if (!matches) return state;

    let deveCarregar = /(.*)_(BEGIN_REQUEST)/.exec(type);
    let devePararDeCarregar = /(.*)_(END_REQUEST|SUCCESS)/.exec(type);
    if (deveCarregar) {
        return deveCarregar.length >= 0;
    } else if (devePararDeCarregar) {
        return !(devePararDeCarregar.length >= 0);
    }

    return state;
}