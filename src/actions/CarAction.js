import axios from "axios";

export const GET_LIST_CAR = "GET_LIST_CAR";
export const GET_LIST_CAR_SUCCESS = "GET_LIST_CAR_SUCCESS";
export const GET_LIST_CAR_FAILURE = "GET_LIST_CAR_FAILURE";
export const FILTERED_CARS = "FILTERED_CARS"
export const GET_DETAIL_CAR = "GET_DETAIL_CAR"


export const getListCars = () => {
    return (dispatch) => {
        dispatch({
            type: GET_LIST_CAR,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json',
            timeout: 120000
        })
            .then((response) => {
                dispatch({
                    type: GET_LIST_CAR,
                    payload: {
                        loading: false,
                        data: response.data.data,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: GET_LIST_CAR,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.message
                    }
                })
            })
    }
}

export const getFilteredCar = (param) => {
    const { reset } = param

    if (reset) {
        return (dispatch) => {
            dispatch({
                type: FILTERED_CARS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: false
                }
            })
        }
    }

    return (dispatch) => {
        dispatch({
            type: FILTERED_CARS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json',
            timeout: 120000
        })
            .then((response) => {
                const { driver } = param

                const filter = response.data.data.filter((car) => car.available === driver)

                dispatch({
                    type: FILTERED_CARS,
                    payload: {
                        loading: false,
                        data: filter,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: FILTERED_CARS,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.message
                    }
                })
            })
    }
}

export const getDetailCar = (param) => {
    return (dispatch) => {
        dispatch({
            type: GET_DETAIL_CAR,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json',
            timeout: 120000
        })
            .then((response) => {
                const { carId } = param
                
                const detail = response.data.data.filter((car) => car.id === carId)

                dispatch({
                    type: GET_DETAIL_CAR,
                    payload: {
                        loading: false,
                        data: detail,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: GET_DETAIL_CAR,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.message
                    }
                })
            })
    }
}