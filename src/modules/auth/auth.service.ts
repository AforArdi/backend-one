const userLogin = async (payload: any) => {
    const { email, password } = payload;

    return { email, password };
};
const userRegister = async (payload: any) => {
    const { name, email, password } = payload;

    return { name, email, password };
};

export const authService = {
    userRegister,
    userLogin
};
