const initialData = {
    loading : false
};

export const alertsReducer=(state=initialData, action)=>{

    switch(action.type)
    {
        case'LOADING' : {       //We are going to determine whether the loading is true or not from the actions only. So whenever the api request 
            //is performed, first we ll show loading but after completion of api request we ll change it to false
            return{
                ...state,
                loading : action.payload
            }
        }
        default : return state 
    }
}