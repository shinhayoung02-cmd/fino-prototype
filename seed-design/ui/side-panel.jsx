/**
 * @file ui:side-panel
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import IconXmarkLine from "@karrotmarket/react-monochrome-icon/IconXmarkLine";
import { Icon, SidePanel as SeedSidePanel } from "@seed-design/react";
import { forwardRef } from "react";

/**
 * @see https://seed-design.io/react/components/side-panel
 */
export const SidePanelRoot = SeedSidePanel.Root;

export const SidePanelTrigger = SeedSidePanel.Trigger;

export const SidePanelContent = forwardRef(
  ({ children, title, description, layerIndex, showCloseButton = true, ...otherProps }, ref) => {
    if (
      !title &&
      !otherProps["aria-labelledby"] &&
      !otherProps["aria-label"] &&
      process.env.NODE_ENV !== "production"
    ) {
      console.warn(
        "SidePanelContent: aria-labelledby or aria-label should be provided if title is not provided."
      );
    }

    const shouldRenderHeader = title || description || showCloseButton;

    return (
      <SeedSidePanel.Positioner
        style={{
          "--layer-index": layerIndex
        }}>
        <SeedSidePanel.Backdrop />
        <SeedSidePanel.Content ref={ref} {...otherProps}>
          {shouldRenderHeader && (
            <SeedSidePanel.Header>
              {title && <SeedSidePanel.Title>{title}</SeedSidePanel.Title>}
              {description && <SeedSidePanel.Description>{description}</SeedSidePanel.Description>}
              {showCloseButton && (
                <SeedSidePanel.CloseButton aria-label="닫기">
                  <Icon svg={<IconXmarkLine />} />
                </SeedSidePanel.CloseButton>
              )}
            </SeedSidePanel.Header>
          )}
          {children}
        </SeedSidePanel.Content>
      </SeedSidePanel.Positioner>
    );
  }
);

SidePanelContent.displayName = "SidePanelContent";

export const SidePanelBody = SeedSidePanel.Body;

export const SidePanelFooter = SeedSidePanel.Footer;

/**
 * This file is a snippet from SEED Design, helping you get started quickly with @seed-design/* packages.
 * You can extend this snippet however you want.
 */
