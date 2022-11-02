import { GET_LIST_CAR, FILTERED_CARS, GET_DETAIL_CAR } from '../../actions/CarAction'

const initialState = {
    getListCarsResult: false,
    getListCarsLoading: false,
    getListCarsError: false,

    filteredCarsResult: false,
    filteredCarsLoading: false,
    filteredCarsError: false,

    getDetailCarResult: false,
    getDetailCarLoading: false,
    getDetailCarError: false,
}

const cars = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_CAR:
            return {
                ...state,
                getListCarsResult: action.payload.data,
                getListCarsLoading: action.payload.loading,
                getListCarsError: action.payload.errorMessage
            }
        case FILTERED_CARS:
            return {
                ...state,
                filteredCarsResult: action.payload.data,
                filteredCarsLoading: action.payload.loading,
                filteredCarsError: action.payload.errorMessage
            }
        case GET_DETAIL_CAR:
            return {
                ...state,
                getDetailCarResult: action.payload.data,
                getDetailCarLoading: action.payload.loading,
                getDetailCarError: action.payload.errorMessage
            }
        default:
            return state
    }
}

export default cars;