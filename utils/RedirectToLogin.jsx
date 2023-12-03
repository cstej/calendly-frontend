const redirectToLogin = ({ req, res, query }) => {
    
    try {
        const {authToken} = req.cookies;
        const decodedToken = (authToken ? jwt_decode(authToken) :  {})
        if (authToken && decodedToken.verified)  {
           return null
        }
       
        return {
            redirect: {
                permanent: false,
                destination: `/login`
            }
        };
         
    } catch (error) {
        // eslint-disable-next-line
        
    }
}

export default redirectToLogin;