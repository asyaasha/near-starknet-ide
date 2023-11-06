import * as ToastPrimitive from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';

const hideAnimation = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideInAnimation = keyframes`
  from { transform: translateX(calc(100% + 1rem)) }
  to { transform: translateX(0) }
`;

const swipeOutAnimation = keyframes`
  from { transform: translateX(var(--radix-toast-swipe-end-x)) }
  to { transform: translateX(calc(100% + 1rem)) }
`;

export const Viewport = ToastPrimitive.Viewport;

export const Root = ToastPrimitive.Root;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0rem;
`;

export const Title = ToastPrimitive.Title;
export const Description = ToastPrimitive.Description;

export const CloseButton = ToastPrimitive.Close;
