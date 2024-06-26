export type userSessionType = {
  access_token: string;
  token_type: "bearer";
  expires_in: number; // 3600;
  expires_at: number; // 1719419703;
  refresh_token: string;
  user: userInfoType;
};

export type userInfoType = {
  id: string;
  aud: "authenticated";
  role: "authenticated";
  email: string;
  email_confirmed_at: string; // "2024-06-13T14:48:09.913803Z";
  phone: string; //"";
  confirmation_sent_at: string; // "2024-06-13T14:47:13.749866Z";
  confirmed_at: string; // "2024-06-13T14:48:09.913803Z";
  last_sign_in_at: string; // "2024-06-26T15:35:02.987038401Z";
  app_metadata: {
    provider: string; // "email";
    providers: string[]; // ["email"];
  };
  user_metadata: {
    email: string;
    email_verified: boolean; // false;
    phone_verified: boolean; // false;
    sub: string;
  };
  identities: [
    {
      identity_id: string;
      id: string;
      user_id: string;
      identity_data: {
        email: string;
        email_verified: boolean;
        phone_verified: boolean;
        sub: string;
      };
      provider: string; // "email";
      last_sign_in_at: string; // "2024-06-13T14:47:13.729627Z";
      created_at: string; // "2024-06-13T14:47:13.730401Z";
      updated_at: string; // "2024-06-13T14:47:13.730401Z";
      email: string; //
    }
  ];
  created_at: string; // "2024-06-13T14:47:13.705387Z";
  updated_at: string; // "2024-06-26T15:35:03.000043Z";
  is_anonymous: boolean; // false;
};
