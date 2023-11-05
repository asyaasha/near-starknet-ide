import * as ToastPrimitive from '@radix-ui/react-toast';
import styled from 'styled-components';

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
