/**
 * @file ui:attachment-field
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import * as React from "react";
import {
  Field as SeedField,
  AttachmentInput as SeedAttachmentInput,
  Icon,
  PrefixIcon,
  VisuallyHidden,
} from "@seed-design/react";
import { useFileUploadContext } from "@seed-design/react/primitive";
import {
  IconCameraFill,
  IconPaperclipFill,
  IconExclamationmarkCircleFill,
  IconArrowUpBracketDownFill,
  IconArrowClockwiseCircularFill,
  IconXmarkFill,
} from "@karrotmarket/react-monochrome-icon";

import { ActionButton } from "./action-button";
import { ProgressCircle } from "./progress-circle";
import { formatBytes } from "../lib/format-bytes";
import iconCameraAttach from "../../src/assets/lost-register/icon-camera-attach.svg";

// You may implement your own i18n for these labels
const LABEL_SELECT_FILE = "파일 선택";
const LABEL_DROP_FILE = "또는 여기로 드래그해서 업로드";
const LABEL_RETRY = "재시도";
const LABEL_REMOVE_FILE = "파일 제거";

/**
 * @see https://seed-design.io/react/components/attachment-field
 */
export const AttachmentField = React.forwardRef((
  {
    label,
    labelWeight,
    labelClassName,

    indicator,
    description,
    errorMessage,
    showRequiredIndicator,

    children,

    inputProps,
    fieldRef,
    rootProps,

    ...props
  },
  ref,
) => {
  const renderHeader = label || indicator;
  const renderDescription = !!description;
  const renderErrorMessage = errorMessage && props.invalid;
  const renderFooter = renderDescription || renderErrorMessage;

  if (process.env.NODE_ENV !== "production" && !label) {
    console.warn(
      "AttachmentField: Provide a `label` prop for better accessibility. This warning will not be shown in production builds."
    );
  }

  return (
    <SeedField.Root
      {...rootProps}
      name={props.name}
      disabled={props.disabled}
      required={props.required}
      invalid={props.invalid}
      readOnly={props.readOnly}
      ref={fieldRef}>
      {renderHeader && (
        <SeedField.Header>
          <SeedField.Label weight={labelWeight} className={labelClassName}>
            {label}
            {showRequiredIndicator && <SeedField.RequiredIndicator />}
            {indicator && <SeedField.IndicatorText>{indicator}</SeedField.IndicatorText>}
          </SeedField.Label>
          {/* You might want to put your custom element here */}
        </SeedField.Header>
      )}
      <SeedAttachmentInput.Root {...props}>
        {children}
        <SeedAttachmentInput.HiddenInput ref={ref} {...inputProps} />
      </SeedAttachmentInput.Root>
      {renderFooter && (
        <SeedField.Footer>
          {renderDescription &&
            (renderErrorMessage ? (
              <VisuallyHidden asChild>
                <SeedField.Description>{description}</SeedField.Description>
              </VisuallyHidden>
            ) : (
              <SeedField.Description>{description}</SeedField.Description>
            ))}
          {renderErrorMessage && (
            <SeedField.ErrorMessage>
              <PrefixIcon svg={<IconExclamationmarkCircleFill />} />
              {errorMessage}
            </SeedField.ErrorMessage>
          )}
        </SeedField.Footer>
      )}
    </SeedField.Root>
  );
});
AttachmentField.displayName = "AttachmentField";

export const AttachmentInput = React.forwardRef(({ children, onRetry }, ref) => {
  return (
    <SeedAttachmentInput.Container ref={ref}>
      <SeedAttachmentInput.Trigger aria-label={LABEL_SELECT_FILE}>
        <SeedAttachmentInput.TriggerIcon image={<IconCameraFill />} general={<IconPaperclipFill />} />
        <SeedAttachmentInput.TriggerItemCount />
      </SeedAttachmentInput.Trigger>
      <SeedAttachmentInput.ItemGroup>
        <SeedAttachmentInput.Context>
          {typeof children === "function"
            ? children
            : ({ acceptedFileEntries, updateFileEntryStatus }) =>
                acceptedFileEntries.map((fileEntry) => (
                  <AttachmentInputItem
                    key={fileEntry.id}
                    fileEntry={fileEntry}
                    {...(onRetry && {
                      onRetry: () => onRetry(fileEntry, { updateFileEntryStatus }),
                    })} />
                ))}
        </SeedAttachmentInput.Context>
      </SeedAttachmentInput.ItemGroup>
    </SeedAttachmentInput.Container>
  );
});
AttachmentInput.displayName = "AttachmentInput";

export const AttachmentDropzone = ({ children, onRetry }) => {
  const { triggerProps } = useFileUploadContext();

  return (
    <>
      <SeedAttachmentInput.Dropzone>
        <ActionButton variant="neutralWeak" size="small" layout="withText" {...triggerProps}>
          <PrefixIcon svg={<IconArrowUpBracketDownFill />} />
          {LABEL_SELECT_FILE}
        </ActionButton>
        <SeedAttachmentInput.DropzoneLabel>{LABEL_DROP_FILE}</SeedAttachmentInput.DropzoneLabel>
      </SeedAttachmentInput.Dropzone>
      <SeedAttachmentInput.Container>
        <SeedAttachmentInput.ItemGroup>
          <SeedAttachmentInput.Context>
            {typeof children === "function"
              ? children
              : ({ acceptedFileEntries, updateFileEntryStatus }) =>
                  acceptedFileEntries.map((fileEntry) => (
                    <AttachmentInputItem
                      key={fileEntry.id}
                      fileEntry={fileEntry}
                      {...(onRetry && {
                        onRetry: () => onRetry(fileEntry, { updateFileEntryStatus }),
                      })} />
                  ))}
          </SeedAttachmentInput.Context>
        </SeedAttachmentInput.ItemGroup>
      </SeedAttachmentInput.Container>
    </>
  );
};
AttachmentDropzone.displayName = "AttachmentDropzone";

/**
 * @see https://seed-design.io/react/components/attachment-field
 */
export const AttachmentInputItem = React.forwardRef(({ onRetry, onPreview, fileEntry, ...props }, ref) => {
  const { acceptType } = useFileUploadContext();

  const handlePreview = () => {
    if (onPreview && fileEntry?.file) onPreview(fileEntry);
  };

  return (
    <SeedAttachmentInput.Item
      ref={ref}
      fileEntry={fileEntry}
      {...props}
      {...(onPreview && { onClick: handlePreview, style: { cursor: "pointer" } })}
    >
      <SeedAttachmentInput.ItemImage />
      <SeedAttachmentInput.ItemThumbnail>
        <Icon svg={<IconPaperclipFill />} />
      </SeedAttachmentInput.ItemThumbnail>
      <SeedAttachmentInput.ItemMetadata>
        <SeedAttachmentInput.ItemName />
        <SeedAttachmentInput.ItemSize formatBytes={formatBytes} />
      </SeedAttachmentInput.ItemMetadata>
      <SeedAttachmentInput.ItemBackdrop status="uploading">
        {(entry) => (
          <ProgressCircle
            size="24"
            tone={acceptType === "image" ? "staticWhite" : "neutral"}
            {...("progress" in entry && { value: entry.progress })} />
        )}
      </SeedAttachmentInput.ItemBackdrop>
      {onRetry && (
        <SeedAttachmentInput.ItemBackdrop status="error">
          <SeedAttachmentInput.ItemActionButton onClick={onRetry}>
            <Icon svg={<IconArrowClockwiseCircularFill />} />
            {LABEL_RETRY}
          </SeedAttachmentInput.ItemActionButton>
        </SeedAttachmentInput.ItemBackdrop>
      )}
      <span onClick={(event) => event.stopPropagation()}>
        <SeedAttachmentInput.ItemRemoveButton aria-label={LABEL_REMOVE_FILE}>
          <Icon svg={<IconXmarkFill />} />
        </SeedAttachmentInput.ItemRemoveButton>
      </span>
    </SeedAttachmentInput.Item>
  );
});
AttachmentInputItem.displayName = "AttachmentInputItem";

/**
 * Prototype-only variant: tapping the trigger appends the next preset sample photo
 * instead of opening the native OS file picker. Reuses SEED's item/remove-button UI.
 */
export const AttachmentInputPreset = React.forwardRef(({ samples, triggerClassName, countClassName, pickerOptions, onPick, disabled }, ref) => {
  return (
    <SeedAttachmentInput.Container ref={ref}>
      <PresetTrigger
        samples={samples}
        className={triggerClassName}
        countClassName={countClassName}
        pickerOptions={pickerOptions}
        onPick={onPick}
        disabled={disabled}
      />
      <SeedAttachmentInput.ItemGroup>
        <SeedAttachmentInput.Context>
          {({ acceptedFileEntries }) =>
            acceptedFileEntries.map((fileEntry) => (
              <AttachmentInputItem key={fileEntry.id} fileEntry={fileEntry} />
            ))}
        </SeedAttachmentInput.Context>
      </SeedAttachmentInput.ItemGroup>
    </SeedAttachmentInput.Container>
  );
});
AttachmentInputPreset.displayName = "AttachmentInputPreset";

const PICKER_TOP_INSET = 88; // status bar (44px) + app header (44px)

function PresetTrigger({ samples = [], className, countClassName, pickerOptions, onPick, disabled: disabledProp }) {
  const { setFileEntries, currentFileEntryCount, maxFiles, stateProps } = useFileUploadContext();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [sheetHeight, setSheetHeight] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const heightRef = React.useRef(0);
  const fullHeightRef = React.useRef(0);
  const dragStartRef = React.useRef({ y: 0, height: 0 });

  const nextSample = samples[currentFileEntryCount];
  const disabled = disabledProp || currentFileEntryCount >= maxFiles || (!nextSample && !pickerOptions);

  const attach = async (sample) => {
    const file = await sampleUrlToFile(sample.url, sample.name);
    setFileEntries([file]);
  };

  const setHeight = (h) => {
    heightRef.current = h;
    setSheetHeight(h);
  };

  const openPicker = () => {
    const full = window.innerHeight - PICKER_TOP_INSET;
    fullHeightRef.current = full;
    setSelected(null);
    setHeight(full * 0.5);
    setPickerOpen(true);
  };

  const closePicker = () => {
    setPickerOpen(false);
    setSelected(null);
    setIsDragging(false);
  };

  const handleClick = async () => {
    if (pickerOptions) {
      openPicker();
      return;
    }
    if (!nextSample) return;
    await attach(nextSample);
  };

  const handlePick = async (option) => {
    setSelected(option);
    await attach(option);
    onPick?.(option);
    closePicker();
  };

  const handleDragStart = (event) => {
    dragStartRef.current = { y: event.clientY, height: heightRef.current };
    setIsDragging(true);
  };

  React.useEffect(() => {
    if (!isDragging) return undefined;
    const full = fullHeightRef.current;
    const half = full * 0.5;
    const min = full * 0.25;
    const clamp = (h) => Math.min(full, Math.max(min, h));
    const handleMove = (event) => {
      const dy = dragStartRef.current.y - event.clientY;
      setHeight(clamp(dragStartRef.current.height + dy));
    };
    const handleUp = () => {
      setIsDragging(false);
      if (heightRef.current < half * 0.7) {
        closePicker();
        return;
      }
      setHeight(heightRef.current > (half + full) / 2 ? full : half);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const renderGridItem = (option) => {
    const isSelected = selected?.label === option.label;
    return (
      <button
        key={option.label}
        type="button"
        onClick={() => handlePick(option)}
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          border: "none",
          padding: 0,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <img src={option.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {selected && !isSelected && (
          <span style={{ position: "absolute", inset: 0, background: "rgba(255, 255, 255, 0.55)" }} />
        )}
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 20,
            height: 20,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isSelected ? "#ff6600" : "rgba(255, 255, 255, 0.85)",
            border: isSelected ? "none" : "1.5px solid rgba(0, 0, 0, 0.15)",
            boxSizing: "border-box",
          }}
        >
          {isSelected && <span style={{ color: "#ffffff", fontSize: 12, lineHeight: 1 }}>✓</span>}
        </span>
      </button>
    );
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={disabled}
        aria-label={LABEL_SELECT_FILE}
        {...stateProps}
      >
        <img src={iconCameraAttach} alt="" width={24} height={24} />
        <span className={countClassName}>
          <strong>{currentFileEntryCount}</strong>/{maxFiles}
        </span>
      </button>
      {pickerOptions && pickerOpen && (
        <>
          <div
            onClick={closePicker}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0, 0, 0, 0.45)" }}
          />
          <div
            role="dialog"
            aria-label="사진 선택"
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 201,
              height: sheetHeight,
              background: "#ffffff",
              borderRadius: "20px 20px 0 0",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 -2px 16px rgba(0, 0, 0, 0.12)",
              transition: isDragging ? "none" : "height 0.25s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            <div
              onPointerDown={handleDragStart}
              style={{
                flexShrink: 0,
                padding: "10px 0 6px",
                display: "flex",
                justifyContent: "center",
                cursor: "grab",
                touchAction: "none",
              }}
            >
              <span style={{ width: 72, height: 4, borderRadius: 9999, background: "#d8dadf" }} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                padding: "20px 16px",
                borderBottom: "1px solid #eeeeee",
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 600, color: "#1a1c20" }}>최근 항목</span>
              <button
                type="button"
                onClick={closePicker}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#cfd1d6",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <p
                style={{
                  margin: 0,
                  padding: "12px 16px 8px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#868b94",
                }}
              >
                오늘
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 2,
                  padding: 2,
                }}
              >
                {pickerOptions.map((option) => renderGridItem(option))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/**
 * Prototype-only variant: dropzone-styled trigger whose button appends the next
 * preset sample file instead of opening the native OS file picker.
 */
export const AttachmentDropzonePreset = ({ samples, onPreview }) => {
  const { setFileEntries, currentFileEntryCount, maxFiles } = useFileUploadContext();
  const nextSample = samples[currentFileEntryCount];
  const disabled = currentFileEntryCount >= maxFiles || !nextSample;

  const handleClick = async () => {
    if (!nextSample) return;
    const file = await sampleUrlToFile(nextSample.url, nextSample.name);
    setFileEntries([file]);
  };

  return (
    <>
      <SeedAttachmentInput.Dropzone>
        <ActionButton variant="neutralWeak" size="small" layout="withText" onClick={handleClick} disabled={disabled}>
          <PrefixIcon svg={<IconArrowUpBracketDownFill />} />
          {LABEL_SELECT_FILE}
        </ActionButton>
        <SeedAttachmentInput.DropzoneLabel>{LABEL_DROP_FILE}</SeedAttachmentInput.DropzoneLabel>
      </SeedAttachmentInput.Dropzone>
      <SeedAttachmentInput.Container>
        <SeedAttachmentInput.ItemGroup>
          <SeedAttachmentInput.Context>
            {({ acceptedFileEntries }) =>
              acceptedFileEntries.map((fileEntry) => (
                <AttachmentInputItem key={fileEntry.id} fileEntry={fileEntry} onPreview={onPreview} />
              ))}
          </SeedAttachmentInput.Context>
        </SeedAttachmentInput.ItemGroup>
      </SeedAttachmentInput.Container>
    </>
  );
};
AttachmentDropzonePreset.displayName = "AttachmentDropzonePreset";

async function sampleUrlToFile(url, name) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], name, { type: blob.type });
}

/**
 * This file is a snippet from SEED Design, helping you get started quickly with @seed-design/* packages.
 * You can extend this snippet however you want.
 */
