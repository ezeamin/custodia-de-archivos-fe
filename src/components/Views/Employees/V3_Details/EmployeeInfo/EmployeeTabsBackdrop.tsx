import { useEffect, useRef } from 'react';

const EmployeeTabsBackdrop = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listItems = document.querySelectorAll('#tabs-selector a');
    const ancestor = document.getElementById('tabs-selector');

    const menuBackdrop = menuRef.current;

    if (!menuBackdrop) return;
    if (!ancestor) return;

    listItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const itemRect = item.getBoundingClientRect();
        const ancestorRect = ancestor.getBoundingClientRect();

        if (item.classList.contains('tab-active')) return;

        const left = itemRect.left - ancestorRect.left;
        const top = itemRect.top - ancestorRect.top;
        const { width } = itemRect;

        menuBackdrop.style.setProperty('--left', `${left}px`);
        menuBackdrop.style.setProperty('--top', `${top}px`);
        menuBackdrop.style.setProperty('--width', `${width}px`);
        menuBackdrop.style.visibility = 'visible';
        menuBackdrop.style.opacity = '1';
      });

      item.addEventListener('mouseleave', () => {
        menuBackdrop.style.visibility = 'hidden';
        menuBackdrop.style.opacity = '0';
      });
    });
  }, []);

  return (
    <div
      className="absolute left-0 top-0 -z-10 hidden h-[32px] w-[var(--width)] translate-x-[var(--left)] translate-y-[var(--top)] rounded-md bg-black/5 opacity-0 transition-all duration-500 sm:block dark:bg-white/5"
      ref={menuRef}
    />
  );
};
export default EmployeeTabsBackdrop;
