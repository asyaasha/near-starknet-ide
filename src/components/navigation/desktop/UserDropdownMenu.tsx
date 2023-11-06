import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

export const UserDropdownMenu = () => {
  const accountId = useAuthStore((store) => store.accountId);
  const availableStorage = useAuthStore((store) => store.availableStorage);
  const logOut = useAuthStore((store) => store.logOut);
  const near = useVmStore((store) => store.near);
  const router = useRouter();
  const components = useBosComponents();

  const withdrawStorage = useCallback(async () => {
    if (!near) return;
    await near.contract.storage_withdraw({}, undefined, '1');
  }, [near]);

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <VmComponent
            src={components.profileImage}
            props={{
              accountId,
              className: 'd-inline-block',
            }}
          />
          <div className="profile-info">
            <div className="profile-name">
              <VmComponent src={components.profileName} />
            </div>
            <div className="profile-username">{accountId}</div>
          </div>
          <i className="ph ph-caret-down"></i>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={-5}>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={() => router.push(`/${components.profilePage}?accountId=${accountId}`)}
          >
            <i className="ph-duotone ph-user"></i>
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" onClick={() => withdrawStorage()}>
            <i className="ph-duotone ph-bank"></i>
            {availableStorage && `Withdraw ${availableStorage.div(1000).toFixed(2)}kb`}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" onClick={() => logOut()}>
            <i className="ph-duotone ph-sign-out"></i>
            Sign out
          </DropdownMenu.Item>

          <DropdownMenu.Arrow style={{ fill: '#161615' }} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
