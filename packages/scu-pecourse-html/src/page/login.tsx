import React, { useEffect, useState } from 'react';
import { AppProvider, SignInPage } from '@toolpad/core';
import { Typography, Button, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { login, isLogined, apiService } from '../utils';
import { useHistory } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const Login = () => {
  const theme = useTheme();

  const [showError, setShowError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isLogined()) {
      history.push('/choose');
    }
  }, []);

  return (
    <div className="login">
      <AppProvider theme={theme}>
        <SignInPage
          slots={{
            title: () => <Typography variant="h5">登录</Typography>,
            subtitle: () => <Typography>输入学号和密码</Typography>,
            rememberMe: () => null,
            submitButton: () => (
              <Button
                type="submit"
                variant="contained"
                color="info"
                fullWidth={true}
                sx={{ my: 2 }}
              >
                登录
              </Button>
            ),
          }}
          slotProps={{
            emailField: {
              label: '学号',
              placeholder: '',
              type: 'number',
              id: 'username',
              name: 'username',
              autoComplete: 'on',
            },
            passwordField: {
              label: '密码',
            },
          }}
          providers={providers}
          signIn={(provider, formData) => {
            const username = formData.get('username');
            const password = formData.get('password');
            login(username, password, (status) => {
              if (status) {
                history.push('/choose');
              } else {
                setShowError(true);
              }
            });
          }}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
          message="登录失败请重试"
        />
      </AppProvider>
    </div>
  );
};

export default Login;
