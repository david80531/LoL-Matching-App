const initloginformstate={
  userName:'',
  password:'',
  inputDanger:false,
  exist:  false,
  socket: null
}

export function loginForm(state= initloginformstate , action){
  switch (action.type) {
    case '@LOGIN_FORM/INPUT_USER':
      return{
        ...state,
        userName : action.userName
      }
    case '@LOGIN_FORM/INPUT_PASSWORD':
      return{
        ...state,
        password : action.password
      }
    case '@LOGIN_FORM/SET_INPUT_DANGER':
      return{
        ...state,
        inputDanger : true
      }
    case '@LOGIN_FORM/LOGIN_SUCCESS':
      return{
        ...state,
        userName : action.userName,
        password : action.password,
        socket: action.socket,
        exist : true
      }
    case '@/LOGIN_FORM/LOGIN_FAIL':
      return{
        ...state,
        exist : false
      }
    default:
      return state;
  }
}
