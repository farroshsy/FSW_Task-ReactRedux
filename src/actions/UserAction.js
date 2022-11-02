export const GET_USER_DATA = "GET_USER_DATA";
export const POST_USER_DATA = "POST_USER_DATA";
export const PUT_USER_DATA = "PUT_USER_DATA";
export const DELETE_USER_DATA = "DELETE_USER_DATA";

export function getUserData(data) {
    return (dispatch) => {

        dispatch({
            type: GET_USER_DATA,
            payloads: {
                loading: true,
                data: false,
                errMsg: false
            }
        })

        if(data){
            dispatch({
                type: GET_USER_DATA,
                payloads: {
                    loading: false,
                    data: data,
                    errMsg: false
                }
            })
        }else{
            dispatch({
                type: GET_USER_DATA,
                payloads: {
                    loading: false,
                    data: {},
                    errMsg: false
                }
            })
        }

    }
}