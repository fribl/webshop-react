

export const LoginButton = (user: any) => {
    if (user.firstname === "") return(
        <button> Login </button>
    ) 
    if (user) return(
        <button>Welcome, {user.firstname}</button>
    )
}