export const validateName = (name: string): boolean => {
    const nameRegex: RegExp = /^[A-Za-z\s]{3,50}$/;
    return nameRegex.test(name);
};
export const validateLastName = (lastName: string): boolean => {
    const lastNameRegex: RegExp = /^[A-Za-z\s]{5,80}$/;
    return lastNameRegex.test(lastName);
};
export const validateIdUser = (idUser: string): boolean => {
    const idRegex: RegExp = /^[XYZ0-9]\d{7}[A-Z]$/;
    return idRegex.test(idUser);
};
export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex: RegExp = /^\d{9}$/;
    return phoneRegex.test(phoneNumber);
};
export const validateBithday = (birthdate: string): boolean => {
    const birthRegex: RegExp = /^\d{4}$/;
    return birthRegex.test(birthdate);
};
export const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,48}$/;
    return emailRegex.test(email);
};
export const validatePassword = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]).{8,15}$/;
    return passwordRegex.test(password);
};



