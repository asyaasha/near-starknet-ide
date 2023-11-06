import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/auth';
import { recordMouseEnter } from '@/utils/analytics';

import { CurrentComponent } from '../CurrentComponent';
import { navLinkData } from '../org-links';

const ListItem = forwardRef<
  HTMLAnchorElement,
  { className?: string; children: ReactNode; title: string; route?: string; href?: string }
>(({ className, children, title, ...props }, forwardedRef) => {
  if (props.route) {
    return (
      <li onMouseEnter={recordMouseEnter}>
        <NavigationMenu.Link asChild>
          <Link href={props.route} className={classNames('ListItemLink', className)}>
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </Link>
        </NavigationMenu.Link>
      </li>
    );
  } else {
    return (
      <li onMouseEnter={recordMouseEnter}>
        <NavigationMenu.Link asChild>
          <a
            className={classNames('ListItemLink', className)}
            {...props}
            ref={forwardedRef}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </a>
        </NavigationMenu.Link>
      </li>
    );
  }
});
ListItem.displayName = 'ListItem';

export const MainNavigationMenu = () => {
  const signedIn = useAuthStore((store) => store.signedIn);

  return (
    <div>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          {signedIn && (
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link className="NavigationMenuLink" href="/">
                  Home
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          )}

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" onMouseEnter={recordMouseEnter}>
              Develop
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent develop">
              <CurrentComponent />
              <ul className="List one">
                <ListItem route={navLinkData.sandbox.link} title={navLinkData.sandbox.title}>
                  <i className="ph-duotone ph-code-block"></i>
                  {navLinkData.sandbox.description}
                </ListItem>
                <ListItem href={navLinkData.documentation.link} title={navLinkData.documentation.title}>
                  <i className="ph-duotone ph-book-open-text"></i>
                  {navLinkData.documentation.description}
                </ListItem>
                <ListItem route={navLinkData.tutorials.link} title={navLinkData.tutorials.title}>
                  <i className="ph-duotone ph-video"></i>
                  {navLinkData.tutorials.description}
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" onMouseEnter={recordMouseEnter}>
              Connect
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List two">
                <ListItem title={navLinkData.people.title} route={navLinkData.people.link}>
                  <i className="ph-duotone ph-user-list"></i>
                  {navLinkData.people.description}
                </ListItem>
                <ListItem title={navLinkData.ecosystem.title} route={navLinkData.ecosystem.link}>
                  <i className="ph-duotone ph-globe-hemisphere-west"></i>
                  {navLinkData.ecosystem.description}
                </ListItem>
                <ListItem title={navLinkData.events.title} route={navLinkData.events.link}>
                  <i className="ph-duotone ph-calendar-blank"></i>
                  {navLinkData.events.description}
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </div>
  );
};
