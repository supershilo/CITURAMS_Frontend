const isAuthenticated = () =>{
    const email = sessionStorage.getItem('userEmail');
    return email !==null;
};

export {isAuthenticated};