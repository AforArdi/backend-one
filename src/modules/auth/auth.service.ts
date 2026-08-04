const userRegister = async (payload: any) => {
    return payload;
};

const userLogin = async (payload: any) => {
    const { email, password } = payload;

    return { email, password };
};

export const authService = {
    userRegister,
    userLogin
};
