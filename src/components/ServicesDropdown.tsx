import React, { useEffect, useRef, useState } from 'react';

import './ServicesDropdown.css';
import { MenuToggle, Popper } from '@patternfly/react-core';

const AllServicesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuKeys = (event: KeyboardEvent) => {
    if (!isOpen) {
      return;
    }
    if (
      menuRef.current?.contains(event.target as Node) ||
      toggleRef.current?.contains(event.target as Node)
    ) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsOpen((prev) => !prev);
        toggleRef.current?.focus();
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isOpen && !menuRef.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleMenuKeys);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleMenuKeys);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, menuRef]);

  const onToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setIsOpen(!isOpen);
  };

  const toggle = (
    <MenuToggle
      className="pf-v5-u-h-100 chr-c-link-service-toggle pf-v5-u-pl-lg pf-v5-u-pr-lg"
      ref={toggleRef}
      onClick={onToggleClick}
      isExpanded={isOpen}
    >
      Services
    </MenuToggle>
  );

  return (
    <Popper
      trigger={toggle}
      appendTo={document.body}
      isVisible={false}
      popper={<>Menu</>}
    />
  );
};

export default AllServicesDropdown;
