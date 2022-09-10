const initialData = {       //Creating cars array empty initially
    cars : []
};

export const carsReducer = (state=initialData, action)=>{

    switch(action.type)
    {
        case 'GET_ALL_CARS' : {
            return{
                ...state,       //returning state
                cars : action.payload       //updating cars with action.payload
            }
        }
        default: return state
    }
}
