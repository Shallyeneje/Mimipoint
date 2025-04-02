export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    sex: string;
    avatar: string;
    isOauth: boolean;
    Oauthprovider: string;
    emailIsVerified: boolean;
  };