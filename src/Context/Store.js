import jwtDecode from "jwt-decode";

const { createContext, useState, useEffect } = require("react");


export let GlobalStore = createContext(null);

function UserDataContextProvider(props) {

    const [openNav, setOpenNav] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [faveData, setFaveData] = useState({
        token: "",
        userID: ""
    });

    function checkIfLogin() {
        if (localStorage.getItem("Token") && localStorage.getItem("User_info")) {
            let token = userToken;
            token = localStorage.getItem("Token");
            setUserToken(token);

            let userInfo = userData ;
            userInfo = localStorage.getItem("User_info") ;
            setUserData(userInfo);
        }
    }

    function updateUserToken(dataToken) {
        let token = userToken;
        token = dataToken;
        setUserToken(token);
    }

    function updateUserData(userInfo) {
        let data = userData;
        data = userInfo;
        setUserData(data);
    }

    function favData(){
        let data = {...faveData};
        data.token = localStorage.getItem("Token") ;
        data.userID = jwtDecode(localStorage.getItem("Token"))._id ;
        setFaveData(data);
    }

    
    let toggelLogin = () => {
        let toggel = openNav;
        if (toggel === false) {
            toggel = true;
        } else {
            toggel = false;
        }
        setOpenNav(toggel);
    }

    function closeNave(){
        let close = openNav;
        close = false ;
        setOpenNav(close);
    }

    useEffect(() => {
        checkIfLogin() ;
        favData();
    }, [])


    return <GlobalStore.Provider value={{ userToken, userData, faveData, openNav ,updateUserToken, updateUserData , toggelLogin , closeNave}}>
        {props.children}
    </GlobalStore.Provider>
}

export default UserDataContextProvider;