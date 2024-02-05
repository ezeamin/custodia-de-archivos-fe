// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

export interface API_PostLogin {
  token: string;
  shouldChangePass: boolean;
}

export interface API_PostRecoverPassword {
  email: string;
}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface Login extends API_PostLogin {}
export interface RecoverPassword extends API_PostRecoverPassword {}
