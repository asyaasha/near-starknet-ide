import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';

import type { MutableRefObject } from 'react';

const AuthCallbackPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState('Loading...');
  const { redirect } = useSignInRedirect();
  const pendingSignInRef: MutableRefObject<null | Promise<void>> = useRef(null);

  useEffect(() => {
  }, []); // DEC-1294 leaving dependencies empty to ensure the effect runs only once

  return <StyledStatusMessage>{statusMessage}</StyledStatusMessage>;
};

AuthCallbackPage.getLayout = useDefaultLayout;

export default AuthCallbackPage;

const StyledStatusMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
`;
