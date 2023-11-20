export const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,48}$/;
    return emailRegex.test(email);
};
export const validatePassword = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]).{8,15}$/;
    return passwordRegex.test(password);
};



