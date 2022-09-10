const initialData = {       //Creating cars array empty initially
    bookings : []
};

export const bookingsReducer = (state=initialData, action)=>{

    switch(action.type)
    {
        case 'GET_ALL_BOOKINGS' : {
            return{
                ...state,       //returning state
                bookings : action.payload       //updating cars with action.payload
            }
        }
        default: return state
    }
}
