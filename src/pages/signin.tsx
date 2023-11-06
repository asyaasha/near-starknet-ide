import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';


const SignInPage: NextPageWithLayout = () => {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);
  const signedIn = useAuthStore((store) => store.signedIn);
  const { redirect } = useSignInRedirect();

  useClearCurrentComponent();

  useEffect(() => {
    if (signedIn) {
      redirect();
    }
  }, [redirect, signedIn]);


  return (
    <StyledContainer>
      <FormContainer>
        <header>
          <h1>{'Sign In'}</h1>
          <p className="desc">Use this account to sign in everywhere on NEAR, no password required.</p>
        </header>

        <Button type="submit" label="Continue" variant="affirmative" onClick={onSubmit} />
        <Button type="button" label="Continue with wallet" variant="primary" onClick={requestSignInWithWallet} />
      </FormContainer>
    </StyledContainer>
  );
};
SignInPage.getLayout = useDefaultLayout;

export default SignInPage;

const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f1ea;
  padding: 0 16px;
`;

const FormContainer = styled.form`
  max-width: 450px;
  width: 100%;
  margin: 16px auto;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    font-size: 12px;
    font-weight: 500;
  }

  input {
    padding: 8px 12px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    font-size: 14px;
    margin-top: 4px;
    min-height: 50px;
    cursor: text;

    &:focus {
      outline: none;
      border: 1px solid #e5e5e5;
    }
  }

  .subText {
    font-size: 12px;
  }
`;
