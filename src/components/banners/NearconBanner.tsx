import Image from 'next/image';
import styled from 'styled-components';

import { useBanner } from '@/hooks/useBanner';

type FlexProps = {
  gap?: string;
  alignItems?: string;
  justifyContent?: string;
  direction?: string;
  wrap?: string;
};

type TextProps = {
  size?: string;
  lineHeight?: string;
  weight?: string;
  color?: string;
};

const Wrapper = styled.div`
  background: #00ec97;

  .banner-button {
    font-size: 14px;

    &.desktop-button {
      @media (max-width: 380px) {
        display: inline !important;
      }
    }

    &.mobile-button {
      @media (max-width: 380px) {
        display: none !important;
      }
    }
  }
  .close-button {
    all: unset;
    width: 14px;
    height: 14px;
    line-height: 14px;
    color: #664d04;
    background: transparent;
    outline: none;
    border: none;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
      border: none;
      background: transparent;
    }
  }
`;

const Flex = styled.div<FlexProps>`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? 'row'};
  flex-wrap: ${(p) => p.wrap ?? 'nowrap'};

  @media (max-width: 576px) {
    gap: 10px;
  }
`;

const Text = styled.p<TextProps>`
  font-family: 'FK Grotesk', sans-serif;
  font-size: ${(p) => p.size ?? '18px'};
  line-height: ${(p) => p.lineHeight ?? '1.5'};
  font-weight: ${(p) => p.weight ?? '400'};
  color: ${(p) => p.color ?? '#000'};
  margin: 0;
`;

export const NearconBanner = () => {
  const [isBannerVisible, setBanners] = useBanner();

  const closeBanner = () => {
    setBanners(!isBannerVisible);
  };

  if (!isBannerVisible) return null;

  return (
    <Wrapper>
      <Flex gap="24px" alignItems="center" justifyContent="center">
        <Text size="16px" weight="500" className="d-none d-sm-inline">
          Starknet Hacker House 2023
        </Text>
      </Flex>
    </Wrapper>
  );
};
