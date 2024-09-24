interface SignupFormParams {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
    device_address: string;
    role_id: number;
}

interface SignupResponse {
    id: number;
    email: string;
    username: string;
    device_address: string;
    role_id: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    message: string;
}

interface ConfirmEmailParams {
    email: string;
    otp: string;
}