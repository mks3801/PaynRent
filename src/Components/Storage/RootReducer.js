
const initialState={
  booking:{},
  userdetails:{},
  vehicle:{}
}

export default function RootReducer(state=initialState,actions)
{
   switch(actions.type){
     
    case "ADD_BOOKING":
      console.log("ADD_booking",actions)
          state.booking=actions.payload
          return  ({vehicle:state.vehicle,booking:state.booking,userdetails:state.userdetails})
    
    case "ADD_USER":
          state.userdetails[actions.payload[0]]=actions.payload[1] 
          return ({vehicle:state.vehicle,booking:state.booking,userdetails:state.userdetails})

    case "ADD_VEHICLE":
          console.log("ADD_VEHICLE",actions)
          state.vehicle[actions.payload[0]]=actions.payload[1]  
          return ({vehicle:state.vehicle,booking:state.booking,userdetails:state.userdetails})
          
          default: return state
   }
}