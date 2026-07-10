'use client';

import { useLayoutEffect, useRef, useState } from 'react';

type EditableTaskDescriptionVariant = 'desktop' | 'tablet' | 'mobile';

export function useEditableTaskDescriptionHeight({
  isEditing,
  variant,
}: {
  isEditing: boolean;
  variant: EditableTaskDescriptionVariant;
}) {
  const editFieldRef = useRef<HTMLDivElement>(null);
  const viewFieldRef = useRef<HTMLDivElement>(null);
  const [measuredEditHeight, setMeasuredEditHeight] = useState<
    number | undefined
  >();

  useLayoutEffect(() => {
    const field = editFieldRef.current;
    if (!isEditing || !field) return;
    const editField = field;

    if (variant !== 'desktop') {
      if (measuredEditHeight !== undefined) {
        editField.style.height = `${measuredEditHeight}px`;
      }

      return () => {
        editField.style.height = '';
      };
    }

    const parentElement = editField.parentElement;
    if (!parentElement) return;

    const parent = parentElement;

    function updateDesktopEditHeight() {
      const styles = getComputedStyle(parent);
      const verticalPadding =
        Number.parseFloat(styles.paddingTop) +
        Number.parseFloat(styles.paddingBottom);
      const nextHeight = Math.max(0, parent.clientHeight - verticalPadding);

      editField.style.height = `${nextHeight}px`;
    }

    updateDesktopEditHeight();

    const resizeObserver = new ResizeObserver(updateDesktopEditHeight);
    resizeObserver.observe(parent);
    window.addEventListener('resize', updateDesktopEditHeight);

    return () => {
      editField.style.height = '';
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDesktopEditHeight);
    };
  }, [isEditing, measuredEditHeight, variant]);

  function measureViewHeight() {
    if (variant === 'desktop') return;

    const nextHeight = viewFieldRef.current?.getBoundingClientRect().height;
    setMeasuredEditHeight(
      nextHeight === undefined ? undefined : Math.max(nextHeight, 120),
    );
  }

  return {
    editFieldRef,
    measureViewHeight,
    measuredEditHeight,
    resetMeasuredEditHeight: () => setMeasuredEditHeight(undefined),
    viewFieldRef,
  };
}
